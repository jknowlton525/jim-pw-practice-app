import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()

    //const text = await successButton.textContent()
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request', {timeout: 20})
})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    //Wait for element
    //await page.waitForSelector('.bg-success')

    //Wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})