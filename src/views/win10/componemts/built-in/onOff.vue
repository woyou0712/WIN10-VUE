<template>
  <div class="on-off-box" :class="isOnOff?'on':''" @click="onFun">
    <div class="on-off"></div>
  </div>
</template>

<script>
export default {
  props: { toOnOff: Function, isOnOff: Boolean },
  data() {
    return {
      onOff: null
    };
  },
  mounted() {
    this.onOff = this.isOnOff;
  },
  methods: {
    onFun() {
      this.onOff = !this.onOff;
      if (typeof this.toOnOff == "function") {
        this.toOnOff(this.onOff);
      }
    }
  }
};
</script>
