<template>
  <div>
    <header>
      <div>
        <div>
          <h2 class="text-center py-4">Samsung S9/S9+ Contracts</h2>
          <p class="text-center px-4">Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total
            Cost of Ownership</p>
        </div>
      </div>
      <div class="flex shadow py-4 mx-8">
        <img class="w-1/3" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-black-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-black-back-480.jpg 480w,
                ~/assets/images/s9/galaxy-s9-black-back-684.jpg 684w,
                ~/assets/images/s9/galaxy-s9-black-back-763.jpg 763w,
                ~/assets/images/s9/galaxy-s9-black-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-black-back-360.jpg" alt="Samsung S9 in Midnight Black">
        <img class="w-1/3" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-purple-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-purple-back-581.jpg 581w,
                ~/assets/images/s9/galaxy-s9-purple-back-785.jpg 785w,
                ~/assets/images/s9/galaxy-s9-purple-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-purple-back-360.jpg"
          alt="Samsung S9 in Lilac Purple">
        <img class="w-1/3" sizes="30vw" srcset="
                ~/assets/images/s9/galaxy-s9-blue-back-360.jpg 360w,
                ~/assets/images/s9/galaxy-s9-blue-back-596.jpg 596w,
                ~/assets/images/s9/galaxy-s9-blue-back-797.jpg 797w,
                ~/assets/images/s9/galaxy-s9-blue-back-900.jpg 900w" src="~/assets/images/s9/galaxy-s9-blue-back-360.jpg" alt="Samsung S9 in Coral Blue">
      </div>
    </header>
    <main>

      <form class="flex flex-col sm:flex-row mx-4">
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="model">
            Model
          </label>
          <div class="relative">
            <select @change="modelFilterChanged" class="block appearance-none w-full border border-brand-grey py-3 px-4 pr-8 rounded"
              id="model">
              <option :value="s.coded" v-for="s in availableModels" v-bind:key="s.coded">{{s.display}}</option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="colour">
            Colour
          </label>
          <div class="relative">
            <select @change="colourFilterChanged" class="block appearance-none w-full border border-brand-grey py-3 px-4 pr-8 rounded"
              id="colour">
              <option :value="s.coded" v-for="s in availableColours" v-bind:key="s.coded">{{s.display}}</option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="network">
            Network
          </label>
          <div class="relative">
            <select @change="networksFilterChanged" class="block appearance-none w-full border border-brand-grey py-3 px-4 pr-8 rounded"
              id="network">
              <option :value="network" v-for="network in availableNetworks" v-bind:key="network">{{getNetworkDisplayName(network)}}</option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

      </form>
      <div class="flex flex-wrap justify-around mx-4">
        <div class="w-full sm:w-46pc rounded overflow-hidden shadow-lg p-4" v-for="deal in deals" v-bind:key="deal.aw_deep_link">
          <div class="max-w-md w-full lg:flex">
            <div :class="setBgImageUrl(deal)" class="flex-none h-48 lg:h-auto lg:w-48 bg-cover lg:bg-s9 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              :title=deal.Telcos_device_full_name>
            </div>
            <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <div class="inline-block bg-brand-grey rounded-full font-bold text-xl text-center px-2 py-1 mb-4">{{deal.Telcos_device_full_name}}</div>
                <div>
                  <div>
                    <span class="deal-card--price px-2 py-1">£{{deal.Telcos_initial_cost}} upfront</span>
                    <span class="deal-card--price px-2 py-1">{{deal.Telcos_term}} months at £{{getMonthlyPricePoundsPart(deal)}}.{{getMonthlyPricePencePart(deal)}}</span>
                    <p></p>
                    <span class="deal-card--feature px-2 py-1 mt-4">Data: {{deal.Telcos_inc_data/1000}} GB with {{deal.Telcos_network}}</span>
                    <span class="deal-card--feature px-2 py-1 ">Storage: {{deal.Telcos_storage_size}}</span>
                    <span class="deal-card--feature px-2 py-1 ">Colour: {{deal.Telcos_device_features_json.colour}}</span>
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
import { createNamespacedHelpers } from "vuex";
import { buildGetQuery } from "../../../plugins/api";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("s9Store");

export default {
    computed: {
        ...mapState([
            "deals"
        ]),
        ...mapGetters([
            "availableColours",
            "availableNetworks",
            "availableModels",
            "getNetworkDisplayName"
        ])
    },
    methods: {
        ...mapActions({
            networksFilterChanged: "networksFilterChangedAction",
            modelFilterChanged: "modelFilterChangedAction",
            colourFilterChanged: "colourFilterChangedAction"
        }),
        getMonthlyPricePoundsPart: deal => deal.Telcos_month_cost.toString().split(".")[0],
        getMonthlyPricePencePart: deal => deal.Telcos_month_cost.toFixed(2).toString().split(".")[1],
        setBgImageUrl: deal => `bg-${deal.Telcos_device_product_version_json.product_version_name.toLowerCase().replace(" ", "-")}-${deal.Telcos_device_features_json.colour.toLowerCase().replace(" ", "-")}`
        
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("s9Store/initDealsPageAction");
    }
};
</script>
