# heroku-config-diff

A heroku plugin to display differences between environments of two apps

This can be useful to, e.g., bring an atrophied staging environment up
to date.

### Usage

Simple output for quick comparisons:

```console
$ heroku config:diff sushi --app sushi-staging
=== Only in sushi-staging
DEBUG
HEROKU_POSTGRESQL_GREEN_URL
=== Only in sushi
HEROKU_POSTGRESQL_RED_URL
=== Same value
GOMAXPROCS
=== Different values
DATABASE_URL
```

Or verbose output for more detail:

```console
$ heroku config:diff --verbose sushi --app sushi-staging
Config Var                   In sushi-staging                             In sushi
───────────────────────────  ───────────────────────────────────────────  ───────────────────────────────────────────
DATABASE_URL                 postgres://user:password@db1.example.com/db  postgres://user:password@db2.example.com/db
DEBUG                        true                                         --
GOMAXPROCS                   3                                            3
HEROKU_POSTGRESQL_GREEN_URL  postgres://user:password@db1.example.com/db  --
HEROKU_POSTGRESQL_RED_URL    --                                           postgres://user:password@db2.example.com/db
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
