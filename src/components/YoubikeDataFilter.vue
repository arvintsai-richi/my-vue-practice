<script setup>
  import { ref, watchEffect } from 'vue'
  import { YoubikeDataFilterModel } from '../model/YoubikeDataFilterModel.js'

  const props = defineProps(["sareaOptions"])
  const emits = defineEmits(["onChanged"])

  const youbikeDataFilter = ref(new YoubikeDataFilterModel())

  watchEffect(onChanged)

  function onChanged() {
    emits('onChanged', youbikeDataFilter.value)
  }

</script>

<template>
  <div id="filter">
    <div>
      <label for="area">站名/地點查詢：</label>
      <input type="text" name="area" id="area" v-model="youbikeDataFilter.areaQueryString" />
    </div>
    <div>
      <label for="sarea-select">場站區域：</label>
      <select name="sarea" id="sarea-select" v-model="youbikeDataFilter.selectedSarea">
        <option value="" selected>不拘</option>
        <option v-for="option in sareaOptions">{{option}}</option>
      </select>
    </div>
    <div>
      <input type="checkbox" id="has-bike-only" name="has-bike-only" v-model="youbikeDataFilter.hasBikeOnly" />
      <label for="has-bike-only">只顯示有車輛場站</label>
    </div>
  </div>
</template>


<style scoped>

  #filter {
    display: flex;
    height: 50px;
    align-items: center;
  }

    #filter > * {
      padding-right: 3em;
    }
</style>
