<template>
    <main>
      <section class="bm-product-type">
        <div class="container">
          <div class="bm-pt-box">
            <div class="row">
              <div class="col-xs-12">
                <h1>iPhone X Contracts</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-md-8">
                <p>Keeping it simple, we only show you contracts for brand new phones with Unlimted Texts and Minutes ordered by Total Cost of Ownership</p>
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
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="Any" :checked="selectedNetworkFilter==='Any'" @change="networksFilterChanged">Any
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="BT" :checked="selectedNetworkFilter==='BT'" @change="networksFilterChanged">BT
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="EE" :checked="selectedNetworkFilter==='EE'" @change="networksFilterChanged">EE
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="Giffgaff" :checked="selectedNetworkFilter==='Giffgaff'" @change="networksFilterChanged">Giffgaff
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="iD" :checked="selectedNetworkFilter==='iD'" @change="networksFilterChanged">iD
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="O2" :checked="selectedNetworkFilter==='O2'" @change="networksFilterChanged">O2
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="Three" :checked="selectedNetworkFilter==='Three'" @change="networksFilterChanged">Three
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="VirginMobile" :checked="selectedNetworkFilter==='Virgin'" @change="networksFilterChanged">Virgin
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="selected-network" value="Vodafone" :checked="selectedNetworkFilter==='Vodafone'" @change="networksFilterChanged">Vodafone
                      </label>
                    </div>
                    <p>Select your perfect deal:</p>
                    <div class="form-group">
                      <label class="sr-only" for="incData">Included data</label>
                      <select class="form-control" id="incData">
                        <option>Any data</option>
                        <option>200-500 minutes</option>
                        <option>500-1000 minutes</option>
                        <option>1000-2000 minutes</option>
                        <option>Unlimited minutes</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="sr-only" for="monthCost">Monthly cost</label>
                      <select class="form-control" id="monthCost">
                        <option>Any monthly cost</option>
                        <option>200-500 minutes</option>
                        <option>500-1000 minutes</option>
                        <option>1000-2000 minutes</option>
                        <option>Unlimited minutes</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="sr-only" for="contractLength">Contract length</label>
                      <select class="form-control" id="contractLength">
                        <option>Any contract length</option>
                        <option>200-500 minutes</option>
                        <option>500-1000 minutes</option>
                        <option>1000-2000 minutes</option>
                        <option>Unlimited minutes</option>
                      </select>
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
                          <img class="bm-pl-b-c-img" src="" alt="phone">
                          <div class="col-xs-7">
                            <p>Handset £{{dCol.Telcos_initial_cost}}</p>
                            <p>£<span class="bm-pl-b-c-price">{{dCol.Telcos_month_cost.toString().split(".")[0]}}</span>.{{dCol.Telcos_month_cost.toString().split(".")[1]}} <span class="bm-pl-b-c-per">per month / {{dCol.Telcos_term}} months</span></p>
                            <ul class="list-unstyled">
                              <li>Network: {{dCol.Telcos_network}}</li>
                              <li>Data: {{dCol.Telcos_inc_data/1000}} GB</li>
                              <li>Storage: {{dCol.Telcos_storage_size}}</li>
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
            selectedNetworkFilter: state => state.selectedNetworkFilter
        })
    },
    methods: {
        ...mapActions({
            "networksFilterChanged": "networksFilterChangedAction"
        })
    },
    async fetch ({ store }) {
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
            Telcos_device_full_name
            Telcos_initial_cost
            Telcos_month_cost
            Telcos_term
            Telcos_storage_size
            Telcos_network
            Telcos_network_details_json {
              name,
              logo_url
            }
            product_name
            Telcos_inc_data
          }
        }
        `;
        const { dispatch } = store;
        return dispatch("initDealsPageAction", { query, dealsPerRow: 3 });
    }
};
</script>
