title: API

---

All Data is served to the clients via a REST API.
It is available under `/api`.
The full Documentation is available in [OpenAPI-Format](https://gitlab.com/Skn0tt/vplan/raw/master/packages/vplan-api/Docs.yml).

| Route               | Method |  Result                                          |
| ------------------- | ------ | ------------------------------------------------ |
| `/entries`          | GET    | entries for students and teachers                |
| `/entries/teacher`  | GET    | entries for teachers                             |
| `/entries/student`  | GET    | entries for students                             |
| `/entries`          | PUT    | upload new Untis-Files                           |
| `/dayInfo`          | GET    | information about the day                        |
| `/messages`         | GET    | individual information for students and teachers |
| `/messages`         | PUT    | update information                               |
| `/messages/student` | GET    | individual information for students              |
| `/messages/student` | PUT    | update information for students                  |
| `/messages/teacher` | GET    | individual information for teachers              |
| `/messages/teacher` | PUT    | update information for teachers                  |
| `/status`           |  GET   |  returns "OK"                                    |

## Updating entries

To update the entries, do a HTTP-PUT to `/api/entries` with the Untis HTML-Export as `multipart/form-data`.
Append all files to the `files` field.
