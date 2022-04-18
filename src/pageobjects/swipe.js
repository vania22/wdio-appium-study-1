export default class SwipePage {
    get carousel() {
        return $('~Carousel');
    }

    get hiddenText() {
        return $('//*[@text="You found me!!!"]');
    }
}
