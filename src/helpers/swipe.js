export default class Swipe {

    async swipe(direction, element) {
        switch (direction) {
            case 'left':
                element ? await this.swipeLeft(element) : await this.swipeLeft();
                break;
            case 'right':
                element ? await this.swipeRight(element) : await this.swipeRight();
                break;
            case 'up':
                element ? await this.swipeUp(element) : await this.swipeUp();
                break;
            case 'down':
                element ? await this.swipeDown(element) : await this.swipeDown();
                break;
        }
    }

    async swipeUntilElementVisible(element, direction, elementToSwipeWithin) {
        let elementVisible = false;

        while (!elementVisible) {
            await this.swipe(direction, elementToSwipeWithin);
            elementVisible = await element.isDisplayed();
        }
    }

    async swipeNumberOfTimes(numberOfTimes, direction, elementToSwipeWithin) {
        for (let i = 0; i <= numberOfTimes; i++) {
            await this.swipe(direction, elementToSwipeWithin);
        }
    }

    async swipeLeft(element) {
        if (element) {
            const elementRect = await this.getElementRect(element);
            const coords = this.getElementLeftSwipeCoord(elementRect);
            return await this.performSwipe(coords);
        }
        const coords = await this.getScreenLeftSwipeCoord();
        await this.performSwipe(coords);
    }

    async swipeRight(element) {
        if (element) {
            const elementRect = await this.getElementRect(element);
            const coords = this.getElementRightSwipeCoord(elementRect);
            return await this.performSwipe(coords);
        }

        const coords = await this.getScreenRightSwipeCoord();
        await this.performSwipe(coords);
    }

    async swipeDown(element) {
        if (element) {
            const elementRect = await this.getElementRect(element);
            const coords = this.getElementDownSwipeCoord(elementRect);
            return await this.performSwipe(coords);
        }

        const coords = await this.getScreenDownSwipeCoord();
        await this.performSwipe(coords);
    }

    async swipeUp(element) {
        if (element) {
            const elementRect = await this.getElementRect(element);
            const coords = this.getElementUpSwipeCoord(elementRect);
            return await this.performSwipe(coords);
        }
        const coords = await this.getScreenUpSwipeCoord();
        await this.performSwipe(coords);
    }

    async performSwipe({start, end}) {
        await driver.performActions([{
            'type': 'pointer',
            'id': 'finger1',
            'parameters': {'pointerType': 'touch'},
            'actions': [
                {'type': 'pointerMove', 'duration': 0, 'x': start.x, 'y': start.y},
                {'type': 'pointerDown', 'button': 0},
                {'type': 'pause', 'duration': 500},
                {'type': 'pointerMove', 'duration': 2000, 'x': end.x, 'y': end.y},
                {'type': 'pointerUp', 'button': 0},
            ],
        }]);
    }

    getElementLeftSwipeCoord(elementRect) {
        return {
            start: {
                x: elementRect.width - elementRect.x - 30,
                y: elementRect.height / 2 + elementRect.y,
            },
            end: {
                x: elementRect.x + 30,
                y: elementRect.height / 2 + elementRect.y,
            },
        };
    }

    getElementRightSwipeCoord(elementRect) {
        return {
            start: {
                x: elementRect.x + 30,
                y: elementRect.height / 2 + elementRect.y,
            },
            end: {
                x: elementRect.width - elementRect.x - 30,
                y: elementRect.height / 2 + elementRect.y,
            },
        };
    }

    getElementDownSwipeCoord(elementRect) {
        return {
            start: {
                x: elementRect.width / 2 + elementRect.x,
                y: elementRect.y + 30,
            },
            end: {
                x: elementRect.width / 2 + elementRect.x,
                y: elementRect.height + elementRect.y - 30,
            },
        };
    }

    getElementUpSwipeCoord(elementRect) {
        return {
            start: {
                x: elementRect.width / 2 + elementRect.x,
                y: elementRect.height + elementRect.y - 30,
            },
            end: {
                x: elementRect.width / 2 + elementRect.x,
                y: elementRect.y + 30,
            },
        };
    }

    async getScreenLeftSwipeCoord() {
        const windowSize = await driver.getWindowSize();
        return {
            start: {
                x: windowSize.width - 30,
                y: windowSize.height / 2,
            },
            end: {
                x: 0,
                y: windowSize.height / 2,
            },
        };
    }

    async getScreenRightSwipeCoord() {
        const windowSize = await driver.getWindowSize();
        return {
            start: {
                x: 30,
                y: windowSize.height / 2,
            },
            end: {
                x: windowSize.width,
                y: windowSize.height / 2,
            },
        };
    }

    async getScreenDownSwipeCoord() {
        const windowSize = await driver.getWindowSize();
        return {
            start: {
                x: windowSize.width / 2,
                y: windowSize.height - 230,
            },
            end: {
                x: windowSize.width / 2,
                y: 0,
            },
        };
    }

    async getScreenUpSwipeCoord() {
        const windowSize = await driver.getWindowSize();
        return {
            start: {
                x: windowSize.width / 2,
                y: 230,
            },
            end: {
                x: windowSize.width / 2,
                y: windowSize.height,
            },
        };
    }

    async getElementRect(element) {
        return driver.getElementRect(await element.elementId);
    }
}
