<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="rec-bg" v-if="recObj">
      <!-- 轮播图 -->
      <div>
        <SwipeImage :obj='recObj?recObj:null'></SwipeImage>
      </div>

      <!-- 内容 -->
      <div class="rec-tj">
        <ul>
          <template v-for="(item, index) in recObjItem ? recObjItem : ''">
            <uiBigCard
              v-if="item ? item.type == 'uiBigCard' : false"
              :key="index"
              :BigChildren="
                item ? (item.type == 'uiBigCard' ? item : null) : null
              "
            ></uiBigCard>
            <uiMiddleCard
              v-if="item ? item.type == 'uiMiddleCard' : false"
              :midChildren="
                item ? (item.type == 'uiMiddleCard' ? item : null) : null
              "
              :key="index"
            ></uiMiddleCard>
            <uiCollection
              :key="index"
              v-if="item ? item.type == 'uiCollectionSlideOne' : false"
              :ColChildren="
                item
                  ? item.type == 'uiCollectionSlideOne'
                    ? item
                    : null
                  : null
              "
            ></uiCollection>
          </template>
        </ul>

        <div class="loading">
          <span v-if="showrecloading">加载中...</span>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { mapState } from "vuex";
import SwipeImage from "@/components/SwipeImage.vue";
import uiMiddleCard from "@/components/uiMiddleCard.vue";
import uiBigCard from "@/components/uiBigCard.vue";
import uiCollection from "@/components/uiCollection.vue";

export default {
  data() {
    return {
      isLoading: false,
      isLoadAgain: false,
    };
  },
  components: {
    SwipeImage,
    uiMiddleCard,
    uiBigCard,
    uiCollection,
  },
  computed: {
    ...mapState(["recObj", "recObjItem", "recpage",'showrecloading']),
    tjObj() {
      let arr = [];
      if (this.recObj) {
        arr = this.recObj.children.filter((n) => n.type != "uiBanner");
      }
      return arr;
    },
  },
  created() {
    this.getRecData();
  },
  mounted() {
    window.addEventListener("scroll", this.getMoreRec);
  },
  methods: {
    getRecData() {
      this.axios
        .get(
          `https://apis.netstart.cn/xpc/home/recommend?page=${this.recpage}&pageSize=28`
        )
        .then((res) => {
          this.$store.commit("changeRecData", res.data.data);
          this.$store.commit("changerecObjItem", res.data.data.children);
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
          this.$store.commit("changeapploading", false);
        });
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getRecData();
    },
    getMoreRec() {
      if (this.$route.path == "/home/recommend") {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.recObjItem) {
          this.sendTime = setTimeout(() => {
            if (
              document.documentElement.scrollTop +
                document.documentElement.clientHeight +
                20 >
              document.documentElement.offsetHeight
            ) {
              this.$store.commit("changeshowrecloading", true);
              this.$store.commit("changerecpage");
            }
          }, 500);
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.getMoreRec);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getMoreRec);
    next();
  },
  watch: {
    recpage(n) {
      this.axios
        .get(
          `https://apis.netstart.cn/xpc/home/recommend?page=${n}&pageSize=28`
        )
        .then((res) => {
          this.$store.commit("changerecObjItem", [
            ...this.recObjItem,
            ...res.data.data.children,
          ]);
          this.$store.commit("changeshowrecloading", false);
        });
    },
  },
};
</script>

<style lang="less">
.rec-bg {
  background-color: #f6f6f6;
  padding-bottom: 60px;
  .rec-tj {
    width: 100%;
    padding: 0 10px;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .loading {
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        display: inline-block;
        font-family: "siyuanMed";
        font-size: 2.5vw;
        color: #1b1b1b;
        padding: 1.5vw;
      }
    }
  }
}
</style>

