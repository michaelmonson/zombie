
var Steps = require('kyuri').Steps,
    models = require('../../models'),
    should = require('should'),
    Browser = require('zombie'), 
    browser = new Browser(),
    browser_status;
      

Steps.When(/^I browse to "(.+)"$/, function (step, url) {
  browser.visit(url, function(err, browser, stat) {
    if (err) { throw err; }
    should.exist(stat);
    browser.errors.should.be.empty;
    step.done();
  });
});

Steps.Then(/^I expect a (\d+) status$/, function (step, response) {
  should.exist(browser.statusCode);
  browser.statusCode.should.equal(parseInt(response, 10));
  step.done();
});

Steps.Then(/^I expect html$/, function (step) {
  should.exist(browser.query("html body"));
  step.done();
});

Steps.And(/^I expect to see an? (\w+) tag containing "(.+)"$/, 
  function (step, tag, content) {
    var result = browser.text(tag);
    should.exist(result);
    result.should.equal(content);
    step.done();
  });

Steps.And(/^show$/, function (step) {
  console.log(browser.html());
  step.done();
});

Steps.export(module);

