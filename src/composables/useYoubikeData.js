import { ref, computed, onMounted } from 'vue'
import { YoubikeDataModel } from '../model/YoubikeDataModel.js'
import { YoubikeDataFilterModel } from '../model/YoubikeDataFilterModel.js'

const youbikeData = ref(new YoubikeDataModel())
const youbikeDataFilter = ref(new YoubikeDataFilterModel())
const filteredYoubikeData = computed(() => youbikeDataFilter.value?.applyTo(youbikeData.value))

export function useYoubikeData() {

  onMounted(() => {
    fetchData()
  })

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
  return { youbikeData, filteredYoubikeData, youbikeDataFilter, fetchData };
}
