<template>
  <div class="sm:w-1/3 p-4">
    <label class="block uppercase tracking-wide text-brand-pink font-bold mb-2" :for=label>
      {{label}}
    </label>
    <div class="relative">
      <select @change="$emit('change', $event.target.value)" class="block appearance-none w-full border border-brand-grey text-brand-pink rounded py-3 px-4 pr-8"
        :id=label>
        <option 
        v-for="d in dropDownItems" 
        v-bind:key="d.coded"
        :value="d.coded" 
        :selected="currentValue===d.coded" 
        >{{d.display}}</option>
      </select>
      <AppSelectDownArrow></AppSelectDownArrow>
    </div>
  </div>
</template>

<script>
import AppSelectDownArrow from "./AppSelectDownArrow";
export default {
    components: {
        AppSelectDownArrow
    },
    props: {
        label: String,
        dropDownItems: Array,
        currentValue: String
    }
};
</script>
