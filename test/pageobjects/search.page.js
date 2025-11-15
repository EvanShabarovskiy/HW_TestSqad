import Page from './page.js'

class searchPage extends Page { 
    open() {
        return super.open('/search');
    }

    get searchResults() { return $('div[data-testid="results-list"]') }
    get searchInput() { return $('#query-builder-test') }

    async firstSearchedResult() { 
        await this.searchResults.waitForDisplayed({ timeout: 5000 });
        return this.searchResults.$('div') 
    }
    
    async getAllTextInBlock() {
        return await (await this.firstSearchedResult()).getText();
    }

    async waitSearchPageLoaded() {
        await this.searchResults.waitForDisplayed({ timeout: 5000 });
    }

    async fillSearchInput(request) {
        await this.click(this.searchBtn)
        await this.setValue(this.searchInput, request)
        await browser.keys('Enter');
    }   
}
export default new searchPage()