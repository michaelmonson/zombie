#!/bin/bash
on_die() {
  echo
  echo killing less supervisor
  kill $LESS_PID
  echo killing server supervisor
  kill $SERVER_PID
  exit
}

SUPERVISOR=./node_modules/.bin/supervisor
$SUPERVISOR -e "less|css" -w public/less -x make less-watch &
LESS_PID=$!

$SUPERVISOR server.js &
SERVER_PID=$!

trap 'on_die' SIGINT
sleep 10000000
