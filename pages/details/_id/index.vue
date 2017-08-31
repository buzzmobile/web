<template>
    <main>
    <form @submit.prevent="continueClicked">
        <fieldset>
            <legend>Current Supplier</legend>
            <p>Please select your current supplier</p>
            <ul>
                <li v-for="c in currentSupplierPickList">
                    <input type="radio" name="currentSupplier" :id="c" @change="currentSupplierChanged(c)" :checked="currentSupplier===c"/>
                    <label :for="c">{{c}}</label>
                </li>
            </ul>
        </fieldset>
        <fieldset>
            <legend>Contact Details</legend>
            <label for="firstName">Contact Name</label>
            <input type="text" id="firstName" :value="firstName" @input="firstNameChanged">
            <input type="text" id="lastName" :value="lastName" @input="lastNameChanged">
            <label for="position">Position in Company</label>
            <input type="text" id="position" :value="position" @input="positionChanged">
            <label for="email">Email</label>
            <input type="email" id="email" :value="email" @input="emailChanged">
            <label for="telephone">Phone</label>
            <input type="tel" id="telephone" :value="telephone" @input="telephoneChanged">
        </fieldset>
        <fieldset>
            <legend>Business Details</legend>
            <label for="businessType">Type</label>
            <ul>
                <li v-for="(b,i) in businessTypePickList">
                    <input type="radio" name="businessType" :id="b.type+i" @change="businessTypeChanged(b)" :checked="businessType && businessType.type===b.type"/>
                    <label :for="b.type+i">{{b.display}}</label>
                </li>
            </ul>
            <label for="businessName">Find your business</label>
            <input type="text" id="businessName" :value="businessName" @input="businessNameChanged">
            <button type="button" id="companySearchButton" v-on:click="searchForCompany">Search</button>
            <ul>
                <li v-for="(c,i) in companyPickList">
                    <input type="radio" name="companyPick" :id="c.companyNumber" @change="companyPickChanged(c)" :checked="companyPick && companyPick.companyNumber===c.companyNumber"/>
                    <label :for="c.companyNumber">{{c.display}}</label>
                </li>
            </ul>
        </fieldset>
        <fieldset>
            <legend>Credit Check</legend>
            <input type="checkbox" id="creditCheckAccept" :checked="creditCheckAccepted" @change="creditCheckAcceptedChanged">
            <label for="creditCheckAccept">To get the best prices available we'll need to check your credit score. Please select if you agree.</label>
        </fieldset>
        <button type="submit">Continue</button>
    </form>
    </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getDetailsServerSide, getDetailsClientSide } from "../../../plugins/api";

export default {
    computed: {
        ...mapState({
            currentSupplierPickList: state => state.currentSupplierPickList,
            currentSupplier: state => state.currentSupplier,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            position: state => state.position,
            email: state => state.email,
            telephone: state => state.telephone,
            businessTypePickList: state => state.businessTypePickList,
            businessType: state => state.businessType,
            businessName: state => state.businessName,
            companyPickList: state => state.companyPickList,
            companyPick: state => state.companyPick,
            creditCheckAccepted: state => state.creditCheckAccepted
        })
    },
    methods: {
        ...mapActions({
            "currentSupplierChanged": "currentSupplierChangedAction",
            "firstNameChanged": "firstNameChangedAction",
            "lastNameChanged": "lastNameChangedAction",
            "positionChanged": "positionChangedAction",
            "emailChanged": "emailChangedAction",
            "telephoneChanged": "telephoneChangedAction",
            "businessTypeChanged": "businessTypeChangedAction",
            "businessNameChanged": "businessNameChangedAction",
            "searchForCompany": "searchForCompanyAction",
            "companyPickChanged": "companyPickChangedAction",
            "creditCheckAcceptedChanged": "creditCheckAcceptedChangedAction",
            "continueClicked": "submitDetailsAction"
        })
    },
    mounted () {
        this.$store.dispatch("setRouterFromMountAction", this.$router);
    },
    async fetch (context) {
        const { isClient, isServer, env, params, store } = context;
        const { dispatch } = store;
        if (isClient) {
            const { state } = store;
            const currentSupplierPickList = await getDetailsClientSide(state);
            dispatch("initDetailsPageClientSideAction", currentSupplierPickList);
        }
        if (isServer) {
            const { switchData, currentSupplierPickList, companyPickList } = await getDetailsServerSide(env, params);
            dispatch("initDetailsPageServerSideAction", { switchData, currentSupplierPickList, companyPickList });
        }
    }
};
</script>
