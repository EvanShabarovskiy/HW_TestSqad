import { expect } from '@wdio/globals'
import SignInPage from '../pageobjects/signIn.page.js'
import SignOutPage from '../pageobjects/signOut.page.js'
import Header from '../pageobjects/header.page.js'
import privateData from '../../config/privateData.js'  // Create this file with your registered credentials
import { waitForExactUrl, waitForUrlContains} from '../utils/waitUtils.js';


it('SignOut from one account', async () => {
    await SignInPage.open()
    await expect(await SignInPage.getCurrentURL()).toContain('github.com/login')

    await SignInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await Header.gotoSignOutPage()
    await expect(await SignOutPage.getCurrentURL()).toContain('github.com/logout')

    await SignOutPage.click(SignOutPage.signOutBtn)
    await browser.waitUntil(
        async () => (await browser.getUrl()) === 'https://github.com',
        { timeout: 5000, timeoutMsg: 'URL did not change to home page after logout' }
    )
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})

it('SignOut from all accounts', async () => {
    await SignInPage.open()
    await waitForUrlContains('github.com/login')
    //await expect(await SignInPage.getCurrentURL()).toContain('github.com/login')

    await SignInPage.logInUser(privateData.registeredUser.email, privateData.registeredUser.password)
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000 })

    await Header.gotoSignOutPage()
    await expect(await SignOutPage.getCurrentURL()).toContain('github.com/logout')

    await SignOutPage.click(SignOutPage.signOutAllBtn)
    await waitForExactUrl('https://github.com/');
    await Header.userAccBtn.waitForDisplayed({ timeout: 5000, reverse: true })
})


