// const {
//   When,
//   Then,
//   After,
//   Before,
//   Given,
//   setDefaultTimeout,
// } = require("@cucumber/cucumber");
// const { expect } = require("chai");
// const { Builder } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

// let driver;

// const chromeOptions = new chrome.Options();
// chromeOptions.addArguments("--ignore-certificate-errors");
// chromeOptions.addArguments("--ignore-ssl-errors");

// const buildDriver = async () => {
//   driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(chromeOptions)
//     .build();
// };

// let sum = 0;

// setDefaultTimeout(60 * 1000);

// Before(function () {
//   console.log("Inisde Before");
// });

// After(function () {
//   console.log("After");
// });

// When("I add {int} and {int}", function (num1, num2) {
//   sum = num1 + num2;
//   return console.log(sum);
// });

// Then("the result should be {int}", function (result) {
//   expect(sum).equal(result);
// });

// Given("I visit google ", async function () {
//   await buildDriver();
// });
// When("I visit google homepage", async () => {
//   await driver.get("https://www.google.com");
//   await driver.findElement(By.name("q")).sendKeys("Techverito" + "\n");
// });
// Then("I visit google homepage", async () => {});

const {
  Given,
  When,
  Then,
  setDefaultTimeout,
  Before,
  After,
} = require("@cucumber/cucumber");
const { expect } = require("chai");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Select } = require("selenium-webdriver/lib/webdriver");
// const { By } = require("selenium-webdriver");
// .\node_modules\.bin\cucumber-js features

let driver;

const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--ignore-certificate-errors");
chromeOptions.addArguments("--ignore-ssl-errors");

const buildDriver = async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
};

let sum = 0;
let actualText = "";
setDefaultTimeout(60 * 1000);

Before(function () {
  console.log("Inisde Before");
});

After(function () {
  console.log("After");
});

When("I add {int} and {int}", function (num1, num2) {
  sum = num1 + num2;
  return console.log(sum);
});

Then("the result should be {int}", function (result) {
  expect(sum).equal(result);
});

Given("I visit {string}", async function (url) {
  await buildDriver();
  await driver.get(url);
});

When(
  "I search for Techverito {string} and {string}",
  async function (name, surname) {
    await driver.get("http://localhost:4200/petclinic/vets/add");

    const firstNameInput = await driver.findElement(By.css("input#firstName"));
    const lastNameInput = await driver.findElement(By.css("input#lastName"));
    const specialtiesDropdown = await driver.findElement(
      By.css("select#specialties"),
    );

    await firstNameInput.clear();

    // Type the desired text into the input field
    await firstNameInput.sendKeys(name);
    await lastNameInput.sendKeys(surname);
    //await select.selectByIndex(0);

    // Click the dropdown to open options
    await specialtiesDropdown.click();

    // Locate and click the first option
    const firstOption = await driver.findElement(
      By.css("select#specialties option:nth-child(2)"),
    );
    await firstOption.click();

    await driver.findElement(By.css("body")).sendKeys("\uE00C");

    await driver.wait(async function () {
      return true;
    }, 5000);
    await driver.wait(async function () {
      const saveVetButton = await driver.findElement(
        By.xpath('//button[text()="Save Vet"]'),
      );

      await saveVetButton.click();
      return true;
    }, 15000);
  },
);

Then("I should see the results", async function () {
  const currentUrl = await driver.getCurrentUrl();

  //   expect(currentUrl).equal("http://localhost:4200/petclinic/vets");
});

Then("I close the browser", async function () {
  if (driver) {
    await driver.quit();
  }
});
