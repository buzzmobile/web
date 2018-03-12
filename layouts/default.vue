<template>
  <div>
    <div class="font-sans antialiased" id="app">
      <nav class="flex items-center justify-between flex-wrap bg-grey-lighter p-4">
        <div class="flex items-center flex-no-shrink mr-6">
          <nuxt-link class="no-underline font-bold text-xl tracking-wide text-pink-brand" to="/">Mopho</nuxt-link>
        </div>
        <div class="block sm:hidden">
          <button @click="menuToggled" class="flex items-center px-3 py-2 border rounded text-pink-light border-pink-brand hover:text-pink-light hover:border-pink-light">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div class="text-sm sm:flex-grow self-end">
            <nuxt-link to="/mobile-phones/apple/iphonex" class="no-underline block text-pink-brand hover:text-pink-light mt-4 mr-4 sm:inline-block sm:mt-0">
              iPhone X
            </nuxt-link>
            <nuxt-link to="/mobile-phones/samsung/s9" class="no-underline block text-pink-brand hover:text-pink-light mt-4 mr-4 sm:inline-block sm:mt-0">
              Samsung S9/+
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>
    <div>
    <nuxt/>
    </div>
      <footer>
        <div>
          <p>mopho.com 2018</p>
        </div>
      </footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const ns = "layout-defaultStore";
const { mapState, mapActions } = createNamespacedHelpers(ns);

export default {
    computed: {
        ...mapState([
            "open"
        ]),
    },
    methods: {
        ...mapActions({
            menuToggled: "menuToggledAction"
        }),
    }
};
</script>