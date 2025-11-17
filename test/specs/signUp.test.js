import { expect } from '@wdio/globals'
import { waitForUrlContains} from '../utils/waitUtils.js';
import signUpPage from '../pageobjects/signUp.page.js'

it('SignUp with valid data', async () => {
    await signUpPage.open()
    await waitForUrlContains('https://github.com/signup')
    await signUpPage.fillEmail("someemaildortest@gmail.com")
    await signUpPage.fillPassword("Adbgghgdas123!")
    await signUpPage.fillUserName("PetroBatkovich")
    await signUpPage.choseRandomCountry()
    await signUpPage.clickCheckBox()
    await signUpPage.clickSubmit()
    await signUpPage.checkIsVerifyAccPage()

    //It doesn't work anymore because of the captcha.
    //await SignUpPage.submitWhenChecked()

    //await expect(await SignUpPage.getCurrentURL()).toContain('https://github.com/account_verifications')
})

