<script setup>
  import { ref, watch } from 'vue'
  import dayjs from 'dayjs'
  import YoubikeData from './components/YoubikeData.vue'
  import YoubikeDataFilter from './components/YoubikeDataFilter.vue'
  import RefreshButton from './components/RefreshButton.vue'
  import { useYoubikeData } from './composables/useYoubikeData.js'

  const currentTimeString = ref('')
  const { youbikeData, filteredYoubikeData, fetchData } = useYoubikeData()

  watch(youbikeData.value, updateTime)

  function refresh() {
    fetchData()
  }

  function updateTime() {
    currentTimeString.value = dayjs().format('YYYY-MM-DD hh:mm:ss')
  }

</script>


<template>
  <div id="header">
    <YoubikeDataFilter />
    <div id="refresh-btn-div">
      <RefreshButton @onclick="refresh" />
    </div>
  </div>
  <YoubikeData />
  <div id="footer">
    <div>
      <label>
        資料比數：{{ filteredYoubikeData?.length }}筆
      </label>
    </div>
    <div>
      <label>資料更新時間：{{ currentTimeString }}</label>
    </div>
  </div>
</template>

<style scoped>

  #filter {
    width: 80%;
    height: 100%;
    align-content: center;
    float: left;
  }

  #header {
    width: 100%;
    height: 50px;
  }

  #filter > * {
    padding-right: 3em;
    float: left;
  }

  #header > div:last-of-type {
    float: right;
  }

  #refresh-btn-div {
    display: flex;
    height: 100%;
    align-items: end;
  }

  #footer {
    width: 100%;
    height: 50px;
    align-content: center;
  }

    #footer > div:first-of-type {
      float: left
    }

    #footer > div:last-of-type {
      float: right
    }
</style>

<style>
  * {
    font-family: "Microsoft JhengHei"; /* 微軟正黑體 */
    font-size: 16px;
  }
</style>
