# Mercari Parser
This simple library parses DOM `Document` objects of [Mercari](https://www.mercari.com/) pages in to machine friendly JSON output. It is mainly intended to be ran in the browser right on the page itself but could also be used in node by using something like [jsdom](https://github.com/jsdom/jsdom).

## Setup
```console
npm install git+https://github.com/louistio/mercari-parser.git --save
```

## Usage
Assuming you have access to a compliant `Document` object of a Mercari item page, this is how you use it:
```js
import { MercariItemParser } from 'mercari-parser';

const item = new MercariItemParser(document).parse();
```

Resulting `item` will look like:
```json
{
  "version": "2",
  "id": "...",
  "title": "...",
  "description": "...",
  "price": "...",
  "shipping": "...",
  "date": "...",
  "imageUrl": "https://(...).jpg",
  "seller": {
    "userId": "...",
    "username": "...",
    "profile": "https://(...)/"
  }
}
```
