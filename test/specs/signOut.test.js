import { expect } from '@wdio/globals'
import SignInPage from '../pageobjects/signIn.page.js'
import SignOutPage from '../pageobjects/signOut.page.js'
import Header from '../pageobjects/header.page.js'
import privateData from '../../config/privateData.js'  // Create this file with your registered credentials
import { waitForExactUrl, waitForUrlContains} from '../utils/waitUtils.js';


xit('SignOut from one account', async () => {
    await SignInPage.open()
    await waitForUrlContains('https://github.com/login')

    await SignInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await Header.gotoSignOutPage()
    await waitForUrlContains('https://github.com/logout')

    await SignOutPage.click(SignOutPage.signOutBtn)
    await waitForExactUrl('https://github.com');
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})

it('SignOut from all accounts', async () => {
    await SignInPage.open()
    await waitForUrlContains('https://github.com/login')

    await SignInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await Header.gotoSignOutPage()
    await waitForUrlContains('https://github.com/logout')

    await SignOutPage.click(SignOutPage.signOutAllBtn)
    await waitForExactUrl('https://github.com');
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})


