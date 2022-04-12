<template>
  <div id="app">
    <div
      class="loadBox"
      v-if="
        apploading && JSON.stringify($route.meta) == '{}'
          ? true
          : $route.meta.flag
      "
    >
      <van-loading type="spinner" />
    </div>
    <div class="sy-bgbox">
      <van-tabbar v-model="active" class="home-nav">
        <van-tabbar-item to="/home">
          <span>首页</span>
          <template #icon="props">
            <img src="@/assets/iconimg/sy-act.png" alt="" v-if="props.active" />
            <img src="@/assets/iconimg/sy.png" alt="" v-else width="100%" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/note">
          <span>手记</span>
          <template #icon="props">
            <img
              src="@/assets/iconimg/shouji-act.png"
              alt=""
              v-if="props.active"
            />
            <img src="@/assets/iconimg/shouji.png" alt="" v-else />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/find">
          <span>发现</span>
          <template #icon="props">
            <img
              src="@/assets/iconimg/find-act.png"
              alt=""
              v-if="props.active"
            />
            <img src="@/assets/iconimg/find.png" alt="" v-else />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/mine">
          <span>我的</span>
          <template #icon="props">
            <img
              src="@/assets/iconimg/mine-act.png"
              alt=""
              v-if="props.active"
            />
            <img src="@/assets/iconimg/mine.png" alt="" v-else />
          </template>
        </van-tabbar-item>
      </van-tabbar>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      active: 0,
    };
  },
  name: "app",
  components: {},
  mounted() {
    this.fetchRoute();
  },
  computed: {
    ...mapState([
      "recObj",
      "carechoiceObj",
      "apploading",
      "userItem",
      "videoIfoObj",
      "hotvideoobj",
      "jqvideoArr",
      "userfeedArr",
      "noteObj",
      "findObj",
    ]),
  },
  methods: {
    fetchRoute() {
      if (this.$route.path == "/home") {
        this.active = 0;
      } else if (this.$route.path == "/note") {
        this.active = 1;
      } else if (this.$route.path == "/find") {
        this.active = 2;
      } else if (this.$route.path == "/mine") {
        this.active = 3;
      }
    },
  },
  watch: {
    $route: function () {
      this.$store.commit("changeapploading", true);
      if (this.recObj && this.$route.path == "/home/recommend") {
        this.$store.commit("changeapploading", false);
      } else if (this.carechoiceObj && this.$route.path == "/home/selection") {
        this.$store.commit("changeapploading", false);
      } else if (this.userItem && this.$route.path == "/user") {
        this.$store.commit("changeapploading", false);
      } else if (this.videoIfoObj && this.$route.path == "/videoplay") {
        this.$store.commit("changeapploading", false);
      } else if (this.hotvideoobj && this.$route.path == "/home/hot") {
        this.$store.commit("changeapploading", false);
      } else if (this.jqvideoArr && this.$route.path == "/home/cateRecommend") {
        this.$store.commit("changeapploading", false);
      } else if (this.userfeedArr && this.$route.path == "/home/feed") {
        this.$store.commit("changeapploading", false);
      } else if (this.noteObj && this.$route.path == "/note") {
        this.$store.commit("changeapploading", false);
      } else if (this.findObj && this.$route.path == "/find") {
        this.$store.commit("changeapploading", false);
      }
      this.fetchRoute();
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  position: relative;
}
.loadBox {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.sy-bgbox {
  width: 100%;
  .home-nav {
    height: 60px;
    font-family: "siyuanMed";
    z-index: 2;
    .van-tabbar-item {
      padding-top: 8px;
      font-size: 0.6rem;
      line-height: normal;
      justify-content: space-around;
      color: #a0a1a1;
    }
    .van-tabbar-item--active {
      color: #1a1a1a;
    }
    &::after {
      position: relative;
    }
  }
}
</style>
