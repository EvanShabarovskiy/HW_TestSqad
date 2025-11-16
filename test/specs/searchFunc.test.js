import { expect } from '@wdio/globals'
import homePage from '../pageobjects/home.page'
import Header from '../pageobjects/header.page'
import searchPage from '../pageobjects/search.page'

it('Check functional of "Search" button (positive)', async () => {
    const searchRequest = 'selenium'
    await homePage.open()
    await Header.fillSearchInput(searchRequest)
    await searchPage.waitSearchPageLoaded()
    await expect(await searchPage.getCurrentURL()).toContain('https://github.com/search');
    await expect(await searchPage.getAllTextInBlock()).toContain(searchRequest);
})