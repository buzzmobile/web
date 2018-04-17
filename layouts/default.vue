<template>
  <div>
    <div v-if="showCookieSettings">
      <div class="fixed w-full h-screen z-50 bg-brand-grey opacity-95">
        <div class="mx-auto w-64 bg-pink-light rounded font-extrabold leading-normal mt-20pc p-4">
          We use Google Analytics to help us understand and therefore improve your experience with us. As its widely used by many sites,
          we're assuming you're happy with this but if not, untick this box.
          <div class="my-4">
            <label for="gaAllowed">Allow Google Analytics</label>
            <input class="ml-2" type="checkbox" id="gaAllowed" :checked="gaAllowed" @change="gaAllowedChanged">
          </div>
          <p>We also need to store your answer in a cookie.</p>
          <button @click="saveCookiePrefsClicked" class="btn w-full mt-4 p-2">Close</button>
        </div>
      </div>
    </div>
    <div class="flex flex-col min-h-screen no-bigger-than">
      <header class="font-sans antialiased" id="app">
        <nav class="flex items-center justify-between flex-wrap bg-brand-grey p-4">
          <div class="flex items-center flex-no-shrink mr-6">
            <nuxt-link class="no-underline font-bold text-xl tracking-wide text-brand-pink" to="/">Mopho</nuxt-link>
          </div>
          <div class="block sm:hidden">
            <button @click="menuToggled" class="flex items-center px-3 py-2 border rounded text-pink-light border-brand-pink hover:text-pink-light hover:border-pink-light">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div :class="menuOpen ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div class="sm:flex-grow">
              <nuxt-link @click.native="menuLinkClicked" to="/mobile-phones/apple/iphonex" class="no-underline block text-brand-pink font-medium hover:text-pink-light sm:inline-block mt-4 mr-4 sm:mt-0">
                iPhone X
              </nuxt-link>
              <nuxt-link @click.native="menuLinkClicked" to="/mobile-phones/samsung/s9" class="no-underline block text-brand-pink font-medium hover:text-pink-light sm:inline-block mt-4 mr-4 sm:mt-0">
                Samsung S9/+
              </nuxt-link>
            </div>
          </div>
        </nav>
      </header>
      <main class="flex-1">
        <nuxt/>
      </main>
      <footer class="bg-brand-grey text-brand-pink font-light w-full p-4">
        <h4 class="mt-2">About us</h4>
        <p class="my-2">We search deals across these merchants so you don't have to: O2 Mobiles, buymobiles.net, Mobiles.co.uk, EE Mobile,
          ID Mobile, giffgaff, Vodafone Ltd</p>
        <button @click="showCookieSettingsClicked" class="block text-brand-pink font-medium hover:text-pink-light sm:inline-block mt-4 mr-4 sm:mt-0">Cookie Settings</button>
        <a class="no-underline block text-brand-pink font-medium hover:text-pink-light sm:inline-block mt-4 mr-4 sm:mt-0" href="/about/privacy-policy">Privacy Policy</a>
        <a class="no-underline block text-brand-pink font-medium hover:text-pink-light sm:inline-block mt-4 mr-4 sm:mt-0" href="/about/contact-us">Contact Us</a>
        <p class="text-center font-hairline">© mopho.com 2018</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("layout-defaultStore");
const { mapState : mapRouteState } = createNamespacedHelpers("route");

export default {
    computed: {
        ...mapState([
            "menuOpen",
            "showCookieSettings",
            "gaAllowed"
        ]),
        ...mapRouteState([
            "name"
        ])
    },
    methods: {
        ...mapActions({
            menuToggled: "menuToggledAction",
            menuLinkClicked: "menuLinkClickedAction",
            showCookieSettingsClicked: "showCookieSettingsClickedAction",
            gaAllowedChanged: "gaAllowedChangedAction",
            saveCookiePrefsClicked: "saveCookiePrefsClickedAction"
        }),
        routeNameChanged() {
            this.$store.dispatch("layout-defaultStore/routeNameChangedAction");
        }
    },
    watch: {
        "name": "routeNameChanged"
    },
    mounted () {
        this.$store.dispatch("layout-defaultStore/initCookieStateAction", this.$nuxt.$cookie);
    }
};
</script>