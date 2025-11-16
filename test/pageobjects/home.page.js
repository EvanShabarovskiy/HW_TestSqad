import Page from './page.js';

class HomePage extends Page {
    open() { return super.open('') }
    get userAccBtn() { return $('button.Button--invisible.Button--medium.Button.Button--invisible-noVisuals.color-bg-transparent') }
}

export default new HomePage();
