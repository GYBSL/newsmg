<template>
  <div class="CkCareChoice">
    <div class="title-Deatials">
      <div class="back">
        <span @click="$router.back()"></span>
      </div>
      <div class="tits">
        <span>{{ hottitle ? hottitle : "" }}</span>
      </div>
      <div></div>
    </div>

    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="mustSee">
        <div class="libox" ref="libox">
          <template
            v-for="(item, index) in searchDetailArrs ? searchDetailArrs : ''"
          >
            <HomeCardTitle
              v-if="item ? item.type == 'mTitle' : false"
              :key="index"
              >{{ item ? item.model.title : "" }}</HomeCardTitle
            >
            <HomeCards
              :key="item.id"
              v-if="item ? item.type == 'uiBigCard' : false"
              :item="item"
              :id="item.children[0].model.resource.id"
              :ref="item.id"
            ></HomeCards>
          </template>
        </div>

        <div class="loading">
          <span v-if="showrecloading">加载中...</span>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HomeCards from "@/components/HomeCards.vue";
import HomeCardTitle from "@/components/HomeCardTitle.vue";

export default {
  data() {
    return {
      isLoading: false,
      isLoadAgain: false,
      oldtop: null,
      newtop: null,
      carsflag: true,
      nodeindex: true,
      videonodeindex: null,
    };
  },
  components: {
    HomeCards,
    HomeCardTitle,
  },
  computed: {
    ...mapState([
      "searchDeatialUrls",
      "detailpage",
      "hottitle",
      "searchDetailArrs",
      "searchDetailObjs",
      "showrecloading",
      "showrecloading",
      "cardsVideoId",
      "cardsVideoObj",
      "showVideoCarePost",
      "playingCardVideoNode",
    ]),
  },
  created() {
    if (this.$route.path == "/ckcarechoice") {
      if (this.searchDeatialUrls) {
        this.searchDeatialUrlArr = JSON.stringify({
          NameUrl: this.searchDeatialUrls,
        });
        localStorage.setItem("DeatialUrl", this.searchDeatialUrlArr);
        this.getDetailsData(this.searchDeatialUrls);
      } else {
        let DeatialUrl = JSON.parse(localStorage.getItem("DeatialUrl"));
        if (DeatialUrl.NameUrl == `https://apis.netstart.cn/xpc/home/vmovier`) {
          this.$store.commit("changehottitle", "场库精选");
        }
        this.getDetailsData(DeatialUrl.NameUrl);
        this.$store.commit("changesearchDeatialUrls", DeatialUrl.NameUrl);
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.getMoreRec);
    window.addEventListener("scroll", this.getCareVideo);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.getMoreRec);
      window.addEventListener("scroll", vm.getCareVideo);
      vm.getDetailsData(vm.searchDeatialUrls);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getMoreRec);
    window.removeEventListener("scroll", this.getCareVideo);
    next();
  },
  methods: {
    getMoreRec() {
      if (this.$route.path == "/ckcarechoice") {
        if (this.sendTimes) {
          clearTimeout(this.sendTimes);
        }

        if (this.searchDetailArrs) {
          this.sendTimes = setTimeout(() => {
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
    onRefresh() {
      this.isLoadAgain = true;
      this.getDetailsData(this.searchDeatialUrls);
    },
    getDetailsData(n, p) {
      if (p) {
        this.axios.get(`${n}?offset=${p}&pageSize=20`).then((res) => {
          this.$store.commit("changesearchDetailArrs", [
            ...this.searchDetailArrs,
            ...res.data.data.children,
          ]);
          this.$store.commit("changeshowrecloading", false);
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
      } else {
        this.$store.commit("changedetailpage", 1);

        this.axios.get(`${n}?offset=1&pageSize=20`).then((res) => {
          this.$store.commit("changesearchDetailObjs", res.data.data);
          this.$store.commit("changesearchDetailArrs", res.data.data.children);

          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
      }
    },
    getCareVideo() {
      if (this.$route.path == "/ckcarechoice") {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        this.oldtop = document.documentElement.scrollTop;

        if (this.newtop < this.oldtop) {
          if (this.searchDetailArrs) {
            this.sendTime = setTimeout(() => {
              let childrens = [...this.$refs.libox.children];
              childrens = childrens.filter((o) => o.childElementCount != 0);
              childrens.forEach((el, index) => {
                if (
                  document.documentElement.scrollTop >
                  el.children[0].childNodes[1].offsetTop
                ) {
                  if (childrens) {
                    if (index + 1 <= childrens.length) {
                      this.$store.commit("changeshowVideoCarePost", true);
                      this.$store.commit(
                        "changecardsVideoId",
                        childrens[index + 1].id
                      );
                      this.carsflag = true;
                      this.nodeindex = true;
                      this.videonodeindex = index + 1;
                      this.$store.commit(
                        "changeplayingCardVideoNode",
                        childrens
                      );
                    } else {
                      this.$store.commit("changeshowVideoCarePost", true);
                      this.$store.commit(
                        "changecardsVideoId",
                        childrens[index].id
                      );
                      this.nodeindex = false;
                      this.carsflag = true;
                      this.videonodeindex = index;
                      this.$store.commit(
                        "changeplayingCardVideoNode",
                        childrens
                      );
                    }
                  }
                }
              });
            }, 800);
          }
        } else {
          if (this.searchDetailArrs) {
            this.sendTime = setTimeout(() => {
              let childrens = [...this.$refs.libox.children];
              childrens = childrens.filter((o) => o.childElementCount != 0);
              let botChildren = [];
              childrens.forEach((el) => {
                if (
                  document.documentElement.scrollTop +
                    document.documentElement.clientHeight <
                  el.children[0].childNodes[1].offsetTop +
                    el.children[0].childNodes[1].offsetHeight +
                    100
                ) {
                  botChildren.push(el);
                }
              });
              this.$store.commit("changeshowVideoCarePost", true);
              if (botChildren[0].previousElementSibling) {
                this.$store.commit(
                  "changecardsVideoId",
                  botChildren[0].previousElementSibling.id
                );
              } else {
                return;
              }
              this.carsflag = false;
              this.$store.commit("changeplayingCardVideoNode", botChildren);
            }, 800);
          }
        }

        setTimeout(() => {
          this.newtop = document.documentElement.scrollTop;
        }, 10);
      }
    },
    async getVideoData(n) {
      if (n) {
        await this.axios
          .get(`https://apis.netstart.cn/xpc/article/${n}`)
          .then((res) => {
            this.$store.dispatch("commitcardsVideoObj", {
              data: res.data.data,
            });
          });
        if (this.carsflag) {
          if (this.nodeindex) {
            this.playingCardVideoNode.forEach((el) => {
              el.children[0].children[1].children[0].style.display = "block";

              if (el.children[0].children[1].children[1].src != "") {
                el.children[0].children[1].children[1].pause();
              }
            });

            if (this.playingCardVideoNode[this.videonodeindex]) {
              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[0].style.display = "none";

              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[1].src = this.cardsVideoObj
                ? this.cardsVideoObj.video.content.progressive[
                    this.cardsVideoObj.video.content.progressive.length - 1
                  ].https_url
                  ? this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].https_url
                  : this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].url
                : "";
              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[1].play();
            }
          } else {
            this.playingCardVideoNode.forEach((el) => {
              el.children[0].children[1].children[0].style.display = "block";
              if (el.children[0].children[1].children[1].src != "") {
                el.children[0].children[1].children[1].pause();
              }
            });

            if (this.playingCardVideoNode[this.videonodeindex]) {
              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[0].style.display = "none";

              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[1].src = this.cardsVideoObj
                ? this.cardsVideoObj.video.content.progressive[
                    this.cardsVideoObj.video.content.progressive.length - 1
                  ].https_url
                  ? this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].https_url
                  : this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].url
                : "";

              this.playingCardVideoNode[
                this.videonodeindex
              ].children[0].children[1].children[1].play();
            }
          }
        } else {
          let nodearr = [...this.$refs.libox.children];
          nodearr = nodearr.filter((o) => o.childElementCount != 0);
          nodearr.forEach((el) => {
            el.children[0].children[1].children[0].style.display = "block";
            if (el.children[0].children[1].children[1].src != "") {
              el.children[0].children[1].children[1].pause();
            }
          });

          if (this.playingCardVideoNode[0].previousElementSibling) {
            this.playingCardVideoNode[0].previousElementSibling.children[0].children[1].children[0].style.display =
              "none";

            this.playingCardVideoNode[0].previousElementSibling.children[0].children[1].children[1].src =
              this.cardsVideoObj
                ? this.cardsVideoObj.video.content.progressive[
                    this.cardsVideoObj.video.content.progressive.length - 1
                  ].https_url
                  ? this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].https_url
                  : this.cardsVideoObj.video.content.progressive[
                      this.cardsVideoObj.video.content.progressive.length - 1
                    ].url
                : "";
            this.playingCardVideoNode[0].previousElementSibling.children[0].children[1].children[1].play();
          }
        }
      }
    },
  },
  watch: {
    cardsVideoId(n) {
      this.getVideoData(n);
    },
    detailpage(n) {
      this.getDetailsData(this.searchDeatialUrls, n);
    },
  },
};
</script>


<style lang="less" scoped>
.mustSee {
  width: 100%;
  padding: 0 3vw;
  padding-top: 3vw;
  padding-bottom: 60px;
  background-color: #f7f7f7;
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
</style>

<style lang="less" scoped>
.CkCareChoice {
  width: 100%;
  padding-top: 13vw;
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
}
</style>