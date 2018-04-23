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
        <AppDeals else v-for="deal in deals" v-bind:key="deal.id" :deal=deal>
          <div :class="setBgImageUrl(deal)" class="flex-none h-48 sm:h-64 lg:h-auto lg:w-48 bg-cover lg:bg-s9 text-center overflow-hidden"
            :title=deal.Telcos_device_full_name>
          </div>
        </AppDeals>
      </div>
    </main>
  </div>
</template>


<script>
import AppDropDown from "~/components/AppDropDown";
import AppMobileHeading from "~/components/AppMobileHeading";
import AppMobileSubHeading from "~/components/AppMobileSubHeading";
import AppDeals from "~/components/AppDeals";
import { createNamespacedHelpers } from "vuex";
import { buildGetQuery } from "~/plugins/api";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("s9Store");

export default {
    components: {
        AppMobileHeading,
        AppMobileSubHeading,
        AppDropDown,
        AppDeals,
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
