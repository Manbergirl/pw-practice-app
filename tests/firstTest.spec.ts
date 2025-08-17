// import { test } from "@playwright/test";
// // Използваме async, защото вътре има await – асинхронни операции,които изчакваме да се изпълнят преди да продължим.
// // Примерно page.goto() зарежда страница и отнема време,а await кара теста да спре и да изчака завършването,

import test, { expect } from "@playwright/test";

// // за да не продължи твърде рано и да не счупи теста.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator suntax rules", async ({ page }) => {
  //by tag name
  await page.locator("input").first().click();
  //by id
  page.locator('#inputEmail')
  //class value
  page.locator('.shape-rectangle');
  //by attribute
  page.locator('[placeholder="Email"]');
  //by entire class value 
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  //combine different selectors 
  page.locator("input[placeholder=Email][nbinput]");
  // by Xpath
  page.locator('//*[@id="inputEmail]')
  //page.locator("input[inputEmail1][ng-reflect-full-width]")
  //element by partial match
  page.locator(':text("Using")');
  //by exact text match
  page.locator(':text-is("Using the Grid")')

})

test('user facing locators',async ({page})=>{
  await page.getByRole('textbox',{name:"Email"}).first().click()
  await page.getByRole("button",{name:"Sign in"}).first().click()
  await page.getByLabel("Email").first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText("Using the Grid").click()
  await page.getByTestId('SignIn').click()
  await page.getByTitle("IoT Dashboard").click()
})

test("locating child options", async({page})=>{
await page.locator('nb-card nb-radio :text-is("Option 1")').dblclick()
await page.locator('nb-card').locator('nb-radion').locator(':text-is("Option 2")').click()

await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
await page.locator('nb-card').nth(3).getByRole('button').click()


//@ това значи 3 ти елемент/нещо като eq("3")
})

test('locating parent elements',async({page})=>{

await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).first().click()
await page.locator('nb-card',).filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card').filter({has:page.locator('status-danger')}).getByRole('textbox',{name:"Password"}).click()
await page.locator('nb-card').filter({has:page.locator("nb-checkbox")}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()
await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox',{name:"Email"}).click()
})

test('Reusing the locator', async({page})=>{
const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
const emIlInputFiled = basicForm.getByRole('textbox',{name:"Email"}).fill("Bebcho.com")
const passwordImputFiled =basicForm.getByRole('textbox',{name:"Password"}).fill("333")

await basicForm.getByRole('textbox',{name:"Email"}).fill("Bebcho.com")
await basicForm.getByRole('textbox',{name:"Password"}).fill("333")
await basicForm.locator('nb-checkbox').click()
await basicForm.getByRole('button').click()
// await expect(emIlInputFiled),toHaveValue('Bebcho.com')
// await expect(passwordImputFiled),toHaveValue('333')
})

test('extracting values',async({page}) =>{
const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
const buttonText = await basicForm.locator('button').textContent()
expect(buttonText).toEqual('Submit')
//как да вземе всички валюта на текста
//имаме два радио бутона и един изключен
const allRadioButtons =  await page.locator('nb-radio').allTextContents()
expect(allRadioButtons).toContain("Option 1")

//input values валидация на текста че го има в инпут полето
const emailFiled = basicForm.getByRole('textbox',{name:"Email"})
await emailFiled.fill('test@test.com')
const emailValue = await emailFiled.inputValue()
expect(emailValue).toEqual('test@test.com')

//искаме да валидираме плейсхоудъра че има валю имейл
const placeholderValue = await emailFiled.getAttribute('placeholder')
expect(placeholderValue).toEqual('Email')


})
test('assertions',async({page})=>{
const basicFormButton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
//ако не сложиш await гърми на поразия 
const text = await basicFormButton.textContent()
expect(text).toEqual("Submit")

//general assertions 
const value = 5
//тук асъртваме
expect(value).toEqual(5)

//локатор асършън
expect(basicFormButton).toHaveText('Submit')
//ще търси текста в този елемент basicFormButton

//софт асършън, когато теста продължи да се екзекютва дори и когато асършъна фейлне 
await expect.soft(basicFormButton).toHaveText('Submit')
await basicFormButton.click()
}) 

test('',async({page})=>{})

