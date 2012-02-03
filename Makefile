TESTS = test/*.js

test: mocha cuke

mocha:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			$(TESTS)

watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--watch \
			$(TESTS)

cuke:
	@NODE_ENV=test ./node_modules/.bin/kyuri features

new-project:
	rm -rf .git
	rm -rf README.md
	touch README
	npm install
	mkdir public/images
	git init
	git add .
	git commit -m "Initial commit"

.PHONY: test watch cuke
