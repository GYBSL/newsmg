<template>
  <div class="HotVideoItem">
    <div class="hot-li" v-if="hotvideoobj">
      <li
        class="lis-hot"
        v-for="(item, index) in hotvideoobj
          ? hotvideoobj.children[1].children
          : ''"
        @click.stop="toItem(item.model)"
        :key="index"
      >
        <span
          class="ic"
          :style="{ backgroundImage: `url(${item ? item.model.icon : ''})` }"
        ></span>
        <span class="wz">{{ item ? item.model.title : "" }}</span>
      </li>
    </div>

    <div class="hot-li" v-if="findObj">
      <li
        class="lis-hot"
        v-for="(item, index) in findObj ? findObj.recommended_position : ''"
        @click.stop="toItems(item)"
        :key="index"
      >
        <span
          class="ic"
          :style="{ backgroundImage: `url(${item ? item.icon : ''})` }"
        ></span>
        <span class="wz">{{ item ? item.title : "" }}</span>
      </li>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  props: {
    hotvideoobj: [Object, null],
    findObj: [Object, null],
  },
  // computed: {
  //   ...mapState(["hotvideoobj"]),
  // },
  methods: {
    toItem(v) {
      if (v.title == "周榜单") {
        let str = v.link.split("%")[4].slice(2);
        this.$router.push("/swipearc");
        this.$store.commit("changeEarcId", str);
      } else if (v.title == "分类热门") {
        let url = "https://apis.netstart.cn/xpc/home/cateHot"
        this.$store.commit("changesearchDeatialUrl", url);
        this.$store.commit("changedetailpage", 1);
        this.$store.commit("changehotflag", true);
        this.$store.commit("changehottitle", '分类热门');
        this.$router.push("/searchdetails");
      }else if (v.title == "分类精选") {
        let url = "https://apis.netstart.cn/xpc/home/cateSelection?type=16"
        this.$store.commit("changesearchDeatialUrl", url);
        this.$store.commit("changedetailpage", 1);
        this.$store.commit("changehotrecflag", true);
        this.$store.commit("changehottitle", '分类精选');
        this.$router.push("/searchdetails");
      }else if (v.title == "场库精选") {
        let url = "https://apis.netstart.cn/xpc/home/vmovier"
        this.$store.commit("changesearchDeatialUrls", url);
        this.$store.commit("changedetailpage", 1);
        this.$store.commit("changehottitle", '场库精选');
        this.$router.push("/ckcarechoice");
      }
    },
    toItems() {
      return;
    },
  },
};
</script>

<style lang="less" scoped>
.HotVideoItem {
  width: 100%;
  padding: 3vw;
  .hot-li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    .lis-hot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
      .ic {
        flex-shrink: 0;
        display: inline-block;
        width: 10vw;
        height: 10vw;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
      .wz {
        flex-shrink: 0;
        font-family: "siyuanMed";
        font-size: 3vw;
        padding-top: 2vw;
      }
    }
  }
}
</style>