import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page'
import header from '../pageobjects/header.page'
import searchPage from '../pageobjects/search.page'
import { waitForUrlContains} from '../utils/waitUtils.js';

it('Check searching functional (positive)', async () => {
    const searchRequest = 'selenium'
    await homePage.open()
    await header.fillSearchInput(searchRequest)
    await searchPage.waitSearchPageLoaded()
    await waitForUrlContains('https://github.com/search')
    await expect(await searchPage.getAllTextInBlock()).toContain(searchRequest);
})