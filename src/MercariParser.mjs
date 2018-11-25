export class MercariItemParser {
    constructor(document) {
        this.document = document;
    }

    parse() {
        const mainItemElement = this.document.querySelector('main.item-container');
        const innerItemElement = mainItemElement.querySelector('div.item-container-inner');
        const itemBodyElement = innerItemElement.querySelector('div.item-column-right section.item-body');
        const itemPriceElement = innerItemElement.querySelector('div.item-price');

        const id = itemPriceElement.querySelector('div.item-like-container button.item-like').getAttribute('data-id');

        const title = itemBodyElement.querySelector('h2').textContent;

        const descriptionElement = itemBodyElement.querySelector('div.item-description p');

        const description = Array.from(descriptionElement.childNodes)
            .filter(node => node.className !== 'read-more-button')
            .map(n => n.textContent.trim())
            .join('');

        const dateAndLocation = itemBodyElement.querySelector('div.item-date').childNodes[0].textContent;
        const matchedDateAndLocation = dateAndLocation.match(/\s+(.+)\s+•\s+(.+)\s+•\s+/);
        const location = matchedDateAndLocation[1];
        const date = matchedDateAndLocation[2];

        const price = itemPriceElement.querySelector('h3').textContent;

        const imageNodes = innerItemElement.querySelectorAll('div.owl-carousel div.owl-stage-outer div.owl-stage img');
        const images = Array.from(imageNodes).map(node => node.src);

        const userElement = mainItemElement.querySelector('aside div.review-user-info div h3 a');
        const userId = userElement.getAttribute('href').match(/\/u\/(.+)\//)[1];
        const username = userElement.textContent;

        return {
            id,
            title,
            description,
            price,
            location,
            date,
            images,
            seller: {
                userId,
                username,
                profile: `https://www.mercari.com/u/${userId}/`
            }
        };
    }
}