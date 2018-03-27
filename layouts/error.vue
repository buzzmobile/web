<template>
  <div>
    <h1 v-if="error.statusCode === 404" class="text-brand-pink px-4 py-8 mt-8">Apologies but we're unable to serve you this page as we can't find it (yes, we've checked the back of the sofa).</h1>
    <h1 v-else class="text-brand-pink px-4 py-8 mt-8">An unexpected error has occurred. Please contact us and let us know.</h1>
    <h2 class="text-brand-pink px-4">Please use the menu or click <nuxt-link to="/">here</nuxt-link> to go to our home page</h2>
  </div>
</template>

<script>
export default {
    props: ["error"],
};
</script>