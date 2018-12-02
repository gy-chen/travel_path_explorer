FROM alpine:latest

RUN apk add --no-cache --update python3 py3-pip bash

RUN adduser -D www-data

ADD --chown=www-data:www-data ./ /opt/webapp
WORKDIR /opt/webapp

RUN pip3 install --no-cache-dir -q .

USER www-data

CMD gunicorn --bind 0.0.0.0:4413 travel_path_explorer.web:app