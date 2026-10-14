<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps(['youbikeData'])

  const sortColumn = ref("")
  const sortAsc = ref(true)
  const sortedData = computed(() => props.youbikeData?.sorted(sortColumn.value, sortAsc.value))

  function setSortColumn(column) {
    if (sortColumn.value !== column) {
      sortAsc.value = true;
    } else {
      sortAsc.value = !sortAsc.value;
    }
    sortColumn.value = column;
  }

  function getSortIconPath(column) {
    if (sortColumn?.value !== column) {
      return "/src/assets/sort.svg";
    } else if (sortAsc.value == true) {
      return "/src/assets/sort-asc.svg";
    }
    return "/src/assets/sort-desc.svg";
  }
</script>


<template>
  <div id="form">
    <table>
      <tbody>
        <tr>
          <td>項次</td>
          <td>
            場站區域
            <img class="btn" :src="getSortIconPath('sarea')" width="20" height="20" @click="setSortColumn('sarea')">
          </td>
          <td>
            站名
            <img class="btn" :src="getSortIconPath('sna')" width="20" height="20" @click="setSortColumn('sna')">
          </td>
          <td>
            地點
            <img class="btn" :src="getSortIconPath('ar')" width="20" height="20" @click="setSortColumn('ar')">
          </td>
          <td>
            座標位置
            <img class="btn" :src="getSortIconPath('location')" width="20" height="20" @click="setSortColumn('location')">
          </td>
          <td>
            目前車輛數
            <img class="btn" :src="getSortIconPath('available_rent_bikes')" width="20" height="20" @click="setSortColumn('available_rent_bikes')">
          </td>
          <td>
            目前空位數
            <img class="btn" :src="getSortIconPath('available_return_bikes')" width="20" height="20" @click="setSortColumn('available_return_bikes')">
          </td>
        </tr>
        <tr v-for="(data,index) in sortedData?.data">
          <td class="center">{{index+1}}</td>
          <td>{{data.sarea}}</td>
          <td>{{data.sna.replace('YouBike2.0_','')}}</td>
          <td>{{data.ar}}</td>
          <td class="center">
            <a :href="'https://www.google.com.tw/maps/place/'+data.latitude+','+data.longitude" target="_blank" rel="noopener">
              <img src="../assets/location.jpg" alt="MAP" width="20" height="20">
            </a>{{data.latitude.toFixed(6)}},{{data.longitude.toFixed(6)}}
          </td>
          <td class="center">{{data.available_rent_bikes}}</td>
          <td class="center">{{data.available_return_bikes}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  #form {
    height: 550px;
    overflow-y: scroll;
  }

  table {
    width: 100%;
    overflow: auto;
  }

  tbody > tr:nth-of-type(odd) {
    background-color: #F2F2F2;
  }

  tbody > tr:nth-of-type(1) > * {
    color: #FFFFFF;
  }

  tbody > tr:nth-of-type(1) {
    background-color: #239BB0;
    text-align: center;
  }

  td {
    height: 50px;
    padding: 0px 10px;
  }


  .center {
    text-align: center;
  }

  .btn:hover {
    cursor: pointer;
  }
</style>
