<template>
  <div class="home-bg">
    <div class="box-tem">
      <!-- top导航栏 -->
      <van-tabs v-model="active" class="vantabs">
        <van-tab
          v-for="(item, index) in routeArr"
          :title="item.title"
          :key="index"
          :to="
            item.link.slice(0, 5) == '/home' ? item.link : '/home' + item.link
          "
          title-style="fontFamily: 'siyuanMed';"
          title-active-color="#1A1A1A"
          title-inactive-color="#A4A4A4"
        >
        </van-tab>
      </van-tabs>

      <!-- 小图标盒子 -->
      <div class="rightbox">
        <div class="listbox">
          <span is-link @click="showPopup"></span>
        </div>
        <div class="msgbox">
          <span></span>
        </div>
      </div>
    </div>

    <!--菜单弹出框 -->
    <!-- 图标位置 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      round
      :style="{ height: '90%' }"
    >
      <div class="vanpop-nr">
        <div class="vanpop-tit">
          <span class="vanpop-clear"></span>
          <span class="vanpop-h">分类</span>
          <span class="vanpop-bj">编辑</span>
        </div>
        <div class="vanpop-mid">
          <div class="vanpop-fl">
            <span class="vanpop-mine">我的分类</span>
            <span class="vanpop-jr">点击进入分类</span>
          </div>
          <ul>
            <router-link
              v-for="(item, index) in routeArr"
              :key="index"
              :to="
                item.link.slice(0, 5) == '/home'
                  ? item.link
                  : '/home' + item.link
              "
              @click.native="changeShow"
            >
              <li>
                {{ item.title }}
              </li>
            </router-link>
          </ul>
          <div class="vanpop-more">
            <span class="vanpop-mine">更多分类</span>
            <span class="vanpop-jr">暂无更多分类</span>
          </div>
          <div class="vanpop-mm"></div>
        </div>
      </div>
    </van-popup>

    <!-- 渲染出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      routeArr: [],
      routePath: null,
      show: false,
    };
  },
  components: {},
  created() {
    this.axios.get("https://apis.netstart.cn/xpc/home/config").then((res) => {
      this.routeArr = res.data.data.tab;
      if (!(JSON.stringify(this.$route.query) == "{}")) {
        this.fetchRouteTop(this.$route.query);
      } else if (JSON.stringify(this.$route.query) == "{}") {
        this.fetchRouteTop();
      }
    });
  },
  mounted() {
    if (!(JSON.stringify(this.$route.query) == "{}")) {
      this.fetchRouteTop(this.$route.query);
    } else if (JSON.stringify(this.$route.query) == "{}") {
      this.fetchRouteTop();
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (typeof vm.routePath == "object" && vm.routePath) {
        vm.fetchRouteTop(vm.routePath.query);
        next({ path: vm.routePath.path, query: vm.routePath.query });
      } else {
        next({ path: vm.routePath });
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (!(JSON.stringify(to.query) == "{}")) {
      this.fetchRouteTop(to.query);
    } else if (JSON.stringify(this.$route.query) == "{}") {
      this.fetchRouteTop();
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (!(JSON.stringify(from.query) == "{}")) {
      this.routePath = from;
    } else if (JSON.stringify(from.query) == "{}") {
      this.routePath = from.path;
    }
    next();
  },
  methods: {
    fetchRouteTop(querys = null) {
      this.routeArr.forEach((el, index) => {
        if (this.$route.name == el.alias) {
          this.active = index;
          return;
        } else if (querys ? querys.cateName == "Vlog_旅行,旅拍" : false) {
          this.active = 8;
        } else if (querys ? querys.cateName == "器材" : false) {
          this.active = 11;
        } else if (
          querys &&
          (querys ? querys.cateName.includes(el.title) : "")
        ) {
          this.active = index;
        }
      });
    },
    showPopup() {
      this.show = true;
    },
    changeShow() {
      this.show = false;
    },
  },
  watch: {
    "$route.path": function () {
      if (!(JSON.stringify(this.$route.query) == "{}")) {
        this.fetchRouteTop(this.$route.query);
      } else if (JSON.stringify(this.$route.query) == "{}") {
        this.fetchRouteTop();
      }
    },
  },
};
</script>

<style lang="less">
.home-bg {
  width: 100%;
  padding-top: 44px;
  .box-tem {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    .vantabs {
      width: 80%;
      flex: 1 1 auto;
      .van-tabs__wrap {
        height: 44px;
      }
      .van-tabs__wrap--scrollable {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 10px;
          height: 80%;
          box-shadow: -20px 0px 30px -20px rgb(255, 255, 255) inset;
        }
      }
    }
    .rightbox {
      background-color: #fff;
      width: 80px;
      box-sizing: border-box;
      padding: 0px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .listbox {
        width: 50%;
        display: flex;
        justify-content: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/iconimg/EB.png) no-repeat center;
          background-size: contain;
        }
      }
      .msgbox {
        width: 50%;
        display: flex;
        justify-content: center;
        span {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(@/assets/iconimg/_52.png) no-repeat center;
          background-size: contain;
        }
      }
    }
  }
}
.vanpop-nr {
  width: 100%;
  .vanpop-tit {
    width: 100%;
    height: 52px;
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
    font-family: "siyuanMed";
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      position: absolute;
      border-bottom: 1px solid rgba(161, 161, 161, 0.1);
    }
    .vanpop-clear {
      width: 15px;
      height: 15px;
      display: inline-block;
    }
    .vanpop-h {
      color: #1a1a1a;
      display: inline-block;
      font-size: 1rem;
    }
    .vanpop-bj {
      display: inline-block;
      color: #d65644;
      font-size: 0.9rem;
    }
  }
  .vanpop-mid {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    font-family: "siyuanMed";
    .vanpop-fl {
      width: 100%;
      padding: 15px 0;
      .vanpop-mine {
        font-size: 1rem;
        color: #1a1a1a;
      }
      .vanpop-jr {
        color: #a1a1a1;
        font-size: 0.6rem;
        margin-left: 10px;
      }
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a {
        width: 30%;
        height: 35px;
        background-color: #f0f0f0;
        margin-bottom: 12px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          color: #1a1a1a;
          font-size: 0.8rem;
        }
      }
    }
    .vanpop-more {
      width: 100%;
      padding-top: 5px;
      padding-bottom: 15px;
      .vanpop-mine {
        font-size: 1rem;
        color: #1a1a1a;
      }
      .vanpop-jr {
        color: #a1a1a1;
        font-size: 0.6rem;
        margin-left: 10px;
      }
    }
  }
}
.van-icon-cross:before {
  color: #1a1a1a;
}
</style>