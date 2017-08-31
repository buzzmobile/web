<template>
    <main>
        <form @submit.prevent="continueClicked">
            <fieldset>
                <legend>Direct Debit Information</legend>
                <label for="accountHolder1">Account Holder 1</label>
                <input type="text" id="accountHolder1" :value="accountHolder1" @input="accountHolder1Changed">
                <label for="accountHolder2">Account Holder 2</label>
                <input type="text" id="accountHolder2" :value="accountHolder2" @input="accountHolder2Changed">
                <label for="accountNumber">Account Number</label>
                <input type="text" id="accountNumber" :value="accountNumber" @input="accountNumberChanged">
                <label for="sortCode">Sort Code</label>
                <input type="text" id="sortCode" :value="sortCode" @input="sortCodeChanged">
                <button type="button" v-on:click="getBankDetailsClicked">Get Bank Details</button>
                <div>
                    <label for="bankConfirm">Bank Details: </label>
                    <span id="bankConfirm"></span>{{bankDisplay}}
                </div>
            </fieldset>
            <fieldset>
                <legend>Confirmation</legend>
                <input type="checkbox" id="tnc" :checked="tncAccepted" @change="tncAcceptedChanged" >
                <label for="tnc">I have read and accepted the supplier terms and conditions</label>
            </fieldset>
            <button type="submit">Switch Me</button>
            <button type="button" v-on:click="signContractClicked">Sign Contract</button>
        </form>
    </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getSummaryServerSide } from "../../../plugins/api";

export default {
    computed: {
        ...mapState({
            accountHolder1: state => state.accountHolder1,
            accountHolder2: state => state.accountHolder2,
            accountNumber: state => state.accountNumber,
            sortCode: state => state.sortCode,
            tncAccepted: state => state.tncAccepted,
            bankDisplay: state => state.bankDisplay
        })
    },
    methods: {
        ...mapActions({
            "accountHolder1Changed": "accountHolder1ChangedAction",
            "accountHolder2Changed": "accountHolder2ChangedAction",
            "accountNumberChanged": "accountNumberChangedAction",
            "sortCodeChanged": "sortCodeChangedAction",
            "tncAcceptedChanged": "tncAcceptedChangedAction",
            "getBankDetailsClicked": "getBankDetailsClickedAction",
            "signContractClicked": "signContractClickedAction",
            "continueClicked": "submitSummaryAction"
        })
    },
    mounted () {
        this.$store.dispatch("setRouterFromMountAction", this.$router);
    },
    async fetch ({ isClient, isServer, env, params, store, redirect }) {
        const { dispatch } = store;
        if (isClient) {
            dispatch("initSummaryPageClientSideAction");
        }
        if (isServer) {
            const switchData = await getSummaryServerSide(env, params);
            dispatch("initSummaryPageServerSideAction", { switchData, redirect });
        }
    }
};
</script>
