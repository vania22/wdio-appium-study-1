import Menu from '../pageobjects/menu';
import Swipe from '../helpers/swipe';
import SwipePage from '../pageobjects/swipe';

let menu;

describe('My Login application', () => {
    beforeEach(async () => {
        menu = new Menu();
        await menu.waitForMenuToAppear();
        // await menu.homeButton.click();
    });


    it('should login with valid credentials', async () => {
        await menu.swipeButton.click();
        await driver.pause(3000);
        const swipe = new Swipe();
        const swipePage = new SwipePage();
        await swipe.swipeUntilElementVisible(swipePage.hiddenText, 'down');
        await driver.pause(5000);
    });

    // it('should login with valid credentials', async () => {
    //     await menu.webviewButton.click();
    //     await driver.pause(10000);
    //     const contexts = await driver.getContexts();
    //     console.log('Contexts: ' + contexts);
    //     // await driver.pause(10000);
    // });
});


