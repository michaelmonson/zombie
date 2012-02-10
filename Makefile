TESTS = test/*.js
SHELL := /bin/bash
OS = $(shell uname)
HASH = $(shell cat /dev/urandom | head -c 100 | shasum | awk '{print $$1}' | tr -d '\n')

test: mocha

mocha:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			$(TESTS)

watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--watch \
			$(TESTS)

run:
	./watch.sh

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

install: ${OS}-install
	touch README
	npm install
	npm install mongodb --mongodb:native

Linux-install:
	sed -i s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
		| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile | grep -v .git`
	sed -i s/SESSION-SECRET/${HASH}/g `find ./config | grep json | grep -v .git`

Darwin-install:
	sed -i "" s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
		| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile | grep -v .git`
	sed -i "" s/SESSION-SECRET/${HASH}/g `find ./config | grep json | grep -v .git`
