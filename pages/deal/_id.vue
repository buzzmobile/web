<template>
  <div>
    <h2 class="text-center my-4">{{deal.Telcos_device_full_name}}</h2>

    <div class="flex flex-col sm:flex-row sm:items-center">
      <div class="sm:w-1/2">
        <img v-if="imageKey==='s9-midnight-black'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-black-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-black-back-480.jpg 480w,
                ~/assets/images/s9/galaxy-s9-black-back-684.jpg 684w,
                ~/assets/images/s9/galaxy-s9-black-back-763.jpg 763w,
                ~/assets/images/s9/galaxy-s9-black-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-black-back-360.jpg"
          alt="Samsung S9 in Midnight Black">
        <img v-if="imageKey==='s9-plus-midnight-black'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-black-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-black-back-698.jpg 698w,
                ~/assets/images/s9/galaxy-s9-plus-black-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-black-back-360.jpg"
          alt="Samsung S9 Plus in Midnight Black">
        <img v-if="imageKey==='s9-lilac-purple'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-purple-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-purple-back-581.jpg 581w,
                ~/assets/images/s9/galaxy-s9-purple-back-785.jpg 785w,
                ~/assets/images/s9/galaxy-s9-purple-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-purple-back-360.jpg"
          alt="Samsung S9 in Lilac Purple">
        <img v-if="imageKey==='s9-plus-lilac-purple'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-purple-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-582.jpg 582w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-765.jpg 765w,
                ~/assets/images/s9/galaxy-s9-plus-purple-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-purple-back-360.jpg"
          alt="Samsung S9 Plus in Coral Blue">
        <img v-if="imageKey==='s9-coral-blue'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-blue-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-blue-back-596.jpg 596w,
                ~/assets/images/s9/galaxy-s9-blue-back-797.jpg 797w,
                ~/assets/images/s9/galaxy-s9-blue-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-blue-back-360.jpg"
          alt="Samsung S9 in Coral Blue">
        <img v-if="imageKey==='s9-plus-coral-blue'" class="w-full" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-plus-blue-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-594.jpg 594w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-786.jpg 786w,
                ~/assets/images/s9/galaxy-s9-plus-blue-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-plus-blue-back-360.jpg"
          alt="Samsung S9 Plus in Coral Blue">
        <img v-if="imageKey==='x-silver'" class="natural-image iphonex-deal-image-shift" src="~/assets/images/iphonex/iphone-x-silver-full.jpg"
          alt="iPhone X in Silver">
        <img v-if="imageKey==='x-space-grey'" class="natural-image iphonex-deal-image-shift" src="~/assets/images/iphonex/iphone-x-gray-full.jpg"
          alt="iPhone X in Space Grey">
      </div>
      <div class="sm:w-1/2">
        <p class="w-full sm:w-1/2">{{deal.Telcos_device_description}}</p>
        <h3>Key features</h3>
        <ul>
          <li>Network: {{deal.Telcos_network}}</li>
          <li>Data: {{deal.Telcos_inc_data/1000}} GB ({{deal.Telcos_device_features_json.max_data_standard}})</li>
          <li>Storage: {{deal.Telcos_storage_size}}</li>
          <li>Colour: {{deal.Telcos_device_features_json.colour}}</li>
          <li>Camera: {{deal.Telcos_device_features_json.megapixels}} MP</li>
        </ul>
        <h3>Costs</h3>
        <p>Upfront: {{deal.Telcos_initial_cost}}</p>
        <p>Monthly: {{currency(deal.Telcos_month_cost)}}</p>
        <p>
          <b>Total (inc VAT): {{currency(deal.Telcos_deal_cost_json.tco_inc_vat)}}</b>
          <br />
          <small>Over a {{deal.Telcos_term}} month contract</small>
        </p>
        <p>
          <small>Continue with {{deal.merchant_name}}</small>
        </p>
        <a :href=deal.aw_deep_link target="_blank">Go to deal</a>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("dealStore");

export default {
    computed: {
        ...mapGetters([
            "deal",
            "imageKey"
        ])
    },
    methods: {
        currency: value => `£${value.toFixed(2).toString()}`
    },
    async fetch({ store, params }) {
        const { dispatch } = store;
        const { id } = params;
        return dispatch("dealStore/initDealPageAction", { id });
    }
};
</script>