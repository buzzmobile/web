<template>
  <div>
    <div class="font-sans antialiased" id="app">
      <nav class="flex items-center justify-between flex-wrap bg-grey-lighter p-6">
        <div class="flex items-center flex-no-shrink mr-6">
          <nuxt-link class="no-underline font-bold text-xl tracking-wide text-pink-brand" to="/">Mopho</nuxt-link>
        </div>
        <div class="block sm:hidden">
          <button @click="menuToggled" class="flex items-center px-3 py-2 border rounded text-pink-lighter border-pink-brand hover:text-pink-light hover:border-pink-light">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div class="text-sm sm:flex-grow">
            <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-pink-brand hover:text-pink-light mr-4">
              iPhone X
            </a>
            <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-pink-brand hover:text-pink-light mr-4">
              Samsung S9/+
            </a>
          </div>
        </div>
      </nav>
    </div>
    <nuxt/>
    <div>
      <section>
        <div>
          <div>
            <div>
              <h4>About us</h4>
              <p>
                <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit</b>
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut vel nesciunt nostrum est at ipsa dicta aperiam
                ea soluta excepturi. Maiores dolores quas expedita, obcaecati repudiandae eveniet, quos ipsam sapiente dolorem,
                quis, accusamus aliquid qui.</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <div>
            <div>
              <div>
                <h5>
                  <a href="/">mopho</a>
                </h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nulla, vitae! Consectetur aliquid dolore,
                  suscipit odio commodi tempore, animi voluptatum? Ipsa commodi ea rem! Corporis.</p>
              </div>
              <div>
                <ul>
                  <li>
                    <b>Footer head</b>
                  </li>
                  <li>
                    <a href="">Footer link</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <p>
                  <a href="">&copy; mopho.com 2017 | Lorem ipsum dolor sit amet, consectetur adipisicing elit</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
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