<script setup lang="ts">
import { ref } from 'vue';
import { useQuoteStore } from '@/stores/quotes';

const quoteStore = useQuoteStore();
quoteStore.$reset();

let error = ref("");
let isError = ref(false);

function getQuotes() {
    quoteStore.$reset()
    fetch('https://api.quotable.io/quotes/random?limit=10')
        .then(response => {
            if(!response.ok) {
                throw "Something went wrong! " + response.statusText;
            }

            return response.json();
        })
        .then((data) => {
            console.log(data);
            quoteStore.setQuotes(data);
        })
        .catch(errorResponse => {
            isError.value = true;
            error.value = errorResponse;
        });
}

function getRandomQuote() {
    quoteStore.getRandomQuote();
}

function resetQuotes() {
    quoteStore.$reset();
}

</script>
<template>
    <div class="quote-list">
        <div class="header">
            <h1>Quotes</h1>

            <div class="header-btns">
                <button class="divider" @click="getQuotes">Update quotes</button>
                <button class="divider" @click="getRandomQuote">Random quote</button>
                <button @click="resetQuotes">Reset quotes</button>
            </div>
        </div>
        <ul v-if="quoteStore.quotes.length" class="quotes-list">
            <li v-for="quote in quoteStore.quotes" :key="quote._id" class="quote-item">
                <figure>
                    <blockquote>
                        <p>{{ quote.content }}</p>
                        <figcaption>
                            {{ quote.author }}
                        </figcaption>
                    </blockquote>
                </figure>
            </li>
        </ul>
        <p v-if="isError"><small>{{ error }}</small></p>

        <div class="random-quote" v-if="quoteStore.quote">
            <h3>Random quote</h3>
            <figure>
                <blockquote>
                    <p>{{ quoteStore.quote.content }}</p>
                    <figcaption>
                        {{ quoteStore.quote.author }}
                    </figcaption>
                </blockquote>
            </figure>
        </div>
    </div>
</template>
<style lang="scss">
.header {
    background-color: #1a1a1a;
    overflow: auto;
    display: flex;
    justify-content: space-between;
    h1 {
        float: left;
    }

    .header-btns {
        display: inherit;
        flex-wrap: wrap;
        align-content: center;
        
        button {
            border: none;
            background-color: #1a1a1a;
            color: #a1a1a1;

            &.divider {
                border-right: 1px solid #a1a1a1;
            }

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
.quotes-list {
    list-style: none;
    padding: 0;

    .quote-item {
        margin-bottom: 10px;
    }
}

blockquote {
    margin: 0;
    font-size: 0.8rem;
    padding: 10px;
    background: #a1a1a1;
    border-radius: 3px;
    color: #1a1a1a;

    p {

        &::before {
            content: '\201C';
        }
        
        &::after {
            content: '\201D';
        }
    }

    figcaption {
        text-align: right;
        font-size: .6rem;
    }
}

</style>