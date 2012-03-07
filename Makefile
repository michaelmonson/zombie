TESTS = test/*.js
SHELL := /bin/bash
SERVERLOG = ./tmp/test.log
SERVERPID = ./tmp/server.pid
OS = $(shell uname)
HASH = $(shell cat /dev/urandom | head -c 100 | shasum | awk '{print $$1}' | tr -d '\n')

main:
	@echo "Available tasks:"
	@echo "    run"
	@echo "    test"
	@echo "    mocha"
	@echo "    mocha-watch"
	@echo "    less"
	@echo "    less-watch"
	@echo "    update"
	@echo "    install"
	@echo "    git-init"
	@echo "   *clean"
	@echo "   *new-project"
	@echo
	@echo "* - will remove git repo"


test: server-start mocha server-stop

mocha:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--ui bdd \
		$(TESTS)

mocha-watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--ui bdd \
		--watch \
		$(TESTS)

server-start:
	@ echo ''
	@ -mkdir -p `dirname $(SERVERLOG)` 2>&1
	@ echo -n 'Starting Server... '
	@(NODE_DISABLE_COLORS=1 NODE_ENV=test node ./server.js > $(SERVERLOG) 2>&1 & \
		sleep 0.3 \
		&& echo $$! > $(SERVERPID) \
		&& echo 'DONE')
	
server-stop:
	@ echo -n 'Shutting down Server... '
	@ -kill -9 `cat $(SERVERPID)` > /dev/null 2>&1
	@ echo 'DONE'
	@ echo ''
	@ -rm -f $(SERVERPID)
	@ echo "Server log found in '$(SERVERLOG)'"
	@ echo ''

run:
	./bin/watch.sh

docs:
	@rm -rf docs
	@./node_modules/.bin/docco-husky \
		-name "`pwd | tr '/' '\n' | tail -1 | tr -d '\n' | tr '-' ' '`" \
		index.js \
		lib/*.js \
		models/*.js \
		controllers/*.js \
		public/js/*.js \
		app.js \
		server.js

build: less docs
	rm -rf ./public/js/.build
	mkdir ./public/js/.build
	node ./bin/compile.js

less-watch: less
	@sleep 100000000

less:
	@echo -n compiling css...
	@./node_modules/.bin/lessc -x public/less/main.less public/css/style.css
	@rm -f public/css/tmp.less
	@echo done

new-project: clean install git-init

clean:
	rm -rf .git
	rm -rf README.md

git-init:
	git init
	git add .
	git commit -m "Initial commit"

update: install

install: ${OS}-install npm-install build
	touch README

npm-install:
	npm install

Linux-install:
	sed -i s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
		| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile | grep -v .git | grep -v node_modules`

Darwin-install:
	sed -i "" s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
		| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile | grep -v .git | grep -v node_modules`

.PHONY: docs
