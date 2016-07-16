# heroku-config-diff

A heroku plugin to display differences between environments of two apps

This can be useful to, e.g., bring an atrophied staging environment up
to date.

### Usage

```console
$ heroku config:diff sushi --app sushi-staging
=== Only in sushi-staging
GOMAXPROCS
HEROKU_POSTGRESQL_AMBER_URL
=== Only in sushi
HEROKU_POSTGRESQL_BLUE_URL
RATE_LIMIT
=== Common
DATABASE_URL
```

### Installation

```bash
$ heroku plugins:install heroku-config-diff
```

#### Update

```bash
$ heroku plugins:update heroku-config-diff
```

## THIS IS BETA SOFTWARE

Thanks for trying it out. If you find any problems, please report an
issue and include your Heroku toolbelt version and your OS version.
