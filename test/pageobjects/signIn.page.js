import Page from './page.js'

class SignInPage extends Page {
    open() { return super.open('login') }

    get emailInput() { return $('#login_field') }
    get passwordInput() { return $('#password') }
    get submitBtn() { return $('input.btn.btn-primary.btn-block.js-sign-in-button') }

    async fillEmail(email) { await this.setValue(this.emailInput, email) }

    async fillPassword(pass) { await this.setValue(this.passwordInput, pass) }

    async clickSubmit() { await this.click(this.submitBtn) }

    async logInUser(email, pass) {
        this.fillEmail(email)
        this.fillPassword(pass)
        this.clickSubmit()
    }
}

export default new SignInPage()