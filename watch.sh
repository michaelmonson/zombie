#!/bin/bash
on_die() {
  echo
  echo killing less supervisor
  kill $LESS_PID
  echo killing server supervisor
  kill $SERVER_PID
  exit
}

supervisor -e "less|css" -w public/less -x make less-watch &
LESS_PID=$!

supervisor server.js &
SERVER_PID=$!

trap 'on_die' SIGINT
sleep 10000000
