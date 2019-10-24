export class MercariItemParser {
    constructor(document) {
        this.document = document;
    }

    parse() {
        const mainContainerElement = Array.from(this.document.querySelector('div[class^=ItemDesktop__TopWrapper]').childNodes)[1];
        const rightColumnElement = mainContainerElement.querySelector('div[class^=ItemDesktop__RightColumn]');
        const leftColumnElement = mainContainerElement.querySelector('div[class^=ItemDesktop__LeftColumn]');

        const informationSectionElements = rightColumnElement
            .querySelectorAll('div[class^=Section] div[class^=Container] div[class^=Flex]');
        const informationLabels = new Map(
            Array.from(informationSectionElements)
                .map(e => Array.from(e.querySelectorAll('p')).map(p => p.textContent))
                .filter(a => a.length > 1)
        );
        const shipping = informationLabels.get('Shipping');
        const date = informationLabels.get('Posted');

        const id = leftColumnElement
            .querySelector('a[class*=ReportLink]')
            .getAttribute('href')
            .match(/^\/report\/(.+)\/$/)[1];

        const title = rightColumnElement.querySelector('h1').textContent;

        const description = rightColumnElement.querySelector('p[class^=ItemDescription__DescriptionText]').textContent;

        const price = rightColumnElement.querySelector('p[class^=ItemInfo__ProductPrice]').textContent;

        const imageUrl = leftColumnElement.querySelector('div[class^=PhotoCarouselDesktop__SquareContainer] img').src;

        const userElement = mainContainerElement.querySelector('a[class^=MessageSeller__BoldLink]');
        const userId = userElement.getAttribute('href').match(/\/u\/(.+)/)[1];
        const username = userElement.textContent;

        return {
            version: '2',
            id,
            title,
            description,
            price,
            shipping,
            date,
            imageUrl,
            seller: {
                userId,
                username,
                profile: `https://www.mercari.com/u/${userId}/`
            }
        };
    }
}
