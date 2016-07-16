'use strict'

const cli = require('heroku-cli-util')
const _ = require('lodash')

function diff (context, heroku) {
  const ourApp = context.app
  const otherApp = context.args.OTHER_APP

  const displayVar = (key, config) => {
    if (context.flags.verbose) {
      console.log(`${key}=${config[key]}`)
    } else {
      console.log(key)
    }
  }

  return Promise.all([ heroku.apps(ourApp).configVars().info(),
                heroku.apps(otherApp).configVars().info() ])
    .then((result) => {
      const [ ourConfig, otherConfig ] = result
      const ourKeys = Object.keys(ourConfig)
      const otherKeys = Object.keys(otherConfig)

      const onlyOurs = _.difference(ourKeys, otherKeys)
      const onlyOther = _.difference(otherKeys, ourKeys)
      const common = _.intersection(ourKeys, otherKeys)

      if (onlyOurs.length > 0) {
        cli.styledHeader('Only in ' + ourApp)
        onlyOurs.forEach(k => displayVar(k, ourConfig))
      }

      if (onlyOther.length > 0) {
        cli.styledHeader('Only in ' + otherApp)
        onlyOther.forEach(k => displayVar(k, otherConfig))
      }

      const same = common.filter((key) => {
        return ourConfig[key] === otherConfig[key]
      })
      const different = _.difference(common, same)

      if (same.length > 0) {
        cli.styledHeader('Same value')
        same.forEach(k => displayVar(k, ourConfig))
      }

      if (different.length > 0) {
        cli.styledHeader('Different values')
        if (context.flags.verbose) {
          cli.table(different.map((k) => {
            return {key: k, ours: ourConfig[k], other: otherConfig[k]}
          }), {
            columns: [
              {key: 'key', label: 'Config Var'},
              {key: 'ours', label: `In ${ourApp}`},
              {key: 'other', label: `In ${otherApp}`},
            ]
          })
        } else {
          different.forEach((k) => displayVar(k, ourConfig))
        }
      }
    })
}

module.exports = {
  topic: 'config',
  command: 'diff',
  description: 'compare environments across two apps',
  args: [
    { name: 'OTHER_APP', optional: false },
  ],
  flags: [
    { name: 'verbose', char: 'v',
      description: 'include config var values in diff',
      hasValue: false, optional: true },
  ],
  help: `
config:diff app

Compare differences in environment between current app
  and another app specified as the argument. With the
  'verbose' flag, also prints the config var values.

Example:

$ heroku config:diff sushi --app sushi-staging
=== Only in sushi-staging
HEROKU_POSTGRESQL_GREEN_URL
DEBUG
=== Only in sushi
HEROKU_POSTGRESQL_RED_URL
=== Same value
GOMAXPROCS
=== Different values
DATABASE_URL
  `,

  needsAuth: true,
  needsApp: true,

  run: cli.command(diff)
}
