<template>
    <div class="w-full sm:w-46pc overflow-hidden shadow mb-4 p-4">
      <div class="max-w-md w-full lg:flex">
        <slot></slot>
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
    </div>
</template>

<script>
export default {
    props: {
        deal: Object
    },
    methods: {
        currency: value => `£${value.toFixed(2).toString()}`,
    }
};
</script>
