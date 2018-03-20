<template>
  <div>
    <header>
      <div>
        <div>
          <h2 class="text-center py-4">iPhone X Contracts</h2>
          <p class="text-center px-4 mx-4">Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total
            Cost of Ownership</p>
        </div>
        <div class="flex py-4 mx-8 max-h-250">
          <img class="w-1/2" sizes="50vw" srcset="
              ~/assets/images/iphonex/iphone-x-silver-600.jpg 600w,
              ~/assets/images/iphonex/iphone-x-silver-1014.jpg 1014w,
              ~/assets/images/iphonex/iphone-x-silver-1278.jpg 1278w" src="~/assets/images/iphonex/iphone-x-silver-600.jpg"
            alt="iPhone X in Silver">
          <img class="w-1/2" sizes="50vw" srcset="
              ~/assets/images/iphonex/iphone-x-gray-600.jpg 600w,
              ~/assets/images/iphonex/iphone-x-gray-966.jpg 966w,
              ~/assets/images/iphonex/iphone-x-gray-1278.jpg 1278w" src="~/assets/images/iphonex/iphone-x-gray-600.jpg"
            alt="iPhone X in Space Grey">
        </div>
      </div>
    </header>
    <main>
      <form class="flex flex-col sm:flex-row mx-4">
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" for="storage">
            Storage
          </label>
          <div class="relative">
            <select @change="storageFilterChanged" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
              id="storage">
              <option :value="s.coded" v-for="s in availableStorages" v-bind:key="s.coded">{{s.display}}</option>
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
          <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" for="network">
            Network
          </label>
          <div class="relative">
            <select @change="networksFilterChanged" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
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
        <div class="w-full sm:w-46pc overflow-hidden shadow mb-4 p-4" v-for="deal in deals" v-bind:key="deal.aw_deep_link">
          <div class="max-w-md w-full lg:flex">
            <div :class="setBgImageUrl(deal)" class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              :title=deal.Telcos_device_full_name>
            </div>
            <div class="p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <div class="inline-block font-bold text-xl text-center px-2 py-1 mb-4">{{deal.Telcos_device_full_name}}</div>
                <div>
                  <div>
                    <p class="deal-card--price px-2 py-1">{{currency(deal.Telcos_initial_cost)}} upfront</p>
                    <p class="deal-card--price px-2 py-1">{{currency(deal.Telcos_month_cost)}} for {{deal.Telcos_term}} months</p>
                    <p class="deal-card--feature px-2 py-1 mt-4">Data: {{deal.Telcos_inc_data/1000}} GB with {{deal.Telcos_network}}</p>
                    <p class="deal-card--feature px-2 py-1 ">Storage: {{deal.Telcos_storage_size}}</p>
                    <p class="deal-card--feature px-2 py-1 ">Colour: {{deal.Telcos_device_features_json.colour}}</p>
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
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("iPhoneXStore");

export default {
    computed: {
        ...mapState([
            "deals"
        ]),
        ...mapGetters([
            "availableColours",
            "availableNetworks",
            "availableStorages",
            "getNetworkDisplayName"
        ])
    },
    methods: {
        ...mapActions({
            networksFilterChanged: "networksFilterChangedAction",
            storageFilterChanged: "storageFilterChangedAction",
            colourFilterChanged: "colourFilterChangedAction"
        }),
        currency: value => `£${value.toFixed(2).toString()}`,
        setBgImageUrl: deal => "bg-iphone-x-" + deal.Telcos_device_features_json.colour.toLowerCase().replace(" ", "-")
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("iPhoneXStore/initDealsPageAction");
    },
    head () {
        return {
            title: "iPhone X Contracts - Mopho",
            meta: [
                { hid: "X", name: "iPhone X", content: "iPhone X Mobile Contracts" }
            ]
        };
    }
};
</script>
