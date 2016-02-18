module.exports = function () {
  this.Given(/^I visit the home page$/, function(callback) {
    browser.driver.get(browser.baseUrl).then(callback);
  });
};
