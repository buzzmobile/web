<template>
  <section class="bm-deal-info">
    <div class="container">
      <div class="bm-di-box">
        <div class="row">
          <div class="col-xs-12">
            <h1>{{deal.Telcos_device_full_name}}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-2">
            <div class="bm-di-b-network">
              <img src="" alt="network logo" />
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="bm-di-b-features">
              <h3>Key features</h3>
              <ul class="list-unstyled">
                <li>Phone feature</li>
                <li>Phone feature</li>
                <li>Phone feature</li>
                <li>Phone feature</li>
              </ul>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="bm-di-b-costs">
              <h3>Costs</h3>
              <p>Upfront: £0.00</p>
              <p>Monthly: £36.00</p>
              <p>
                <b>Total: £864</b>
                <br />
                <small>Over 24 month contract</small>
              </p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-2">
            <div class="bm-di-b-button">
              <img src="" alt="iphone 6 plus image" />
              <a class="btn btn-primary btn-block" href="">Go to deal</a>
              <p>
                <small>Continue with AFFILIATE NAME</small>
              </p>
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
        })
    },
    async fetch({ store, params }) {
        const query = `
            {
              getDealById(
                id:"${params.id}"
              ) 
              {
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
        return dispatch("initDealPageAction", { query });
    }
};
</script>