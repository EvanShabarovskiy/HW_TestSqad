import Page from './page.js';

class HomePage extends Page {
    open() {
        return super.open('');
    }

    get signUpBtn () {
        return $('.HeaderMenu-link--sign-up');
    }

    async Click_SignUpBtn() {
        await this.signUpBtn.waitForClickable();
        await this.signUpBtn.click();
    }
}

export default new HomePage();
