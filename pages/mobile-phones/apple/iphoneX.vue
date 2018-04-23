<template>
  <div>
    <header>
      <AppMobileHeading phone="iPhone X"></AppMobileHeading>
      <AppMobileSubHeading>></AppMobileSubHeading>
    </header>
    <main>
      <form class="flex flex-col sm:flex-row mx-4 mb-8">
        <AppDropDown label="Storage" :dropDownItems="availableStorages" :currentValue="storageFilter" v-on:change="storageFilterChanged"></AppDropDown>
        <AppDropDown label="Colour" :dropDownItems="availableColours" :currentValue="colourFilter" v-on:change="colourFilterChanged"></AppDropDown>
        <AppDropDown label="Network" :dropDownItems="availableNetworks" :currentValue="networkFilter" v-on:change="networksFilterChanged"></AppDropDown>
      </form>
      <div class="flex flex-wrap justify-around mx-4">
        <p v-if="deals.length < 1" class="font-bold text-center p-4">We can't find any deals. Please try a different set of options.</p>
        <AppDeals else v-for="deal in deals" v-bind:key="deal.id" :deal=deal>
          <div :class="setBgImageUrl(deal)" class="flex-none h-48 lg:h-auto lg:w-48 bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
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
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("iPhoneXStore");

export default {
    components: {
        AppMobileHeading,
        AppMobileSubHeading,
        AppDropDown,
        AppDeals
    },
    computed: {
        ...mapState([
            "deals",
            "storageFilter",
            "colourFilter",
            "networkFilter"
        ]),
        ...mapGetters([
            "availableColours",
            "availableNetworks",
            "availableStorages",
        ])
    },
    methods: {
        ...mapActions({
            networksFilterChanged: "networksFilterChangedAction",
            storageFilterChanged: "storageFilterChangedAction",
            colourFilterChanged: "colourFilterChangedAction"
        }),
        setBgImageUrl: deal => "bg-image-iphone-x-" + deal.Telcos_device_features_json.colour.toLowerCase().replace(" ", "-")
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("iPhoneXStore/initDealsPageAction");
    },
    head () {
        return {
            title: "iPhone X Contracts - Mopho",
            meta: [
                { hid: "description", name: "description", content: "iPhone X Mobile Contracts" }
            ]
        };
    }
};
</script>
