<template>
  <section>
    <div>
      <div>
        <div>
          <div>
            <h1>{{deal.Telcos_device_full_name}}</h1>
            <h4>{{deal.Telcos_device_description}}</h4>
          </div>
        </div>
        <div>
          <div>
            <div>
              <img :src=deal.Telcos_network_details_json.logo_url alt="network logo" />
            </div>
          </div>
          <div>
            <div>
              <h3>Key features</h3>
              <ul>
                <li>Data: {{deal.Telcos_inc_data/1000}} GB ({{deal.Telcos_device_features_json.max_data_standard}})</li>
                <li>Storage: {{deal.Telcos_storage_size}}</li>
                <li>Colour: {{deal.Telcos_device_features_json.colour}}</li>
                <li>Camera: {{deal.Telcos_device_features_json.megapixels}} MP</li>
              </ul>

            </div>
          </div>
          <div>
            <div>
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
          <div>
            <div>
              <img :src=getExternalImage(deal) alt="" />
              <p>
                <small>Continue with {{deal.merchant_name}}</small>
              </p>
              <a :href=deal.aw_deep_link target="_blank">Go to deal</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const ns = "dealStore";
const { mapGetters } = createNamespacedHelpers(ns);

export default {
    computed: {
        ...mapGetters([
            "deal"
        ])
    },
    methods: {
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
        const { dispatch } = store;
        const { id } = params;
        return dispatch("dealStore/initDealPageAction", { id });
    }
};
</script>