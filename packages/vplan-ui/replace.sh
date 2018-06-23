#!/bin/bash

sed -i "s@<link rel=\"icon\" type=\"image/x-icon\">@<link rel=\"icon\" href=\"$UI_FAVICON_URL\" type=\"image/x-icon\">@g" /app/index.html