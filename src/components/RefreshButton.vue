<script setup></script>

<template>
  <div id="root" @click="$emit('onclick')">
    <img src="../assets/reload.svg" width="21" height="21">
    <p>最新資料</p>
  </div>
</template>

<style scoped>
  #root {
    width: 100px;
    height: 24px;
    border: 2px solid #808080;
    border-radius: 10px;
    color: #808080;
    align-content: center;
    align-items: center;
    display: flex;
  }

    #root:hover {
      color: #239BB0;
      border: 2px solid #239BB0;
      cursor: pointer;
    }

    #root > * {
      flex: auto;
      margin: 0;
    }
</style>
