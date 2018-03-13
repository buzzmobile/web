<template>
  <div>
    <header>
      <div>
        <div>
          <h2 class="text-center py-4">iPhone X Contracts</h2>
          <p class="text-center px-4">Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total
            Cost of Ownership</p>
        </div>
        <div class="flex shadow py-4">
          <img class="w-1/2" sizes="50vw" srcset="
              ~/assets/images/iphone-x-silver-600.jpg 600w,
              ~/assets/images/iphone-x-silver-1014.jpg 1014w,
              ~/assets/images/iphone-x-silver-1278.jpg 1278w" src="~/assets/images/iphone-x-silver-600.jpg" alt="iPhone X in Silver">
          <img class="w-1/2" sizes="50vw" srcset="
              ~/assets/images/iphone-x-gray-600.jpg 600w,
              ~/assets/images/iphone-x-gray-966.jpg 966w,
              ~/assets/images/iphone-x-gray-1278.jpg 1278w" src="~/assets/images/iphone-x-gray-600.jpg" alt="iPhone X in Space Grey">
        </div>
      </div>
    </header>
    <main>
      <form class="flex flex-col sm:flex-row mx-4">
        <div class="sm:w-1/3 p-4">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="storage">
            Storage
          </label>
          <div class="relative">
            <select @change="storageFilterChanged" class="block appearance-none w-full border border-brand-grey py-3 px-4 pr-8 rounded"
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
      <div class="ml-8 my-4">
        <div>
          <div v-for="dRow in dealRows" v-bind:key="dRow.aw_deep_link">
            <div v-for="dCol in dRow" v-bind:key="dCol.aw_deep_link">
              <div>
                <h3>{{dCol.Telcos_device_full_name}}</h3>
              </div>
              <div>
                <div>
                  <p>Handset £{{dCol.Telcos_initial_cost}}</p>
                  <p>£
                    <span>{{getMonthlyPricePoundsPart(dCol)}}</span>.{{getMonthlyPricePencePart(dCol)}}
                    <span>per month / {{dCol.Telcos_term}} months</span>
                  </p>
                  <ul>
                    <li>Data: {{dCol.Telcos_inc_data/1000}} GB</li>
                    <li>With: {{dCol.merchant_name}}</li>
                    <li>Network: {{dCol.Telcos_network}}</li>
                    <li>Storage: {{dCol.Telcos_storage_size}}</li>
                    <li>Colour: {{dCol.Telcos_device_features_json.colour}}</li>
                  </ul>
                  <nuxt-link :to="{ name: 'deal-id', params: { id: dCol.id }}">View Offer</nuxt-link>
                </div>
              </div>
            </div>
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
            "dealRows"
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
        getMonthlyPricePoundsPart: deal => deal.Telcos_month_cost.toString().split(".")[0],
        getMonthlyPricePencePart: deal => deal.Telcos_month_cost.toFixed(2).toString().split(".")[1]
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("iPhoneXStore/initDealsPageAction");
    }
};
</script>
