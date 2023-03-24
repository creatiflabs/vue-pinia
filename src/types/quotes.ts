export type Quote = {
    _id: string;
    author: string;
    content: string;
    tags: Array<string>;
    authorSlug: string;
};

export type QuoteState = {
    quotes: Array<Quote>,
    quote: Quote | null
};