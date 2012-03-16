#!/bin/bash
EXTRANEOUS=`npm ls | grep extraneous | awk '{print "  "$2}'`
if [ -n "$EXTRANEOUS" ]
then
	printf "\e[0;31m"
  echo 'Extraneous packages found.'
  echo 'You should probably delete these or add them to package.json'
  echo
  echo 'Offending Packages:'
  echo "$EXTRANEOUS"
	printf "\e[m"
else
  echo 'No extraneous packages'
fi
