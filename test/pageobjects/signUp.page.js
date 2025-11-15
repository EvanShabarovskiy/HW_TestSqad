import Page from './page.js'

class SignUpPage extends Page {
    open() { return super.open('signup') }

    get emailInput() { return $('#email') }
    get passwordInput() { return $('#password') }
    get userNameInput() { return $('#login') }
    get countryInput() { return $('.select-panel-wrapper') }
    get checkbox() { return $('.FormControl-checkbox') }
    get submitBtn() { return $('.js-octocaptcha-load-captcha') }
    get countryList() { return $('div[data-target="select-panel.list"] ul') }
    get verifyAccTitle() { return $('#verify-account-header') }
    get verifyAccBtn() { return $('button.form-control.signup-form-fields__button.js-octocaptcha-form-submit.Button--primary.Button--medium.Button.Button--fullWidth') }    

    async submitWhenChecked() {
        await this.verifyAccBtn.waitForDisplayed({ timeout: 100000 })
        await this.click(this.verifyAccBtn)
    }

    async fillEmail(email) {
        await this.setValue(this.emailInput, email)
    }

    async fillPassword(pass) {
        await this.setValue(this.passwordInput, pass)
    }

    async fillUserName(name) {
        await this.setValue(this.userNameInput, name)
    }

    async choseRandomCountry() {
        await this.click(this.countryInput)
        await this.clickRandomFromList(this.countryList)
    }

    async clickCheckBox() {
        await this.click(this.checkbox)
    }

    async clickSubmit() {
        await this.submitBtn.scrollIntoView({ block: 'center' })
        await this.click(this.submitBtn)
    }

    async checkIsVerifyAccPage() {
        await this.verifyAccTitle.waitForDisplayed({ timeout: 5000 });
    }
}

export default new SignUpPage()
