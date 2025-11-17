import signInPage from '../pageobjects/signIn.page.js'
import header from '../pageobjects/header.page.js'
import { waitForUrlContains} from '../utils/waitUtils.js';
import privateData from '../../config/privateData.js'  // Create this file with your registered credentials

it('SignIn with valid data', async () => {
    await signInPage.open()
    await waitForUrlContains('https://github.com/login')
    await signInPage.fillEmail(privateData.registeredUser.email)
    await signInPage.fillPassword(privateData.registeredUser.password)
    await signInPage.clickSubmit()
    await header.userAccBtn.waitForDisplayed({ timeout: 5000 })
})
