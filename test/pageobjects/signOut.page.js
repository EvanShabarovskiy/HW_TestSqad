import Page from './page.js'

class SignOutPage extends Page {
    open() { return super.open('logout') }

    get signOutBtn() { return $('input[value="Sign out"]') }
    get signOutAllBtn() { return $('input[value="Sign out from all accounts"]') }
}

export default new SignOutPage()