import signInPage from '../pageobjects/signIn.page.js'
import signOutPage from '../pageobjects/signOut.page.js'
import header from '../pageobjects/header.page.js'
import privateData from '../../config/privateData.js'  // Create this file with your registered credentials
import { waitForExactUrl, waitForUrlContains} from '../utils/waitUtils.js';


it('SignOut from one account', async () => {
    await signInPage.open()
    await waitForUrlContains('https://github.com/login')

    await signInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await header.gotoSignOutPage()
    await waitForUrlContains('https://github.com/logout')

    await signOutPage.click(signOutPage.signOutBtn)
    await waitForExactUrl('https://github.com/');
    await header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})

it('SignOut from all accounts', async () => {
    await signInPage.open()
    await waitForUrlContains('https://github.com/login')

    await signInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await header.gotoSignOutPage()
    await waitForUrlContains('https://github.com/logout')

    await signOutPage.click(signOutPage.signOutAllBtn)
    await waitForExactUrl('https://github.com/');
    await header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})


