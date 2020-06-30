<template>
  <div class="window-iconfont-list">
    <div
      class="icon-box"
      v-for="(item,i) in iconList"
      :key="i"
      @click="onIcon(item)"
      :class="item?'':'w'"
    >
      <span class="iconfont" v-html="item?item:'无'"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: { onIcon: Function },
  data() {
    return {
      iconList: [
        "&#xe617;",
        "&#xe600;",
        "&#xe712;",
        "&#xe613;",

        "&#xe6ab;",
        "&#xe607;",
        "&#xe638;",
        "&#xe61e;",
        "&#xe63d;",
        "&#xe612;",
        "&#xe668;",
        "&#xe63a;",

        "&#xe66a;",
        "&#xe71a;",
        "&#xe71b;",
        "&#xe659;",
        "&#xe62f;",
        "&#xe69f;",
        "&#xe664;",
        "&#xe70d;",

        "&#xe637;",
        "&#xe633;",
        "&#xe7ad;",
        "&#xeba2;",
        "&#xe604;",
        "&#xec13;",
        "&#xe69d;",
        "&#xedd4;",

        "&#xe648;",
        "&#xe6cc;",
        "&#xe615;",
        "&#xe654;",
        "&#xe641;",
        "&#xe6fe;",
        ""
      ]
    };
  }
};
</script>