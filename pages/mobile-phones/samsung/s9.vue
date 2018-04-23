<template>
  <div>
    <header>
        <AppMobileHeading phone="Samsung S9/S9+"></AppMobileHeading>
        <AppMobileSubHeading></AppMobileSubHeading>
    </header>
    <main>

      <form class="flex flex-col sm:flex-row mx-4">
        <AppDropDown label="Model" :dropDownItems="availableModels" :currentValue="modelFilter" v-on:change="modelFilterChanged"></AppDropDown>
        <AppDropDown label="Colour" :dropDownItems="availableColours" :currentValue="colourFilter" v-on:change="colourFilterChanged"></AppDropDown>
        <AppDropDown label="Network" :dropDownItems="availableNetworks" :currentValue="networkFilter" v-on:change="networksFilterChanged"></AppDropDown>
      </form>
      <div class="flex flex-wrap justify-around mx-4">
        <p v-if="deals.length < 1" class="font-bold text-center p-4">We can't find any deals. Please try a different set of options.</p>
        <div v-else class="w-full sm:w-46pc overflow-hidden shadow mb-4 p-4" v-for="deal in deals" v-bind:key="deal.id">
          <div class="max-w-md w-full lg:flex">
            <div :class="setBgImageUrl(deal)" class="flex-none h-48 sm:h-64 lg:h-auto lg:w-48 bg-cover lg:bg-s9 text-center overflow-hidden"
              :title=deal.Telcos_device_full_name>
            </div>
            <div class="p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <div class="inline-block font-bold text-xl text-center px-2 py-1 mb-4">{{deal.Telcos_device_full_name}}</div>
                <div>
                  <div>
                    <p class="deal-card--price px-2 py-1">{{currency(deal.Telcos_initial_cost)}} upfront</p>
                    <p class="deal-card--price px-2 py-1">{{currency(deal.Telcos_month_cost)}} for {{deal.Telcos_term}} months</p>
                    <p class="font-semibold px-2 py-1 mt-4">Data: {{deal.Telcos_inc_data/1000}} GB with {{deal.Telcos_network}}</p>
                    <p class="font-semibold px-2 py-1">Storage: {{deal.Telcos_storage_size}}</p>
                    <p class="font-semibold px-2 py-1">Colour: {{deal.Telcos_device_features_json.colour}}</p>
                  </div>
                </div>
              </div>
              <nuxt-link class="btn hover:bg-pink-light w-full px-4 py-1" :to="{ name: 'deal-id', params: { id: deal.id }}">View Offer</nuxt-link>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import AppDropDown from "~/components/AppDropDown";
import AppMobileHeading from "~/components/AppMobileHeading";
import AppMobileSubHeading from "~/components/AppMobileSubHeading";
import { createNamespacedHelpers } from "vuex";
import { buildGetQuery } from "~/plugins/api";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("s9Store");

export default {
    components: {
        AppMobileHeading,
        AppMobileSubHeading,
        AppDropDown,
    },
    computed: {
        ...mapState([
            "deals",
            "modelFilter",
            "colourFilter",
            "networkFilter"
        ]),
        ...mapGetters([
            "availableColours",
            "availableNetworks",
            "availableModels",
        ])
    },
    methods: {
        ...mapActions({
            networksFilterChanged: "networksFilterChangedAction",
            modelFilterChanged: "modelFilterChangedAction",
            colourFilterChanged: "colourFilterChangedAction"
        }),
        currency: value => `£${value.toFixed(2).toString()}`,
        setBgImageUrl: deal => `bg-image-${deal.Telcos_device_product_version_json.product_version_name.toLowerCase().replace(" ", "-")}-${deal.Telcos_device_features_json.colour.toLowerCase().replace(" ", "-")}`
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("s9Store/initDealsPageAction");
    },
    head () {
        return {
            title: "Samsung S9/+ Contracts - Mopho",
            meta: [
                { hid: "description", name: "description", content: "Samsung S9/+ Mobile Contracts" }
            ]
        };
    }
};
</script>
