<template>
  <div>
    <header>
      <div>
        <div>
          <h1 class="text-center py-4 px-4">Samsung S9/S9+ Contracts</h1>
          <h2 class="text-center font-light text-lg px-4 mx-4 mb-8">Keeping it simple, we only show you contracts for brand new phones with Unlimited Texts and Minutes and at least
            2GB of data, ordered by Total Cost of Ownership</h2>
        </div>
      </div>
    </header>
    <main>

      <form class="flex flex-col sm:flex-row mx-4">
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" for="model">
            Model
          </label>
          <div class="relative">
            <select @change="modelFilterChanged" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
              id="model">
              <option :value="s.coded" :selected="modelFilter===s.coded" v-for="s in availableModels" v-bind:key="s.coded">{{s.display}}</option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" for="colour">
            Colour
          </label>
          <div class="relative">
            <select @change="colourFilterChanged" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
              id="colour">
              <option :value="s.coded" :selected="colourFilter===s.coded" v-for="s in availableColours" v-bind:key="s.coded">{{s.display}}</option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" for="network">
            Network
          </label>
          <div class="relative">
            <select @change="networksFilterChanged" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
              id="network">
              <option :value="network" :selected="networkFilter===network" v-for="network in availableNetworks" v-bind:key="network">{{getNetworkDisplayName(network)}}</option>
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
import { createNamespacedHelpers } from "vuex";
import { buildGetQuery } from "../../../plugins/api";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("s9Store");

export default {
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
            "getNetworkDisplayName"
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
