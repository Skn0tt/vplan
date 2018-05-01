All configuration is done with environment variables.

## Required Values

| Variable                   |  Meaning                                        | Example                                                     |
| -------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `HOST`                     | hostname to serve on                            | vplan.simonknott.de                                         |
| `LETSENCRYPT_EMAIL`        | email address used to obtain HTTPS certificates | vplan@simonknott.de                                         |
| `SECRET`                   | secret that's needed to update data             | root                                                        |
| `UI_TITLE`                 | Title that is shown on tab title                | vPlan                                                       |
| `UI_HEADER`                | Header that is shown on certain UI pages        | Vertretungsplan am EMA                                      |
| `UI_FAVICON_URL`           | URL of the favicon                              | thttp://www.ema-bonn.de/templates/jsn_metro_pro/favicon.ico |
| `UI_DISPLAY_NEEDED_GROUPS` | Groups that need to be shown on /display        | 5,6,7,8,9,EF,Q1,Q2                                          |
| `UI_LOGO_FILENAME`         | Filename of the logo to show in appbar          | logo.png                                                    |
| `UI_IMPRINT_URL`           | URL to the imprint                              | https://simonknott.de/impressum                             |

## Asset files

Put your logo file into the "assets" subfolder.
It will be served by Nginx.

## Example

Environment variables can be set by using `EXPORT` or specifying them in an `.env`-File:

```env
HOST=vplan.simonknott.de
LETSENCRYPT_EMAIL=vplan@simonknott.de
SECRET=root
UI_TITLE=vPlan
UI_HEADER=Vertretungsplan am EMA
UI_FAVICON_URL=http://www.ema-bonn.de/templates/jsn_metro_pro/favicon.ico
UI_DISPLAY_NEEDED_GROUPS=5,6,7,8,9,EF,Q1,Q2
UI_LOGO_FILENAME=logo.png
UI_IMPRINT_URL=https://simonknott.de/impressum
...
```
