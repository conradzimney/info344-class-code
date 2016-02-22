#!/usr/bin/env bash

# generates a self-signed certificate you can use
# to test HTTPS support
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt
