<template>
    <main>
        <section class="quotes">
            <header class="quotes__header">
                <p>After using your details, we're unable to offer you the original quote</p>
            </header>
            <ol class="quotes__list">
                <li class="quotes__item" v-bind:class="{ 'quotes___item--selected':q.enhanced.quoteHash===selectedReviewQuoteHash }" v-for="q in reviewQuotes">
                    <p>£{{q.enhanced.annualNetCost}} per year with {{q.supplier}} saving £{{q.enhanced.monthlyGrossSaving}} per month</p>
                    <button class="quotes__item_button-more" v-bind:disabled="!q.enhanced.customQuoteDetails" v-on:click="toggleDetails(q.enhanced.quoteHash)" v-if="showDetailsFor!==q.enhanced.quoteHash">More Details</button>
                    <button class="quotes__item_button-less" v-bind:disabled="!q.enhanced.customQuoteDetails" v-on:click="toggleDetails(q.enhanced.quoteHash)" v-if="showDetailsFor===q.enhanced.quoteHash">Less Details</button>
                    <button class="quotes__item_button-select" v-if="q.enhanced.eSign" v-on:click="selectReviewQuote(q)">Select</button>
                    <button class="quotes__item_button-call" v-else>Call</button>
                    <div class="quotes__item_details" v-if="showDetailsFor===q.enhanced.quoteHash">
                        <span v-if="q.enhanced.customQuoteDetails.price">Price: {{q.enhanced.customQuoteDetails.price}}</span>
                    </div>
                </li>
            </ol>
        </section>
    </main>
</template>


<script>
import { mapState, mapActions } from "vuex";
import { getQuotesClientSide, getQuotesServerSide } from "../../../plugins/api";
import R from "ramda";

export default {
    computed: {
        ...mapState({
            switchId: state => state.switchId,
            reviewQuotes: state => state.reviewQuotes,
            showDetailsFor: state => state.showDetailsFor,
            selectedReviewQuoteHash: state => R.pathOr(null, "selectedReviewQuote.enhanced.quoteHash".split("."), state)
        })
    },
    methods: {
        ...mapActions({
            "toggleDetails": "toggleDetailsAction",
            "selectReviewQuote": "reviewQuoteSelectedAction"
        })
    },
    mounted () {
        this.$store.dispatch("setRouterFromMountAction", this.$router);
    },
    async fetch ({ isClient, isServer, env, params, store, redirect }) {
        const { dispatch } = store;
        if (isClient) {
            const { state } = store;
            const quoteMetaAndData = await getQuotesClientSide(state);
            dispatch("initReviewPageClientSideAction", { quoteMetaAndData });
        }
        if (isServer) {
            const { switchData, quoteMetaAndData } = await getQuotesServerSide(env, params);
            dispatch("initReviewPageServerSideAction", { switchData, quoteMetaAndData, redirect });
        }
    }
};
</script>
