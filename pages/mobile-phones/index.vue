<template>
  <div class="flex flex-col items-center p-6">
    <h2 class="mt-1 sm:mt-4">your next mobile</h2>
    <p class="text-lg text-center mt-2 sm:mt-4">lets simplify finding your next mobile</p>
    <nuxt-link class="btn hover:bg-pink-light w-4/5 sm:w-3/5 sm:max-w-xs px-4 py-2 mt-4 sm:mt-8" to="/mobile-phones/samsung/s9">SAMSUNG GALAXY S9/+</nuxt-link>
    <nuxt-link class="btn hover:bg-pink-light w-4/5 sm:w-3/5 sm:max-w-xs px-4 py-2 mt-4 sm:mt-4" to="/mobile-phones/apple/iphonex">APPLE IPHONE X</nuxt-link>
  </div>
</template>

<script>
export default {
    head () {
        return {
            title: "Mobile Contracts - Mopho",
            meta: [
                { hid: "description", name: "description", content: "Mobile Contracts by Mopho" }
            ]
        };
    }
};
</script>