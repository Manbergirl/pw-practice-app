import { test } from "@playwright/test";
// Използваме async, защото вътре има await – асинхронни операции,които изчакваме да се изпълнят преди да продължим.
// Примерно page.goto() зарежда страница и отнема време,а await кара теста да спре и да изчака завършването,
// за да не продължи твърде рано и да не счупи теста.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.describe.skip("suite1", () => {
  test("first test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("second test", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
test.describe("Locator suntax rule", () => {
  test("suntax rule", async ({ page }) => {
    //by tag name
    page.locator("input");
    //by id
    await page.locator("#inputEmail").first().click();
    //by class value
    page.locator("class^=shape-rectangle");
    //by attribute
    page.locator("[placeholder=Email]");
    //by class value FULL
    page.locator("[class=input-full-width size-medium status-basic shape-rectangle nb-transition]");
    //combine different selectors
    page.locator("input[placeholder=Email][nbinput]");
    //by partial text match
    page.locator(":text()");
  });
});
