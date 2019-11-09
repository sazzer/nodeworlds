const reporter = require("cucumber-html-reporter");

reporter.generate({
  theme: "bootstrap",
  jsonFile: "./output/e2e/cucumber_report.json",
  output: "./output/e2e/cucumber_report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  storeScreenshots: true,
  screenshotsDirectory: "./output/e2e/screenshots"
});
