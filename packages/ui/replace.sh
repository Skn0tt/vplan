#!/bin/bash

sed -i 's/<p>{{config}}<\/p>/<script src="\/config.js"><\/script>/g' /app/index.html
sed -i "s@<link rel=\"icon\" type=\"image/x-icon\">@<link rel=\"icon\" href=\"$UI_FAVICON_URL\" type=\"image/x-icon\">@g" /app/index.html