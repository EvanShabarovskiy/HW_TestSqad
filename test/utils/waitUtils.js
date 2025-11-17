export async function waitForExactUrl(expectedUrl, timeout = 5000) {
    await browser.waitUntil(
        async () => (await browser.getUrl()) === expectedUrl,
        {
            timeout,
            timeoutMsg: `URL did not match exactly "${expectedUrl}" after ${timeout}ms`
        }
    );
}

export async function waitForUrlStartsWith(prefix, timeout = 5000) {
    await browser.waitUntil(
        async () => (await browser.getUrl()).startsWith(prefix),
        {
            timeout,
            timeoutMsg: `URL did not start with "${prefix}" after ${timeout}ms`
        }
    );
}

export async function waitForUrlContains(fragment, timeout = 5000) {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes(fragment),
        {
            timeout,
            timeoutMsg: `URL did not contain "${fragment}" after ${timeout}ms`
        }
    );
}