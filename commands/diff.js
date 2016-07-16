'use strict';

const cli = require('heroku-cli-util');
const co = require('co');
const _ = require('lodash');

function diff(context, heroku) {
  const ourApp = context.app
  const otherApp = context.args.OTHER_APP
  
  Promise.all([ heroku.apps(ourApp).configVars().info(),
                heroku.apps(otherApp).configVars().info() ])
    .then((result) => {
      const [ ourConfig, otherConfig ] = result
      const ourKeys = Object.keys(ourConfig)
      const otherKeys = Object.keys(otherConfig)
      
      const onlyOurs = _.difference(ourKeys, otherKeys)
      const onlyOther = _.difference(otherKeys, ourKeys)
      const common = _.intersection(ourKeys, otherKeys)

      cli.styledHeader('Only in ' + ourApp)
      onlyOurs.forEach((k) => {
        console.log(k)
      })

      cli.styledHeader('Only in ' + otherApp)
      onlyOther.forEach((k) => {
        console.log(k)
      })

      cli.styledHeader('Common')
      common.forEach((k) => {
        console.log(k)
      })
    })
    .catch((err) => {
      // TODO: better error handling
      console.log(err)
    })
}

module.exports = {
  topic: 'config',
  command: 'diff',
  description: 'compare environments across two apps',
  args: [
    { name: 'OTHER_APP', optional: false },
  ],
  help: `
config:diff app

Compare differences in environment between current app
  and another app specified as the argument.

Example:

$ heroku config:diff sushi --app sushi-staging
TODO: add sample output
  `,

  needsAuth: true,
  needsApp: true,

  run: cli.command(co.wrap(diff))
};
