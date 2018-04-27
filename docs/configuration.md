All configuration is done with environment variables.

## Required Values

| Variable            |  Meaning                                        | Example                                                    |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| `HOST`              | hostname to serve on                            | vplan.simonknott.de                                        |
| `LETSENCRYPT_EMAIL` | email address used to obtain HTTPS certificates | vplan@simonknott.de                                        |
| `SECRET`            | secret that's needed to update data             | root                                                       |
| `UI_TITLE`          | Title that is shown on tab title                | vPlan                                                      |
| `UI_HEADER`         | Header that is shown on certain UI pages        | Vertretungsplan am EMA                                     |
| `UI_FAVICON_URL`    | URL of the favicon                              | http://www.ema-bonn.de/templates/jsn_metro_pro/favicon.ico |

## Example

Environment variables can be set by using `EXPORT` or specifying them in an `.env`-File:

```env
HOST=vplan.simonknott.de
LETSENCRYPT_EMAIL=vplan@simonknott.de
SECRET=root
UI_TITLE=vPlan
UI_HEADER=Vertretungsplan am EMA
UI_FAVICON_URL=http://www.ema-bonn.de/templates/jsn_metro_pro/favicon.ico
```
