<template>
  <div class="homefind">
    <div class="mask-ipt" @click.stop='toSearch'></div>
    <van-search v-model="value" placeholder="请输入作品名、创作人" />
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <SwipeImage :findObj="findObj"></SwipeImage>
      <HotVideoItem :findObj="findObj"></HotVideoItem>
      <div class="title-works">
        <span class="tit">作品</span>
        <span class="all" @click.stop="toWorkall">全部作品</span>
      </div>
      <FindIndexWorks :findObj="findObj"></FindIndexWorks>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SwipeImage from "@/components/SwipeImage.vue";
import HotVideoItem from "@/components/HotVideoItem.vue";
import FindIndexWorks from "@/components/FindIndexWorks.vue";

export default {
  data() {
    return {
      value: "",
      isLoading: false,
      isLoadAgain: false,
    };
  },
  components: {
    SwipeImage,
    HotVideoItem,
    FindIndexWorks,
  },
  computed: {
    ...mapState(["findObj",'SearchBlur']),
  },
  created() {
    this.getFindData();
  },
  methods: {
    toWorkall(){
      let url = 'https://apis.netstart.cn/xpc/articles?category_id=1'
      this.$store.commit("changesearchDeatialUrl", url);
      this.$store.commit("changedetailpage",1);
      this.$router.push("/searchdetails");
    },
    getFindData() {
      this.axios
        .get(`https://apis.netstart.cn/xpc/page/discovery`)
        .then((res) => {
          this.$store.commit("changefindObj", res.data.data);
          this.$store.commit("changeapploading", false);
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getFindData();
    },
    toSearch(){
        this.$store.commit('changeSearchBlur',true)
        this.$router.push('/search')
    }
  },
};
</script>

<style lang="less" scoped>
.homefind {
  padding-bottom: 60px;
  padding-top: 60px;
  width: 100%;
  position: relative;
  .mask-ipt{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 54px;
      z-index: 21;
    //   background-color: rgb(207, 153, 153);
  }
  .title-works {
    width: 100%;
    padding: 0 3vw;
    font-family: "siyuanMed";
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 2vw;
    .tit {
      font-size: 5vw;
      color: #181818;
    }
    .all {
      font-size: 3vw;
      color: #da4939;
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.van-search__content {
  background-color: #efefef;
  border-radius: 5px;
}
/deep/.van-search {
  padding-left: 3vw;
  padding-right: 3vw;
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
}
</style>