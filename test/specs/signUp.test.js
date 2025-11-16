import { expect } from '@wdio/globals'
import SignUpPage from '../pageobjects/signUp.page.js'

it('SignUp with valid data', async () => {
    await SignUpPage.open()
    await expect(await SignUpPage.getCurrentURL()).toContain('github.com/signup');

    await SignUpPage.fillEmail("someemaildortest@gmail.com")
    await SignUpPage.fillPassword("Adbgghgdas123!")
    await SignUpPage.fillUserName("PetroBatkovich")
    await SignUpPage.choseRandomCountry()
    await SignUpPage.clickCheckBox()
    await SignUpPage.clickSubmit()
    await SignUpPage.checkIsVerifyAccPage()

    //It doesn't work anymore because of the captcha.
    //await SignUpPage.submitWhenChecked()

    //await expect(await SignUpPage.getCurrentURL()).toContain('https://github.com/account_verifications')
})

