<template>
    <main>
      <section class="bm-product-type">
        <div class="container">
          <div class="bm-pt-box">
            <div class="row">
              <div class="col-xs-12 text-center">
                <h1>iPhone X Contracts</h1>
                <p>Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total Cost of Ownership</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-md-offset-1 col-lg-12 col-lg-offset-2">
                <img src="~/assets/images/iphonexcolors-800x573.jpg" alt="" class="img-responsive">
              </div>
            </div>      
          </div>
        </div>
    </section>
    <section class="bm-product-selector">
      <div class="container">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#deals" aria-controls="deals" role="tab" data-toggle="tab">Deals</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="deals">
            <div class="row">
              <div class="col-xs-12 col-sm-3">
                <div class="bm-p-s-filter">
                  <form>
                    <p>Choose network:</p>
                    <div class="radio" v-for="network in availableNetworks" v-bind:key="network" >
                      <label>
                        <input type="radio" name="selected-network" :value=network :checked="selectedNetworkFilter===network" @change="networksFilterChanged">{{getNetworkDisplayName(network, availableNetworksDisplay)}}
                      </label>
                    </div>
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
                            <p>£<span class="bm-pl-b-c-price">{{dCol.Telcos_month_cost.toString().split(".")[0]}}</span>.{{dCol.Telcos_month_cost.toString().split(".")[1]}} <span class="bm-pl-b-c-per">per month / {{dCol.Telcos_term}} months</span></p>
                            <ul class="list-unstyled">
                              <li>Network: {{dCol.Telcos_network}}</li>
                              <li>Data: {{dCol.Telcos_inc_data/1000}} GB</li>
                              <li>Storage: {{dCol.Telcos_storage_size}}</li>
                              <li>Colour: {{dCol.Telcos_device_features_json.colour}}</li>
                              <li>With: {{dCol.merchant_name}}</li>
                            </ul>
                            <a class="btn btn-secondary btn-block">View offer</a>
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
        }
    },
    async fetch({ store }) {
        const query = `
            {
              allDealsFiltered(
                merchantCategory:MobilePhone, 
                operatingSystem: iOS, 
                contractType: Contract, 
                productVersionName:iPhoneX, 
                numberOfTexts: Unlimited,
                talkMinutes: Unlimited,
                network: Any,
                sortBy:TCO_ASC
              ) 
              {
                aw_deep_link
                merchant_name
                Telcos_device_full_name
                Telcos_initial_cost
                Telcos_month_cost
                Telcos_term
                Telcos_storage_size
                Telcos_network
                product_name
                Telcos_inc_data
                Telcos_device_features_json {
                  colour
                }
              }
            }
            `;
        const { dispatch } = store;
        return dispatch("initDealsPageAction", { query, dealsPerRow: 3 });
    }
};
</script>
