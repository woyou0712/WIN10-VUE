<template>
  <!-- 右键菜单 -->
  <div class="right-click-list" :style="rightClickStyle">
    <div
      class="list-item"
      v-for="(item,i) in rightClickData"
      :key="i"
      @click="onRightList(item.name)"
    >
      <i class="iconfont" v-html="item.icon"></i>
      <span class="text nowrap" v-text="item.name"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightClickStyle: Object,
    rightClickData: Array,
    onRightList: Function
  }
};
</script>
