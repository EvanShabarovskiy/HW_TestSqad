import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://github.com/${path}`)
    }

    async click(element) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.waitForClickable({ timeout: 5000 }); 
        await element.click();
    }

    async setValue(element, value) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.setValue(value);
    }

    async clickRandomFromList(list) {
        await list.waitForDisplayed({ timeout: 5000 });
        const items = await list.$$('li');
        const randomIndex = Math.floor(Math.random() * items.length);
        await items[randomIndex].click();
    }

    async getCurrentURL() { return await browser.getUrl();}
}
