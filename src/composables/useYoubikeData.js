import { ref, computed, onMounted } from 'vue'
import { YoubikeDataModel } from '../model/YoubikeDataModel.js'
import { YoubikeDataFilterModel } from '../model/YoubikeDataFilterModel.js'

const youbikeData = ref(new YoubikeDataModel())
const youbikeDataFilter = ref(new YoubikeDataFilterModel())
const filteredYoubikeData = computed(() => youbikeDataFilter.value?.applyTo(youbikeData.value))

/**
 * 使用 Youbike 資料，將回傳
 * - youbikeData，原始 youbike 資料
 * - youbikeDataFilter，過濾 youbikeData 的過濾器
 * - filteredYoubikeData，用 youbikeDataFilter 來過濾 youbikeData 的結果
 * - fetchData 更新資料的函式，初始化時會自動呼叫一次
 */
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
