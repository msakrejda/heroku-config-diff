# heroku-run-localjs

A heroku plugin to run a command locally with the config vars of a
heroku app.

This can be useful to, e.g., run migrations against a production
application before deploying the corresponding code that depends on
them, or to iterate more quickly without having to deploy small
changes to a staging environment individually.

### Usage

`heroku run:local COMMAND --app sushi`

Note that if you use any direct environment variable references in your command,
you'll need to escape them or quote them. Otherwise, they will be interpreted by
your shell before being passed to the Heroku CLI. For example:

```console
$ heroku run:local psql '$DATABASE_URL' --app sushi
Pager usage (pager) is off.
psql (9.4beta2, server 9.3.5)
SSL connection (protocol: TLSv1.2, cipher: DHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

sushi::DATABASE=>
```

(This is more or less equivalent to `heroku pg:psql DATABASE_URL`).

### Installation

```bash
$ heroku plugins:install heroku-run-localjs
```

#### Update

```bash
$ heroku plugins:update heroku-run-localjs
```

## THIS IS BETA SOFTWARE

Thanks for trying it out. If you find any problems, please report an
issue and include your Heroku toolbelt version and your OS version.
