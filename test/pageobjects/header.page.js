import Page from './page.js'

class Header extends Page { 
    get searchBtn() { return $('.header-search-button') }
    get searchInput() { return $('#query-builder-test') }

    async fillSearchInput(request) {
        await this.click(this.searchBtn)
        await this.setValue(this.searchInput, request)
        await browser.keys('Enter');
    }    

}
export default new Header()