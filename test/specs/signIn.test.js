import { expect } from '@wdio/globals'
import SignInPage from '../pageobjects/signIn.page.js'
import HomePage from '../pageobjects/home.page.js'
import privateData from '../../config/privateData.js'  // Create this file with your registered credentials

xit('SignIn with valid data', async () => {
    await SignInPage.open()
    await expect(await SignInPage.getCurrentURL()).toContain('github.com/login')

    await SignInPage.fillEmail(privateData.registeredUser.email)
    await SignInPage.fillPassword(privateData.registeredUser.password)
    await SignInPage.clickSubmit()

    await HomePage.userAccBtn.waitForDisplayed({ timeout: 5000 })
})
