import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText("Button Triggering AJAX Request").click();
})
test('auto waiting', async({page}) => {
const successButton = page.locator('.bg-success')
 
// await successButton.click()
// const text = await successButton.textContent()
await successButton.waitFor({state:"attached"})
const text = await successButton.allTextContents()

// expect(text).toContain('Data loaded with AJAX get request.')
await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})

test('alternative waits',async({page})=>{
const successButton = page.locator('.bg-success')

// wait for element
// await page.waitForSelector('.bg-success')
//wait for particilar response API 
await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
//wait to network call to e completed 
await page.waitForLoadState('networkidle')
//wait for timeout 
await page.waitForTimeout(5000)
//wait for url
await page.waitForURL('http://uitestingplayground.com/ajax')
const text = await successButton.textContent()
expect(text).toContain('Data loaded with AJAX get request.')
})

//test timeouts 
test('timeout',async({page})=>{
const successButton = page.locator('.bg-success')
await successButton.click()


})