<template>
    <main>
        <section>
            <ol>
                <li v-for="d in deals">
                    <p>{{d}}</p>
                </li>
            </ol>
        </section>
    </main>
</template>


<script>
import { mapState, mapActions } from "vuex";
import { getDeals } from "../../../plugins/api";

export default {
    computed: {
        ...mapState({
            deals: state => state.deals
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
    // validate ({ params, store }) {
    //     const step1SwitchIdEqualsParamId = store.state.serverSwitchId === params.id;
    //     const paramsHasIdProp = params.id != null;
    //     return step1SwitchIdEqualsParamId || paramsHasIdProp;
    // },
    async fetch ({ isClient, isServer, env, params, store }) {
        const { dispatch } = store;
        // if (isClient) {
        //     const { state } = store;
        //     const {
        //         typeHasChanged,
        //         currentMonthlyCostHasChanged,
        //         selectedAddressIdHasChanged,
        //         selectedAddressId,
        //         quotes,
        //         selectedQuote
        //     } = state;
        //     const loadQuotesFromStep1 = selectedAddressId &&
        //         (!quotes ||
        //             typeHasChanged ||
        //             currentMonthlyCostHasChanged ||
        //             selectedAddressIdHasChanged);
        //     if (loadQuotesFromStep1 || selectedQuote) {
        //         const quoteMetaAndData = await getQuotesClientSide(state);
        //         dispatch("initPricesPageClientSideAction", quoteMetaAndData);
        //     }
        // }
        // if (isServer) {
        const deals = await getDeals(env, params);
        dispatch("initFilteredPageAction", deals);
        // }
    }    // middleware: ["ensureSwitchId"]
};
</script>
