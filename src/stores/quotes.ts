import type { Quote, QuoteState } from "@/types/quotes";
import { defineStore } from "pinia";

export const useQuoteStore = defineStore('quotes', { 
    state: (): QuoteState => {
        return {
            quotes: [],
            quote: null
        }
    },
    actions: {
        getRandomQuote() {
            this.quote = this.quotes[Math.floor(Math.random() * (this.quotes.length - 0) ) + 0];
        },
        setQuotes(quotes: Array<Quote>) {
            quotes.forEach((quote) => {
                this.quotes.push(quote);
            })
        }
    }
});