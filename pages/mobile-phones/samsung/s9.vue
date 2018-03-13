<template>
  <div>
    <header>
      <div>
        <div>
          <h2>Samsung S9/S9+ Contracts</h2>
          <p>Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total
            Cost of Ownership</p>
        </div>
      </div>
      <div>
        <div>
          <img sizes="30vw" srcset="
                ~/assets/images/galaxy-s9-black-back-360.jpg 360w,
                ~/assets/images/galaxy-s9-black-back-480.jpg 480w,
                ~/assets/images/galaxy-s9-black-back-684.jpg 684w,
                ~/assets/images/galaxy-s9-black-back-763.jpg 763w,
                ~/assets/images/galaxy-s9-black-back-900.jpg 900w" src="~/assets/images/galaxy-s9-black-back-360.jpg" alt="Samsung S9 in Midnight Black">
        </div>
        <div>
          <img sizes="30vw" srcset="
                ~/assets/images/galaxy-s9-purple-back-360.jpg 360w,
                ~/assets/images/galaxy-s9-purple-back-581.jpg 581w,
                ~/assets/images/galaxy-s9-purple-back-785.jpg 785w,
                ~/assets/images/galaxy-s9-purple-back-900.jpg 900w" src="~/assets/images/galaxy-s9-purple-back-360.jpg"
            alt="Samsung S9 in Lilac Purple">
        </div>
        <div>
          <img sizes="30vw" srcset="
                ~/assets/images/galaxy-s9-blue-back-360.jpg 360w,
                ~/assets/images/galaxy-s9-blue-back-596.jpg 596w,
                ~/assets/images/galaxy-s9-blue-back-797.jpg 797w,
                ~/assets/images/galaxy-s9-blue-back-900.jpg 900w" src="~/assets/images/galaxy-s9-blue-back-360.jpg" alt="Samsung S9 in Coral Blue">
        </div>
      </div>
    </header>
    <main>
      <div>
        <form>
          <p>Network:</p>
          <select name="" id="" @change="networksFilterChanged">
            <option :value="network" v-for="network in availableNetworks" v-bind:key="network">{{getNetworkDisplayName(network)}}</option>
          </select>
          <p></p>
          <p>Model:</p>
          <select name="" id="" @change="modelFilterChanged">
            <option :value="model.coded" v-for="model in availableModels" v-bind:key="model.coded">{{model.display}}</option>
          </select>
          <p></p>
          <p>Colour:</p>
          <select @change="colourFilterChanged">
            <option :value="colour.coded" v-for="colour in availableColours" v-bind:key="colour.coded">{{colour.display}}</option>
          </select>
        </form>
      </div>
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
            "dealRows"
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
        getMonthlyPricePencePart: deal => deal.Telcos_month_cost.toFixed(2).toString().split(".")[1]
    },
    async fetch({ store }) {
        const { dispatch } = store;
        return dispatch("s9Store/initDealsPageAction");
    }
};
</script>
