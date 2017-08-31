<template>
    <main>
        <section class="no-quotes" v-if="noQuotes">
            Half Hourly Meter
        </section>
        <section class="quotes" v-else>
            <header class="quotes__header">
                <p>Good news, we've finished checking over <em>4,000</em> quotes and have picked out <em>{{quotes.length}} great deals</em> for you</p>
            </header>
            <ol class="quotes__list">
                <li class="quotes__item" v-bind:class="{ 'quotes___item--selected':q.enhanced.quoteHash===selectedQuoteHash }" v-for="q in quotes">
                    <p>£{{q.enhanced.annualNetCost}} per year with {{q.supplier}} saving £{{q.enhanced.monthlyGrossSaving}} per month</p>
                    <button class="quotes__item_button-more" v-bind:disabled="!q.enhanced.customQuoteDetails" v-on:click="toggleDetails(q.enhanced.quoteHash)" v-if="showDetailsFor!==q.enhanced.quoteHash">More Details</button>
                    <button class="quotes__item_button-less" v-bind:disabled="!q.enhanced.customQuoteDetails" v-on:click="toggleDetails(q.enhanced.quoteHash)" v-if="showDetailsFor===q.enhanced.quoteHash">Less Details</button>
                    <button class="quotes__item_button-select" v-if="q.enhanced.eSign" v-on:click="selectQuote(q)">Select</button>
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
import { getQuotesServerSide, getQuotesClientSide } from "../../../plugins/api";
import R from "ramda";

export default {
    computed: {
        ...mapState({
            switchId: state => state.switchId,
            quotes: state => state.quotes,
            noQuotes: state => state.noQuotes,
            showDetailsFor: state => state.showDetailsFor,
            selectedQuoteHash: state => R.pathOr(null, "selectedQuote.enhanced.quoteHash".split("."), state)
        })
    },
    methods: {
        ...mapActions({
            "toggleDetails": "toggleDetailsAction",
            "selectQuote": "quoteSelectedAction"
        })
    },
    mounted () {
        this.$store.dispatch("setRouterFromMountAction", this.$router);
    },
    validate ({ params, store }) {
        const step1SwitchIdEqualsParamId = store.state.serverSwitchId === params.id;
        const paramsHasIdProp = params.id != null;
        return step1SwitchIdEqualsParamId || paramsHasIdProp;
    },
    async fetch ({ isClient, isServer, env, params, store }) {
        // note moving this to the store didn't work because the state is not initialised
        // before the fetch
        const { dispatch } = store;
        if (isClient) {
            const { state } = store;
            const {
                typeHasChanged,
                currentMonthlyCostHasChanged,
                selectedAddressIdHasChanged,
                selectedAddressId,
                quotes,
                selectedQuote
            } = state;
            const loadQuotesFromStep1 = selectedAddressId &&
                (!quotes ||
                    typeHasChanged ||
                    currentMonthlyCostHasChanged ||
                    selectedAddressIdHasChanged);
            if (loadQuotesFromStep1 || selectedQuote) {
                const quoteMetaAndData = await getQuotesClientSide(state);
                dispatch("initPricesPageClientSideAction", quoteMetaAndData);
            }
        }
        if (isServer) {
            const { switchData, quoteMetaAndData } = await getQuotesServerSide(env, params);
            dispatch("initPricesPageServerSideAction", { switchData, quoteMetaAndData });
        }
    }    // middleware: ["ensureSwitchId"]
};
</script>
