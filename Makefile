TESTS = test/*.js
SHELL := /bin/bash
OS = $(shell uname)

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

new-project: clean ${OS}-install git-init

clean:
	rm -rf .git
	rm -rf README.md

git-init:
	git init
	git add .
	git commit -m "Initial commit"

Linux-install:
	sed -i s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
	| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile`
	touch README
	npm install
	npm install mongodb --mongodb:native

Darwin-install:
	sed -i "" s/YOUR-REPO-NAME/`pwd | tr '/' '\n' \
	| tail -1 | tr -d '\n'`/g `find . -type f | grep -v Makefile`
	touch README
	npm install
	npm install mongodb --mongodb:native
