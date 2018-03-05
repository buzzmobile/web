<template>
  <main>
    <section class="bm-product-type">
      <div class="container">
        <div class="bm-pt-box">
          <div class="row">
            <div class="col-xs-12 text-center">
              <h1>Samsung S9/S9+ Contracts</h1>
              <p>Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered
                by Total Cost of Ownership</p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4">
              <img class="img-responsive" sizes="30vw" srcset="
~/assets/images/galaxy-s9-black-back-360.jpg 360w,
~/assets/images/galaxy-s9-black-back-480.jpg 480w,
~/assets/images/galaxy-s9-black-back-684.jpg 684w,
~/assets/images/galaxy-s9-black-back-763.jpg 763w,
~/assets/images/galaxy-s9-black-back-900.jpg 900w" src="~/assets/images/galaxy-s9-black-back-360.jpg" alt="">
            </div>
            <div class="col-xs-4">
              <img class="img-responsive" sizes="30vw" srcset="
~/assets/images/galaxy-s9-purple-back-360.jpg 360w,
~/assets/images/galaxy-s9-purple-back-581.jpg 581w,
~/assets/images/galaxy-s9-purple-back-785.jpg 785w,
~/assets/images/galaxy-s9-purple-back-900.jpg 900w" src="~/assets/images/galaxy-s9-purple-back-360.jpg" alt="">
            </div>
            <div class="col-xs-4">
              <img class="img-responsive" sizes="30vw" srcset="
~/assets/images/galaxy-s9-blue-back-360.jpg 360w,
~/assets/images/galaxy-s9-blue-back-596.jpg 596w,
~/assets/images/galaxy-s9-blue-back-797.jpg 797w,
~/assets/images/galaxy-s9-blue-back-900.jpg 900w" src="~/assets/images/galaxy-s9-blue-back-360.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bm-product-selector">
      <div class="container">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
            <a href="#deals" aria-controls="deals" role="tab" data-toggle="tab">Deals</a>
          </li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="deals">
            <div class="row">
              <div class="col-xs-12 col-sm-3">
                <div class="bm-p-s-filter">
                  <form>
                    <p>Choose network:</p>
                    <select name="" id="" @change="networksFilterChanged">
                      <option :value="network" v-for="network in availableNetworks" v-bind:key="network">{{getNetworkDisplayName(network, availableNetworksDisplay)}}</option>
                    </select>
                  </form>
                </div>
              </div>
              <div class="col-xs-12 col-sm-9">
                <div class="row" v-for="dRow in dealRows" v-bind:key="dRow.aw_deep_link">
                  <div class="col-xs-12 col-sm-6 col-md-4" v-for="dCol in dRow" v-bind:key="dCol.aw_deep_link">
                    <div class="bm-pl-box bm-pl-box-single">
                      <div class="row">
                        <div class="col-xs-12">
                          <h3 class="bm-pl-b-title">{{dCol.Telcos_device_full_name}}</h3>
                        </div>
                      </div>
                    </div>
                    <div class="bm-pl-b-content">
                      <div class="row">
                        <div class="col-xs-7">
                          <p>Handset £{{dCol.Telcos_initial_cost}}</p>
                          <p>£
                            <span class="bm-pl-b-c-price">{{getMonthlyPricePoundsPart(dCol)}}</span>.{{getMonthlyPricePencePart(dCol)}}
                            <span class="bm-pl-b-c-per">per month / {{dCol.Telcos_term}} months</span>
                          </p>
                          <ul class="list-unstyled">
                            <li>Network: {{dCol.Telcos_network}}</li>
                            <li>Data: {{dCol.Telcos_inc_data/1000}} GB</li>
                            <li>Storage: {{dCol.Telcos_storage_size}}</li>
                            <li>Colour: {{dCol.Telcos_device_features_json.colour}}</li>
                            <li>With: {{dCol.merchant_name}}</li>
                          </ul>
                          <nuxt-link class="btn btn-secondary btn-block" :to="{ name: 'deal-id', params: { id: dCol.id }}">View Offer</nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>




<script>
import { mapState, mapActions } from "vuex";
import { buildGetQuery } from "../../../plugins/api";

export default {
    computed: {
        ...mapState({
            dealRows: state => state.dealRows,
            selectedNetworkFilter: state => state.selectedNetworkFilter,
            availableNetworks: state => state.availableNetworks,
            availableNetworksDisplay: state => state.availableNetworksDisplay
        })
    },
    methods: {
        ...mapActions({
            networksFilterChanged: "networksFilterChangedAction"
        }),
        getNetworkDisplayName(network, availableNetworksDisplay) {
            const hasDisplay = availableNetworksDisplay.find(
                a => a.coded === network
            );
            return hasDisplay ? hasDisplay.display : network;
        },
        getMonthlyPricePoundsPart(deal) {
            return deal.Telcos_month_cost.toString().split(".")[0];
        },
        getMonthlyPricePencePart(deal) {
            return deal.Telcos_month_cost.toFixed(2).toString().split(".")[1];
        }
    },
    async fetch({ store }) {
        const os = "Android";
        const productVersionName = "S9Any";
        const query = buildGetQuery(os, productVersionName);
        const { dispatch } = store;
        return dispatch("initDealsPageAction", { query, dealsPerRow: 3, os, productVersionName });
    }
};
</script>
