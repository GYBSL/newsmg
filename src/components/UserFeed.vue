<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="userfeed">
      <div class="libox" ref="libox">
        <template v-for="item in userfeedArr ? userfeedArr : ''">
          <FeedCard
            :key="item.id"
            :item="item"
            :id="item.articles[0].id"
            :ref="item.id"
          ></FeedCard>
        </template>
      </div>

      <div class="loading">
        <span v-if="showrecloading">加载中...</span>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { mapState } from "vuex";
import FeedCard from "@/components/FeedCard.vue";

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
    FeedCard,
  },
  computed: {
    ...mapState([
      "showrecloading",
      "showrecloading",
      "cardsVideoId",
      "cardsVideoObj",
      "showVideoCarePost",
      "playingCardVideoNode",
      "userfeedArr",
      "userfeedObj",
    ]),
  },
  created() {
    this.getCareData();
  },
  mounted() {
    window.addEventListener("scroll", this.getCareVideo);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.getCareVideo);
      vm.getCareData();
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getCareVideo);
    next();
  },
  methods: {
    getCareData() {
      this.axios.get(`https://apis.netstart.cn/xpc/feed`).then((res) => {
        this.$store.commit("changeuseruserfeedObj", res.data.data.list[0].data);
        this.$store.commit(
          "changeuserfeedArr",
          res.data.data.list[0].data.list
        );
        this.$store.commit("changeapploading", false);
        if (this.isLoadAgain) {
          this.isLoading = false;
          this.isLoadAgain = false;
        }
      });
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getCareData();
    },
    getCareVideo() {
      if (this.$route.path == "/home/feed") {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        this.oldtop = document.documentElement.scrollTop;

        if (this.newtop < this.oldtop) {
          if (this.userfeedArr) {
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
          if (this.userfeedArr) {
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

          if (
            this.playingCardVideoNode[0].previousElementSibling &&
            this.playingCardVideoNode[0].previousElementSibling.children[0]
              .children[1]
          ) {
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
  },
};
</script>

<style lang="less" scoped>
.userfeed {
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