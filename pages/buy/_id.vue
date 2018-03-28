<template>
  <div v-if="deal">
    <h1 class="text-center my-4 px-4">{{deal.Telcos_device_full_name}}</h1>
    <h2 class="text-center my-4 px-4">We're redirecting you shortly to complete your purchase</h2>
    <h3 class="text-center my-4 px-4">{{deal.merchant_name.toUpperCase()}} will take care of you from here</h3>
    <div class="flex justify-center my-8">
      <p>Click
        <a :href="deal.aw_deep_link">here</a> to get there now</p>
    </div>
  </div>
  <div v-else class="flex flex-col items-center p-6">
    <h1 class="text-brand-pink px-4 py-8">Apologies but we're unable to find this deal. It may no longer be available. Please try a new search.</h1>
    <nuxt-link class="btn hover:bg-pink-light w-4/5 sm:w-3/5 sm:max-w-xs px-4 py-2 mt-4 sm:mt-8" to="/mobile-phones/samsung/s9">SAMSUNG GALAXY S9/+</nuxt-link>
    <nuxt-link class="btn hover:bg-pink-light w-4/5 sm:w-3/5 sm:max-w-xs px-4 py-2 mt-4 sm:mt-4" to="/mobile-phones/apple/iphonex">APPLE IPHONE X</nuxt-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("buyStore");

export default {
    computed: {
        ...mapGetters([
            "deal",
        ])
    },
    mounted () {
        // this is because there is a bug in vue-router which stops an external redirect using its api.
        // also, it allows us to display a we're redirecting you page
        window.onload = function () {
            top.setTimeout(function () {
                top.location.href = this.$nuxt.$store.getters["buyStore/deal"].aw_deep_link;
            }, process.env.dealRedirectTimeoutMs);
        };
    },
    async fetch({ store, params }) {
        const { dispatch } = store;
        const { id } = params;
        return dispatch("buyStore/initBuyPageAction", { id });
    },
    head () {
        const deal = this.deal || {
            Telcos_device_description: "",
            Telcos_device_full_name: "Deal not found - Mopho"
        };
        return {
            title: `${deal.Telcos_device_full_name} - Mopho`,
            meta: [
                { hid: "description", name: "description", content: deal.Telcos_device_description }
            ]
        };
    }
};
</script>