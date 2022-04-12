<template>
  <div class="SearchDetails">
    <div class="title-Deatials" v-if="hottitle">
      <div class="back">
        <span @click="$router.back()"></span>
      </div>
      <div class="tits">
        <span>{{ hottitle ? hottitle : "" }}</span>
      </div>
      <div></div>
    </div>
    <div class="title-Deatials" v-else>
      <div class="back">
        <span @click="$router.back()"></span>
      </div>
      <div class="tits">
        <span>{{ searchDeaHead ? searchDeaHead[0].title : "" }}</span>
      </div>
      <div></div>
    </div>

    <div class="head" v-if="searchDeaHead ? searchDeaHead[0].sub : false">
      <div class="head-li" ref="lis">
        <li
          class="deta"
          :class="{ active: act }"
          @click.stop="changeDetailAll($event)"
        >
          全部
        </li>
        <li
          class="deta"
          v-for="(item, index) in searchDeaHead ? searchDeaHead[0].sub : ''"
          :key="index"
          @click.stop="changeDetail(item, $event, index)"
        >
          {{ item ? item.title : "" }}
        </li>
      </div>
      <div class="more-li">
        <span @click="showPopup"></span>
      </div>
    </div>
    <div class="head" v-if="hotflag||hotrecflag">
      <div class="head-li" ref="lis">
        <li
          class="deta"
          :class="{ active: act }"
          @click.stop="changeDetailAll($event)"
        >
          全部
        </li>
        <li
          class="deta"
          v-for="(item, index) in searchDetailObj
            ? searchDetailObj.header.categories
            : ''"
          :key="index"
          @click.stop="changeDetail(item, $event, index)"
        >
          {{ item ? item.title : "" }}
        </li>
      </div>
      <div class="more-li">
        <span @click="showPopup"></span>
      </div>
    </div>

    <van-popup
      v-model="show"
      :close-on-popstate="true"
      position="top"
      :style="{ height: '50%' }"
    >
      <div class="tit-van">
        <span class="wz">筛选</span>
        <span class="close" @click.stop="close"></span>
      </div>
      <div
        class="vants-li"
        v-if="searchDeaHead ? searchDeaHead : false"
        ref="liss"
      >
        <li
          class="detas"
          :class="{ active: act }"
          @click.stop="changeDetailAlls($event)"
        >
          全部
        </li>
        <li
          class="detas"
          v-for="(item, index) in searchDeaHead ? searchDeaHead[0].sub : ''"
          :key="index"
          @click.stop="changeDetails(item, $event, index)"
        >
          {{ item ? item.title : "" }}
        </li>
      </div>
      <div class="vants-li" v-else ref="liss">
        <li
          class="detas"
          :class="{ active: act }"
          @click.stop="changeDetailAlls($event)"
        >
          全部
        </li>
        <li
          class="detas"
          v-for="(item, index) in searchDetailObj
            ? searchDetailObj.header
              ? searchDetailObj.header.categories
              : ''
            : ''"
          :key="index"
          @click.stop="changeDetails(item, $event, index)"
        >
          {{ item ? item.title : "" }}
        </li>
      </div>
    </van-popup>

    <div class="nr-li">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="sm">
          <SimialVideo
            v-for="(item, index) in searchDetailArr ? searchDetailArr : ''"
            :item="item"
            :key="index"
            @click.stop.native="toVideo(item)"
          ></SimialVideo>
        </div>

        <div class="loading">
          <span v-if="showrecloading">加载中...</span>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SimialVideo from "@/components/SimialVideo.vue";

export default {
  data() {
    return {
      searchDeatialUrlArr: null,
      searchDeaHead: null,
      isLoading: false,
      isLoadAgain: false,
      loading: false,
      sendtime: null,
      urlReset: null,
      act: true,
      show: false,
      urlval: null,
      ctindex: 0,
    };
  },
  components: {
    SimialVideo,
  },
  created() {
    this.searchDeaHead = null;
    if (this.searchDeatialUrl) {
      this.searchDeatialUrlArr = JSON.stringify({
        NameUrl: this.searchDeatialUrl,
      });
      localStorage.setItem("DeatialUrl", this.searchDeatialUrlArr);
      this.getDetailsData(this.searchDeatialUrl);
    } else {
      let DeatialUrl = JSON.parse(localStorage.getItem("DeatialUrl"));
      if (DeatialUrl.NameUrl == `https://apis.netstart.cn/xpc/home/cateHot`) {
        this.$store.commit("changehotflag", true);
        this.$store.commit("changehottitle", "分类热门");
      } else if (
        DeatialUrl.NameUrl ==
        `https://apis.netstart.cn/xpc/home/cateSelection?type=16`
      ) {
        this.$store.commit("changehotflag", true);
        this.$store.commit("changehottitle", "分类精选");
      }
      this.getDetailsData(DeatialUrl.NameUrl);
      this.$store.commit("changesearchDeatialUrl", DeatialUrl.NameUrl);
    }
  },
  computed: {
    ...mapState([
      "searchDeatialUrl",
      "searchDetailObj",
      "showrecloading",
      "detailpage",
      "searchDetailArr",
      "hotflag",
      "hottitle",
      "hotrecflag",
    ]),
  },
  mounted() {
    window.addEventListener("scroll", this.getMore);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('changehotflag',false)
    this.$store.commit('changehotrecflag',false)
    window.removeEventListener("scroll", this.getMore);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => {
        window.addEventListener("scroll", vm.getMore);
      });
    });
  },
  methods: {
    showPopup() {
      this.show = true;
      this.$nextTick(() => {
        let arrs = [...this.$refs.liss.children];
        arrs.forEach((el) => {
          el.classList.remove("active");
        });
        arrs[this.ctindex].classList.add("active");
      });
    },
    close() {
      this.show = false;
    },
    changeDetailAll(e) {
      let arr = [...this.$refs.lis.children];
      arr.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");

      this.ctindex = 0;

      if (this.hotflag) {
        this.getDetailsData(this.searchDeatialUrl);
        this.urlval = null;
        return;
      } else if (this.hotrecflag) {
        this.getDetailsData(this.searchDeatialUrl);
        this.urlval = null;
        return;
      }

      this.getDetailsData(this.searchDeatialUrl);
    },
    changeDetail(i, e, index) {
      let arr = [...this.$refs.lis.children];
      arr.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");

      this.ctindex = index + 1;

      if (this.hotflag) {
        this.urlReset = `${this.searchDeatialUrl}?category_id=${i.value}&pageSize=20`;
        this.getDetailsData(this.urlReset);
        this.urlval = i.value;
        return;
      } else if (this.hotrecflag) {
        this.urlReset = this.searchDeatialUrl.replace(/\d+/g, i.value);
        this.getDetailsData(this.urlReset);
        this.urlval = i.value;
        return;
      }

      this.urlReset = this.searchDeatialUrl.replace(/\d+/g, i.value);
      this.getDetailsData(this.urlReset);
    },
    changeDetailAlls(e) {
      this.show = false;
      let arr = [...this.$refs.liss.children];
      arr.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");

      this.ctindex = 0;

      let arrs = [...this.$refs.lis.children];
      arrs.forEach((el) => {
        el.classList.remove("active");
      });
      arrs[0].classList.add("active");

      if (this.hotflag) {
        this.getDetailsData(this.searchDeatialUrl);
        this.urlval = null;
        return;
      } else if (this.hotrecflag) {
        this.getDetailsData(this.searchDeatialUrl);
        this.urlval = null;
        return;
      }

      this.getDetailsData(this.searchDeatialUrl);
    },
    changeDetails(i, e, index) {
      this.show = false;
      let arr = [...this.$refs.liss.children];
      arr.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");

      this.ctindex = index + 1;

      let arrs = [...this.$refs.lis.children];
      arrs.forEach((el) => {
        el.classList.remove("active");
      });
      arrs[index + 1].classList.add("active");

      if (this.hotflag) {
        this.urlReset =
          this.searchDeatialUrl + `?category_id=${i.value}&pageSize=20`;
        this.getDetailsData(this.urlReset);
        this.urlval = i.value;
        return;
      } else if (this.hotrecflag) {
        this.urlReset = this.searchDeatialUrl.replace(/\d+/g, i.value);
        this.getDetailsData(this.urlReset);
        this.urlval = i.value;
        return;
      }

      this.urlReset = this.searchDeatialUrl.replace(/\d+/g, i.value);
      this.getDetailsData(this.urlReset);
    },
    getMore() {
      if (this.searchDetailObj) {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.searchDetailObj) {
          if (this.detailpage > this.searchDetailObj.page_size) {
            this.$store.commit("changeshowrecloading", false);
            return;
          } else {
            this.sendTime = setTimeout(() => {
              if (
                document.documentElement.scrollTop +
                  document.documentElement.clientHeight +
                  20 >
                document.documentElement.offsetHeight
              ) {
                this.$store.commit("changeshowrecloading", true);
                this.$store.commit("changedetailpage");
              }
            }, 500);
          }
        } else {
          this.sendTime = setTimeout(() => {
            if (
              document.documentElement.scrollTop +
                document.documentElement.clientHeight +
                20 >
              document.documentElement.offsetHeight
            ) {
              this.$store.commit("changeshowrecloading", true);
              this.$store.commit("changedetailpage");
            }
          }, 500);
        }
      }
    },
    toVideo(v) {
      this.$router.push("/videoplay");
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
    },
    getDetailsData(n, p) {
      if (p) {
        if (this.hotflag) {
          if (!this.urlval) {
            this.axios
              .get(`${n}?category_id=0&offset=${p}&pageSize=20`)
              .then((res) => {
                if (res.data.data) {
                  this.$store.commit("changesearchDetailArr", [
                    ...this.searchDetailArr,
                    ...res.data.data.list,
                  ]);
                  this.$store.commit("changeshowrecloading", true);
                }
              });
            return;
          }
          this.axios.get(`${n}&offset=${p}`).then((res) => {
            this.$store.commit("changesearchDetailArr", [
              ...this.searchDetailArr,
              ...res.data.data.list,
            ]);
            this.$store.commit("changeshowrecloading", true);
          });
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
          return;
        } else if (this.hotrecflag) {
          this.axios.get(`${n}&page=${p}`).then((res) => {
            this.$store.commit("changesearchDetailArr", [
              ...this.searchDetailArr,
              ...res.data.data.list,
            ]);
            this.$store.commit("changeshowrecloading", true);
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
          return;
        }

        this.axios.get(`${n}&page=${p}`).then((res) => {
          this.$store.commit("changesearchDetailArr", [
            ...this.searchDetailArr,
            ...res.data.data.list,
          ]);
          this.$store.commit("changeshowrecloading", true);
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
      } else {
        this.$store.commit("changedetailpage", 1);
        if (this.hotflag) {
          this.axios.get(`${n}`).then((res) => {
            this.$store.commit("changesearchDetailObj", res.data.data);
            this.$store.commit("changesearchDetailArr", res.data.data.list);
          });
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
          return;
        } else if (this.hotrecflag) {
          this.axios.get(`${n}&page=1`).then((res) => {
            this.$store.commit("changesearchDetailObj", res.data.data);
            this.$store.commit("changesearchDetailArr", res.data.data.list);
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
          return;
        }

        this.axios.get(`${n}&page=1`).then((res) => {
          this.$store.commit("changesearchDetailObj", res.data.data);
          this.$store.commit("changesearchDetailArr", res.data.data.list);
          let reg = /\d+/g;
          let ret = reg.exec(this.searchDeatialUrl);
          this.searchDeaHead = this.searchDetailObj.header.categories.filter(
            (el) => el.value == ret[0]
          );
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
      }
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getDetailsData(this.searchDeatialUrl);
    },
  },
  watch: {
    searchDeatialUrl(n) {
      this.searchDeaHead = null;
      this.searchDeatialUrlArr = JSON.stringify({
        NameUrl: n,
      });
      localStorage.setItem("DeatialUrl", this.searchDeatialUrlArr);
      this.getDetailsData(n);
    },
    detailpage(n) {
      if (this.hotflag && this.urlval) {
        this.urlReset =
          this.searchDeatialUrl + `?category_id=${this.urlval}&pageSize=20`;
        this.getDetailsData(this.urlReset, n);
        return;
      } else if (this.hotrecflag && this.urlval) {
        this.urlReset = this.searchDeatialUrl.replace(/\d+/g, this.urlval);
        this.getDetailsData(this.urlReset, n);
        return;
      }
      this.getDetailsData(this.searchDeatialUrl, n);
    },
  },
};
</script>

<style lang="less" scoped>
.SearchDetails {
  width: 100%;
  overflow: hidden;
  padding-top: 23vw;
  background-color: #fff;
  .title-Deatials {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 13vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5vw;
    margin-bottom: 2vw;
    z-index: 200;
    background-color: #fff;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
      position: absolute;
      bottom: 0;
      transform: scaleX(1.5);
    }
    .back {
      z-index: 25;
      span {
        width: 4.5vw;
        height: 4.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(@/assets/iconimg/07.png) no-repeat center;
        background-size: contain;
        transform: rotate(180deg);
      }
    }
    .tits {
      span {
        font-family: "siyuanMed";
        font-size: 4.5vw;
        color: #1a1a1a;
      }
    }
  }
  .head {
    width: 100%;
    position: fixed;
    top: 13vw;
    left: 0;
    padding: 2vw 5vw;
    z-index: 22;
    background-color: #fff;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.3);
      position: absolute;
      bottom: 0;
      transform: scaleX(1.5);
    }
    .head-li {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }
      .deta {
        flex-shrink: 0;
        padding: 1.5vw 3.5vw;
        background-color: #f6f6f6;
        font-size: 1.5vw;
        font-family: "siyuanMed";
        color: #a0a0a0;
        list-style: none;
        border-radius: 4px;
        margin-right: 2vw;
        &:last-child {
          margin-right: 8vw;
        }
        &.active {
          color: #d74f34;
        }
      }
    }
    .more-li {
      position: absolute;
      height: 100%;
      right: 5vw;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      padding-left: 1vw;
      padding-right: 0.3vw;
      transform: translateX(0.5vw);
      box-shadow: -10px 0 10px rgba(255, 255, 255, 0.8);
      span {
        flex-shrink: 0;
        display: inline-block;
        width: 4.5vw;
        height: 4.5vw;
        background: url(@/assets/iconimg/lA.png) no-repeat center;
        background-size: contain;
      }
    }
  }
  .nr-li {
    width: 100%;
    background-color: #fff;
    position: relative;
    z-index: 12;
    .sm {
      padding: 0 5vw;
      padding-top: 5vw;
    }
  }
}
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  span {
    display: inline-block;
    font-family: "siyuanMed";
    font-size: 2.5vw;
    color: #1b1b1b;
    padding: 1.5vw;
  }
}
</style>

<style lang="less" scoped>
.tit-van {
  padding: 3vw 5vw;
  padding-top: 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    transform: scaleX(1.5);
    height: 1px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }
  .wz {
    color: #1a1a1a;
    font-family: "siyuanMed";
    font-size: 4vw;
  }
  .close {
    display: inline-block;
    width: 3.5vw;
    height: 3.5vw;
    background: url(@/assets/iconimg/8E.png) no-repeat center;
    background-size: contain;
  }
}
.vants-li {
  width: 100%;
  padding: 0 5vw;
  padding-top: 10vw;
  .detas {
    display: inline-block;
    padding: 1.5vw 3.5vw;
    background-color: #f6f6f6;
    font-size: 1.5vw;
    font-family: "siyuanMed";
    color: #1a1a1a;
    list-style: none;
    border-radius: 4px;
    margin-right: 3vw;
    margin-bottom: 3vw;
    &.active {
      color: #d74f34;
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.van-popup--top {
  z-index: 199 !important;
}
/deep/.van-overlay {
  z-index: 198 !important;
}
</style>