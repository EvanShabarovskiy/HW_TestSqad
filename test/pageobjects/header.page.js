import Page from './page.js'

class Header extends Page { 
    get searchBtn() { return $('.header-search-button') }
    get searchInput() { return $('#query-builder-test') }
    get signUpBtn () { return $('.HeaderMenu-link--sign-up') }
    get signOutMenuBtn() { return $('.prc-ActionList-ActionList-X4RiC > :last-child a') }
    get userAccBtn() { return $('button.Button--invisible.Button--medium.Button.Button--invisible-noVisuals.color-bg-transparent') }

    async fillSearchInput(request) {
        await this.click(this.searchBtn)
        await this.setValue(this.searchInput, request)
        await browser.keys('Enter');
    }  

    async gotoSignOutPage() { 
        await this.click(this.userAccBtn)
        await this.click(this.signOutMenuBtn)
    }    
}
export default new Header()