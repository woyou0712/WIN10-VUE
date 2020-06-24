<template>
  <div class="window-user">
    <p>这是用户组件,根据需要自己开发,目录位置:"/admin/components/built-in/upDataUser.vue"</p>
    <p>父组件是 "memu.vue" ; 若需要 "props" 参数请到父组件 "goUpDataUser" 方法中传入</p>
  </div>
</template>

<script>
export default {
  props: {}
};
</script>

<style scoped>
.window-user {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>