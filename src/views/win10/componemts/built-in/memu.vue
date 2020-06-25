<template>
  <div class="window-nav-memu" :class="themeColor" @click="onShowMemu">
    <div class="memu-item left">
      <div class="left-item user" title="账号管理" @click="goUpDataUser">
        <span class="iconfont">&#xe7ad;</span>
      </div>
      <div class="left-item set-up" title="设置" @click="showSetUp">
        <span class="iconfont">&#xe654;</span>
      </div>
      <div class="left-item quit" title="退出" @click="quit">
        <span class="iconfont">&#xe659;</span>
      </div>
    </div>
    <!-- 菜单-最多三级 -->
    <div class="memu-item center">
      <div class="memu-one-box" v-for="(item,i) in memuData" :key="i">
        <div class="one-box" v-if="item.son.length>0">
          <div class="one-data father" @click.stop="clickFather(i,'two')">
            <div class="left-data">
              <span class="iconfont" v-if="item.imgType=='icon'" v-html="item.icon"></span>
              <img class="img" v-else-if="item.imgType=='img'" :src="item.img" />
              <span class="name-text nowrap" v-text="item.name"></span>
            </div>
            <div class="right-icon" :class="unfoldTwoMemu==i?'unfold':''">
              <span class="iconfont">&#xe71a;</span>
            </div>
          </div>
          <div class="memu-two-box" :class="unfoldTwoMemu==i?'unfold':''">
            <div class="memu-two" v-for="(p,j) in item.son" :key="j">
              <div class="two-box" v-if="p.son.length>0">
                <div class="two-data father" @click.stop="clickFather(j,'three')">
                  <div class="left-data">
                    <span class="iconfont" v-if="p.imgType=='icon'" v-html="p.icon"></span>
                    <img class="img" v-else-if="p.imgType=='img'" :src="p.img" />
                    <span class="name-text nowrap" v-text="p.name"></span>
                  </div>
                  <div class="right-icon" :class="unfoldThreeMemu==j?'unfold':''">
                    <span class="iconfont">&#xe71a;</span>
                  </div>
                </div>
                <div class="memu-three-box" :class="unfoldThreeMemu==j?'unfold':''">
                  <div class="memu-three" v-for="(m,n) in p.son" :key="n">
                    <!-- 三级菜单 -->
                    <div class="three-data" @click="clickMemu(m)">
                      <span class="iconfont" v-if="m.imgType=='icon'" v-html="m.icon"></span>
                      <img class="img" v-else-if="m.imgType=='img'" :src="m.img" />
                      <span class="name-text nowrap" v-text="m.name"></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 二级菜单 -->
              <div class="two-box" v-else>
                <div class="two-data" @click="clickMemu(p)">
                  <span class="iconfont" v-if="p.imgType=='icon'" v-html="p.icon"></span>
                  <img class="img" v-else-if="p.imgType=='img'" :src="p.img" />
                  <span class="name-text nowrap" v-text="p.name"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 一级菜单 -->
        <div class="one-box" v-else>
          <div class="one-data" @click="clickMemu(item)">
            <span class="iconfont" v-if="item.imgType=='icon'" v-html="item.icon"></span>
            <img class="img" v-else-if="item.imgType=='img'" :src="item.img" />
            <span class="name-text nowrap" v-text="item.name"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="memu-item right">
      <div
        class="paster-item"
        v-for="(item,i) in pasterData"
        :key="i"
        :title="item.name"
        @click="clickPaster(item)"
      >
        <span class="iconfont" v-if="item.imgType=='icon'" v-html="item.icon"></span>
        <img class="img" v-else-if="item.imgType=='img'" :src="item.img" />
        <p class="name-text nowrap" v-text="item.name"></p>
      </div>
    </div>
  </div>
</template>

<script>
import upDataUser from "./upDataUser.vue";
export default {
  props: {
    themeColor: String, //主题
    onShowMemu: Function, //控制是否显示
    showSetUp: Function, //打开设置
    showApp: Function //打开APP
  },
  data() {
    return {
      // 菜单数据,-可从服务器获取
      memuData: [
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
            "http://183.134.66.144/win10/touxiang/tx_01.jpg", //图片,二选一
          name: "一级菜单", //名称
          //子菜单
          son: []
        },
        {
          imgType: "icon", //图标类型 "icon", "img"
          icon: "&#xe6fe;", //图标,二选一
          img: "", //图片,二选一
          name: "一级菜单2", //名称
          //子菜单
          son: [
            {
              imgType: "icon", //图标类型 "icon", "img"
              icon: "&#xe668;",
              img: "",
              name: "二级菜单2",
              son: []
            },
            {
              imgType: "img", //图标类型 "icon", "img"
              icon: "",
              img:
                "http://183.134.66.144/win10/touxiang/tx_02.jpg",
              name: "二级菜单3",
              son: []
            }
          ]
        },
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
            "http://183.134.66.144/win10/touxiang/tx_03.jpg", //图片,二选一
          name: "一级菜单3", //名称
          //子菜单
          son: [
            {
              imgType: "img", //图标类型 "icon", "img"
              icon: "",
              img:
                "http://183.134.66.144/win10/touxiang/tx_04.jpg",
              name: "二级菜单2",
              son: [
                {
                  imgType: "img", //图标类型 "icon", "img"
                  icon: "",
                  img:
                    "http://183.134.66.144/win10/touxiang/tx_05.jpg",
                  name: "三级菜单",
                  son: []
                },
                {
                  imgType: "img", //图标类型 "icon", "img"
                  icon: "",
                  img:
                    "http://183.134.66.144/win10/touxiang/tx_06.jpg",
                  name: "三级菜单",
                  son: []
                }
              ]
            },
            {
              imgType: "img", //图标类型 "icon", "img"
              icon: "",
              img:
                "http://183.134.66.144/win10/touxiang/tx_07.jpg",
              name: "二级菜单3",
              son: [
                {
                  imgType: "img", //图标类型 "icon", "img"
                  icon: "",
                  img:
                    "http://183.134.66.144/win10/touxiang/tx_08.jpg",
                  name: "三级菜单10",
                  son: []
                }
              ]
            }
          ]
        }
      ],
      // 打开的二级菜单
      unfoldTwoMemu: null,
      // 打开的三级菜单
      unfoldThreeMemu: null,
      // 磁贴数据,-可从服务器获取
      pasterData: [
        {
          imgType: "icon", //图标类型 "icon", "img"
          icon: "&#xe6fe;", //图标,二选一
          img: "", //图片,二选一
          name: "小妖出品",
          content: "内容"
        },
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
            "http://183.134.66.144/win10/touxiang/tx_09.jpg", //图片,二选一
          name: "小妖出品",
          content: "内容"
        },
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
           "http://183.134.66.144/win10/touxiang/tx_09.jpg", //图片,二选一
          name: "小妖出品",
          content: "内容"
        },
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
            "http://183.134.66.144/win10/touxiang/tx_09.jpg", //图片,二选一
          name: "小妖出品",
          content: "内容"
        },
        {
          imgType: "img", //图标类型 "icon", "img"
          icon: "", //图标,二选一
          img:
            "http://183.134.66.144/win10/touxiang/tx_09.jpg", //图片,二选一
          name: "小妖出品",
          content: "内容"
        }
      ]
    };
  },
  methods: {
    clickFather(i, type) {
      if (type == "two") {
        if (this.unfoldTwoMemu == i) {
          this.unfoldTwoMemu = null;
          return;
        }
        this.unfoldTwoMemu = i;
      } else {
        if (this.unfoldThreeMemu == i) {
          this.unfoldThreeMemu = null;
          return;
        }
        this.unfoldThreeMemu = i;
      }
    },
    // 点击菜单
    clickMemu(memu) {
      this.myApp.alert({
        title: memu.name,
        content: "你想怎么做?接口位置:/admin/components/built-in/memu.vue"
      });
    },
    // 点击磁贴
    clickPaster(paster) {
      this.myApp.alert({
        title: paster.name,
        content: "你想怎么做?接口位置:/admin/components/built-in/memu.vue"
      });
    },
    // 用户设置
    goUpDataUser() {
      // 调用方法,打开APP组件窗口
      this.showApp({
        name: "设置",
        icon: "&#xe7ad;",
        content: upDataUser, //子组件
        type: "vue",
        props: {} //子组件要使用的方法
      });
    },
    // 退出登陆
    quit() {
      this.myApp.alert({
        title: "退出登陆",
        content: "你想怎么做?接口位置:/admin/components/built-in/memu.vue"
      });
    }
  }
};
</script>
