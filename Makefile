TESTS = test/*.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(TESTS)
			
watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			--watch \
			$(TESTS)

new-project:
	rm -rf .git
	rm -rf README.md
	touch README
	sed -i s/bptest/`pwd | tr '/' '\n' \
	| tail -1 | tr -d '\n'`/g `find . -type f`
	npm install
	mkdir public/images
	git init
	git add .
	git commit -m "Initial commit"

.PHONY: test watch
