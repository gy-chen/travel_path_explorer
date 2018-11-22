FROM alpine:latest

RUN apk add --no-cache --update python3 py3-pip bash

ADD ./ /opt/webapp
WORKDIR /opt/webapp

RUN pip3 install --no-cache-dir -q .

RUN adduser -D www-data
USER www-data

CMD gunicorn --bind 0.0.0.0:4413 travel_path_explorer.web:app