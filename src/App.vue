<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import dayjs from 'dayjs'
  import YoubikeData from './components/YoubikeData.vue'
  import YoubikeDataFilter from './components/YoubikeDataFilter.vue'
  import RefreshButton from './components/RefreshButton.vue'

  import { YoubikeDataModel } from './model/YoubikeDataModel.js'

  const currentTimeString = ref('')
  const youbikeData = ref(new YoubikeDataModel())
  const youbikeDataFilter = ref(null)
  const filteredYoubikeData = computed(() => youbikeDataFilter.value?.applyTo(youbikeData.value))
  const sareaOptions = computed(() => {
    const sareaData = youbikeData.value?.data?.map(data => data.sarea);
    const distinctSareaData = Array.from(new Set(sareaData));
    return distinctSareaData
  })

  onMounted(() => {
    fetchData()
  })

  watch(youbikeData.value, updateTime)

  function fetchData() {
    fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
      .then(response => response.json())
      .then(jsonData => {
        youbikeData.value.setDataJson(jsonData)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function refresh() {
    fetchData()
  }

  function updateTime() {
    currentTimeString.value = dayjs().format('YYYY-MM-DD hh:mm:ss')
  }

  function onFilterChanged(filterValue) {
    youbikeDataFilter.value = filterValue
  }

</script>


<template>
  <div id="header">
    <YoubikeDataFilter :sareaOptions="sareaOptions" @onChanged="onFilterChanged" />
    <div id="refresh-btn-div">
      <RefreshButton @onclick="refresh" />
    </div>
  </div>
  <YoubikeData :youbikeData="filteredYoubikeData" />
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
