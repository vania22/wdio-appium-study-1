import {visibilityOf} from 'wdio-wait-for';

export default class Menu {
    get loginButton() {
        return $('~Login');
    }

    get homeButton() {
        return $('~Home');
    }

    get webviewButton() {
        return $('~Webview');
    }

    get swipeButton() {
        return $('~Swipe');
    }

    async waitForMenuToAppear() {
        await this.homeButton.waitForDisplayed({timeout: 5000});
    }
}
