<template>
  <div v-if="deal">
    <h1 class="text-center my-4 px-4">{{deal.Telcos_device_full_name}}</h1>

    <div class="flex flex-col sm:flex-row sm:items-center">
      <div class="sm:w-1/2">
        <img v-if="imageKey(deal)==='s9-midnight-black'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-black-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-black-back-480.jpg 480w,
                ~/assets/images/s9/galaxy-s9-black-back-684.jpg 684w,
                ~/assets/images/s9/galaxy-s9-black-back-763.jpg 763w,
                ~/assets/images/s9/galaxy-s9-black-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-black-back-360.jpg"
          alt="Samsung S9 in Midnight Black">
        <img v-if="imageKey(deal)==='s9-plus-midnight-black'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-black-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-black-back-698.jpg 698w,
                ~/assets/images/s9/galaxy-s9-plus-black-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-black-back-360.jpg"
          alt="Samsung S9 Plus in Midnight Black">
        <img v-if="imageKey(deal)==='s9-lilac-purple'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-purple-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-purple-back-581.jpg 581w,
                ~/assets/images/s9/galaxy-s9-purple-back-785.jpg 785w,
                ~/assets/images/s9/galaxy-s9-purple-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-purple-back-360.jpg"
          alt="Samsung S9 in Lilac Purple">
        <img v-if="imageKey(deal)==='s9-plus-lilac-purple'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-purple-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-582.jpg 582w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-765.jpg 765w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-purple-back-360.jpg"
          alt="Samsung S9 Plus in Coral Blue">
        <img v-if="imageKey(deal)==='s9-coral-blue'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-blue-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-blue-back-596.jpg 596w,
                ~/assets/images/s9/galaxy-s9-blue-back-797.jpg 797w,
                ~/assets/images/s9/galaxy-s9-blue-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-blue-back-360.jpg"
          alt="Samsung S9 in Coral Blue">
        <img v-if="imageKey(deal)==='s9-plus-coral-blue'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-blue-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-594.jpg 594w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-786.jpg 786w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-blue-back-360.jpg"
          alt="Samsung S9 Plus in Coral Blue">
        <img v-if="imageKey(deal)==='x-silver'" class="natural-image iphonex-deal-image-shift" src="~/assets/images/iphonex/iphone-x-silver-full.jpg"
          alt="iPhone X in Silver">
        <img v-if="imageKey(deal)==='x-space-grey'" class="natural-image iphonex-deal-image-shift" src="~/assets/images/iphonex/iphone-x-gray-full.jpg"
          alt="iPhone X in Space Grey">
      </div>
      <div class="sm:w-1/2 px-4">
        <p class="w-full sm:w-1/2 py-4">{{deal.Telcos_device_description}}</p>
        <h3 class="pb-4">Key features</h3>
        <ul>
          <li>Network: {{deal.Telcos_network}}</li>
          <li>Data: {{deal.Telcos_inc_data/1000}} GB ({{deal.Telcos_device_features_json.max_data_standard}})</li>
          <li>Storage: {{deal.Telcos_storage_size}}</li>
          <li>Colour: {{deal.Telcos_device_features_json.colour}}</li>
          <li>Camera: {{deal.Telcos_device_features_json.megapixels}} MP</li>
        </ul>
        <h3 class="pt-4">Costs</h3>
        <p class="py-2">Upfront: {{currency(deal.Telcos_initial_cost)}}</p>
        <p class="pb-2">Monthly: {{currency(deal.Telcos_month_cost)}} for {{deal.Telcos_term}} months</p>
        <p class="pb-2">
          <b class="underline">Contract Total (inc VAT): {{currency(deal.Telcos_deal_cost_json.tco_inc_vat)}}</b>
        </p>
      </div>
    </div>
    <div class="flex justify-center my-8">
      <a class="btn py-4 px-6" target="_blank" :href=buyUrl(deal)>BUY WITH {{deal.merchant_name.toUpperCase()}}</a>
    </div>
    <div class="flex justify-center my-8">
      <nuxt-link class="btn-secondary py-2 px-4" :to="backUrl(deal)">&lt; Back to deals</nuxt-link>
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
const { mapGetters } = createNamespacedHelpers("dealStore");

export default {
    computed: {
        ...mapGetters([
            "deal",
            "imageKey",
            "backUrl",
            "buyUrl"
        ])
    },
    methods: {
        currency: value => `£${value.toFixed(2).toString()}`
    },
    async fetch({ store, params }) {
        const { dispatch } = store;
        const { id } = params;
        return dispatch("dealStore/initDealPageAction", { id });
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