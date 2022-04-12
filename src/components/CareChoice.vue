<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="carechoice">
      <ul class="ul-cho" v-if="carechoiceObj">
        <HomeCardTitle>{{
          carechoiceObj ? carechoiceObj.children[0].model.title : ""
        }}</HomeCardTitle>

        <div class="libox" ref="libox">
          <template v-for="item in carechoiceObj ? carechoiceObj.children : ''">
            <HomeCards
              :key="item.id"
              v-if="item ? item.type == 'uiBigCard' : false"
              :item="item"
              :id="item.children[0].model.resource.id"
              :ref="item.id"
            ></HomeCards>
          </template>
        </div>
      </ul>
    </div>
  </van-pull-refresh>
</template>

<script>
import HomeCards from "@/components/HomeCards.vue";
import HomeCardTitle from "@/components/HomeCardTitle.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";

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
      "carechoiceObj",
      "cardsVideoId",
      "cardsVideoObj",
      "showVideoCarePost",
      "playingCardVideoNode",
    ]),
  },
  created() {
    this.getCareData();
  },
  mounted() {
    window.addEventListener("scroll", this.getCareVideo);
    this.$nextTick(() => {
      if (this.carechoiceObj) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/article/${this.carechoiceObj.children[1].children[0].model.resource.id}`
          )
          .then((res) => {
            this.$store.dispatch("commitcardsVideoObj", {
              data: res.data.data,
            });
            this.$store.commit("changeshowVideoCarePost", false);
          });
        this.$refs.libox.children[0].children[0].children[1].children[0].src =
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
      }
    });
  },
  methods: {
    ...mapActions([""]),
    getCareData() {
      this.axios
        .get(`https://apis.netstart.cn/xpc/home/selection`)
        .then((res) => {
          this.$store.commit("changecarechoiceObj", res.data.data);
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
      if (this.$route.path == "/home/selection") {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        this.oldtop = document.documentElement.scrollTop;

        if (this.newtop < this.oldtop) {
          if (this.carechoiceObj) {
            this.sendTime = setTimeout(() => {
              let childrens = [...this.$refs.libox.children];
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
          if (this.carechoiceObj) {
            this.sendTime = setTimeout(() => {
              let childrens = [...this.$refs.libox.children];
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
              this.$store.commit(
                "changecardsVideoId",
                botChildren[0].previousElementSibling.id
              );
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.getCareVideo);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getCareVideo);
    next();
  },
  watch: {
    cardsVideoId(n) {
      this.getVideoData(n);
    },
  },
};
</script>

<style lang="less" scoped>
.carechoice {
  width: 100%;
  padding: 0 3vw;
  background-color: #f7f7f7;
  padding-bottom: 70px;
}
</style>