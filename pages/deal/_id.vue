<template>
  <section class="bm-deal-info">
    <div class="container">
      <div class="bm-di-box">
        <div class="row">
          <div class="col-xs-12">
            <h1>{{deal.Telcos_device_full_name}}</h1>
            <h4>{{deal.Telcos_device_description}}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-2">
            <div>
              <img class="bm-di-d-network-logo" :src=deal.Telcos_network_details_json.logo_url alt="network logo" />
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="bm-di-b-features">
              <h3>Key features</h3>
              <ul class="list-unstyled">
                <li>Data: {{deal.Telcos_inc_data/1000}} GB ({{deal.Telcos_device_features_json.max_data_standard}})</li>
                <li>Storage: {{deal.Telcos_storage_size}}</li>
                <li>Colour: {{deal.Telcos_device_features_json.colour}}</li>
                <li>Camera: {{deal.Telcos_device_features_json.megapixels}} MP</li>
              </ul>

            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="bm-di-b-costs">
              <h3>Costs</h3>
              <p>Upfront: £{{deal.Telcos_initial_cost}}</p>
              <p>Monthly: £{{getMonthlyPricePoundsPart(deal)}}.{{getMonthlyPricePencePart(deal)}}</p>
              <p>
                <b>Total (inc VAT): £{{deal.Telcos_deal_cost_json.tco_inc_vat}}</b>
                <br />
                <small>Over a {{deal.Telcos_term}} month contract</small>
              </p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-2">
            <div class="bm-di-b-button">
              <img class="img-responsive" :src=getExternalImage(deal) alt="" />
              <p>
                <small>Continue with {{deal.merchant_name}}</small>
              </p>
              <a class="btn btn-primary btn-block" :href=deal.aw_deep_link target="_blank">Go to deal</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState({
            deal: state => state.selectedDeal,
        })
    },
    methods: {
        ...mapActions({
            // networksFilterChanged: "networksFilterChangedAction"
        }),
        getMonthlyPricePoundsPart(deal) {
            return deal.Telcos_month_cost.toString().split(".")[0];
        },
        getMonthlyPricePencePart(deal) {
            return deal.Telcos_month_cost.toFixed(2).toString().split(".")[1];
        },
        getExternalImage(deal) {
            if (deal.Telcos_device_features_json.colour === "Space Grey") {
                return "https://images.apple.com/v/iphone-x/e/images/specs/finish_iphone-x_dark_gray_large.jpg";
            }
            if (deal.Telcos_device_features_json.colour === "Silver") {
                return "https://images.apple.com/v/iphone-x/e/images/specs/finish_iphone-x_silver_large.jpg";
            }
            return "";
        }
    },
    async fetch({ store, params }) {
        const query = `
            {
              getDealById(
                id:"${params.id}"
              ) 
              {
                aw_deep_link
                merchant_name
                Telcos_device_full_name
                Telcos_device_description
                Telcos_initial_cost
                Telcos_month_cost
                Telcos_term
                Telcos_storage_size
                Telcos_network
                product_name
                Telcos_inc_data
                Telcos_device_features_json {
                  max_data_standard
                  colour
                  megapixels
                }
                Telcos_network_details_json {
                  logo_url
                }
                Telcos_deal_cost_json {
                  tco_inc_vat
                }
              }
            }
            `;
        const { dispatch } = store;
        return dispatch("initDealPageAction", { query });
    }
};
</script>