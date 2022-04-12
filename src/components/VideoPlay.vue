<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="videoplay-bg">
      <div class="back">
        <span @click="$router.back()"></span>
      </div>
      <div class="videoMore">
        <span
          @click.stop="changeShowShare"
          @touchstart.stop="showAct = true"
          @touchend.stop="showAct = false"
        ></span>
        <span class="active" v-if="showAct"></span>
      </div>
      <div class="vid" @touchstart="showMaskMet" @touchend="hideMask">
        <div
          class="poster-box"
          v-if="showPoster"
          :style="{ backgroundImage: `url(${videoPoster ? videoPoster : ''})` }"
        >
          <van-loading class="loading-video" />
        </div>
        <div class="control-mask" v-show="showMask" ref="conmask">
          <div class="mid">
            <span class="start" v-if="showSp" @click.stop="changeStart"></span>
            <span class="pause" v-else @click.stop="changePause"></span>
          </div>
        </div>
        <div class="video-ownbox" v-if="showVideoPlay">
          <video
            ref="video"
            id="palyingVideo"
            autoplay
            width="100vw"
            :src="
              videoIfoObj
                ? videoIfoObj.video.content.progressive[
                    videoIfoObj.video.content.progressive.length - 1
                  ].https_url
                  ? videoIfoObj.video.content.progressive[
                      videoIfoObj.video.content.progressive.length - 1
                    ].https_url
                  : videoIfoObj.video.content.progressive[
                      videoIfoObj.video.content.progressive.length - 1
                    ].url
                : ''
            "
          ></video>
        </div>
      </div>

      <VideoDetial></VideoDetial>

      <!-- vant分享组件 -->
      <van-share-sheet
        v-model="showShare"
        :options="options"
        @select="onSelect"
      />
    </div>
  </van-pull-refresh>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import VideoDetial from "@/components/VideoDetial.vue";

let timetwo;
export default {
  data() {
    return {
      isLoading: false,
      isLoadAgain: false,
      showPoster: true,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      showAct: false,
      showMask: false,
      showSp: false,
      forPause: true,
      videoPlayingId: null,
      player: null,
      showVideoPlay: false,
    };
  },
  components: {
    VideoDetial,
  },
  created() {
    this.showVideoPlay = true;
    if (this.videoId) {
      this.$store.commit(
        "changelocalVideoArr",
        JSON.stringify({
          videoNameId: this.videoId,
        })
      );
      localStorage.setItem("localVideo", this.localVideoArr);
      this.getVideoIfo(this.videoId);
      this.getCommentData(this.videoId, this.compage);
    } else {
      this.videoPlayingId = JSON.parse(
        localStorage.getItem("localVideo")
      ).videoNameId;
      this.getVideoIfo(this.videoPlayingId);
      this.$store.commit("changevideoId", this.videoPlayingId);
      this.getCommentData(this.videoId, this.compage);
    }
  },
  mounted() {},
  computed: {
    ...mapState([
      "videoId",
      "videoIfoObj",
      "localVideoArr",
      "videoPoster",
      "shareVideoItem",
      "compage",
      "videoComments",
      "videoComTotalObj",
      "showComloading",
    ]),
    routeSrc() {
      return this.$route.path;
    },
  },
  methods: {
    getVideoIfo(v) {
      this.axios
        .get(`https://apis.netstart.cn/xpc/article/${v ? v : ""}`)
        .then((res) => {
          if (res.data.data) {
            this.$store.commit("changevideoIfoObj", res.data.data);
            this.$store.commit("changeshareVideoItem", this.videoIfoObj);

            this.getNextVideo(v);

            if (this.videoId) {
              this.$store.commit(
                "changelocalVideoArr",
                JSON.stringify({
                  videoNameId: this.videoId,
                })
              );
              localStorage.setItem("localVideo", this.localVideoArr);
            }

            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }

            this.$refs.video.oncanplay = () => {
              if(this.$route.path!='/videoplay'){
                this.$refs.video.pause()
              }
              this.showPoster = false;
            };
          }

          this.$store.commit("changeapploading", false);
        });
    },
    getNextVideo(v) {
      this.axios
        .get(`https://apis.netstart.cn/xpc/article/${v}/next`)
        .then((res) => {
          this.$store.commit("changesimialVideo", res.data.data);
        });
    },
    onRefresh() {
      let videoPlayingId = JSON.parse(
        localStorage.getItem("localVideo")
      ).videoNameId;
      this.isLoadAgain = true;
      this.getVideoIfo(videoPlayingId);
      this.getNextVideo(videoPlayingId);
      this.$store.commit("changevideoComTotalObj", null);
      this.getCommentData(this.videoId, this.compage);
    },
    onSelect(option) {
      this.showShare = false;
      if (option.name == "复制链接" && this.shareVideoItem) {
        this.$copyText(
          this.shareVideoItem ? this.shareVideoItem.web_url : ""
        ).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
      } else if (option.name == "二维码" && this.shareVideoItem) {
        // this.axios.get(`http://apis.juhe.cn/qrcode/api?key=677b6e81658e27a43b42da8bddd82126&type=2&fgcolor=00b7ee&w=90&m=5&text=${this.shareVideoItem.children[0].model.resource.web_url}`).then(res=>{
        //   console.log(res);
        //   // this.$store.commit("changecodeData",)
        // })
        console.log("ewm");
      }
    },
    changeShowShare() {
      this.showShare = true;
    },
    showMaskMet() {
      let timefor;
      if (timefor) {
        clearTimeout(timefor);
      }
      timefor = setTimeout(() => {
        this.showMask = true;
      }, 200);
    },
    hideMask() {
      if (timetwo) {
        clearTimeout(timetwo);
      }
      if (!this.showSp) {
        timetwo = setTimeout(() => {
          this.showMask = false;
        }, 3000);
      }
    },
    changeStart() {
      this.$refs.video.play();
      this.showSp = false;

      clearTimeout(timeone);
      if (timetwo) {
        clearTimeout(timetwo);
      }
      let timeone = setTimeout(() => {
        this.hideMask();
      }, 200);
    },
    changePause() {
      this.$refs.video.pause();
      this.showSp = true;
      this.showMask = true;

      if (timetwo) {
        clearTimeout(timetwo);
      }
    },
    getCommentData(n, page) {
      if (this.videoComTotalObj) {
        if (
          page >
          Math.ceil(
            this.videoComTotalObj.total / this.videoComTotalObj.page_size
          )
        ) {
          this.$store.commit("changeshowComloading", false);
          return;
        } else {
          this.axios
            .get(
              `https://apis.netstart.cn/xpc/comments?resource_id=${n}&type=article&page=${page}`
            )
            .then((res) => {
              if (!this.videoComTotalObj) {
                this.$store.commit("changevideoComments", res.data.data.list);
              } else {
                this.$store.commit("changevideoComments", [
                  ...this.videoComTotalObj.list,
                  ...res.data.data.list,
                ]);
              }
              this.$store.commit("changeshowComloading", false);
            });
        }
      } else {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/comments?resource_id=${n}&type=article&page=${page}`
          )
          .then((res) => {
            this.$store.commit("changevideoComments", res.data.data.list);
            this.$store.commit("changevideoComTotalObj", res.data.data);
            this.$store.commit("changeshowComloading", false);
          });
      }
    },
  },
  watch: {
    videoId(n) {
      this.showSp = false;
      this.showPoster = true;
      this.getNextVideo(n);
      this.getCommentData(n, this.compage);

      this.getVideoIfo(n);
      this.$store.commit("changevideoId", n);

      this.$store.commit("changevideoComTotalObj", null);
      this.getCommentData(n, 1);
    },
    routeSrc(n) {
      this.$refs.video.pause();
      if (n != "/videoplay") {
        return;
      } else {
        if (!this.showPoster) {
          this.showSp = true;
        }
      }
    },
    compage(n) {
      this.getCommentData(this.videoId, n);
    },
  },
};
</script>

<style lang="less" scoped>
.videoplay-bg {
  width: 100%;
  position: relative;
  z-index: 19;
  .back {
    position: fixed;
    top: 30px;
    left: 15px;
    z-index: 22;
    span {
      display: inline-block;
      width: 4vw;
      height: 4vw;
      background: url(@/assets/iconimg/back.svg) no-repeat center;
      background-size: contain;
    }
  }
  .videoMore {
    position: fixed;
    top: 30px;
    right: 15px;
    z-index: 22;
    width: 5vw;
    height: 5vw;
    span {
      display: inline-block;
      width: 5vw;
      height: 5vw;
      background: url(@/assets/iconimg/videoMore.svg) no-repeat center;
      background-size: contain;
      z-index: 23;
      position: absolute;
      top: 0;
      left: 0;
    }
    .active {
      display: inline-block;
      position: absolute;
      z-index: 22;
      top: 0;
      left: 0;
      width: 5vw;
      height: 5vw;
      background-color: rgba(255, 255, 255, 0.95);
      filter: blur(2vw);
    }
  }
  .vid {
    width: 100%;
    height: 60vw;
    background-color: #000000;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    overflow: hidden;
    cursor: pointer;
    .control-mask {
      width: 100%;
      height: 60vw;
      // background-color: rgba(158, 94, 94, 0.4);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 19;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .mid {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        .start {
          display: inline-block;
          width: 10vw;
          height: 10vw;
          background: url(@/assets/iconimg/video-start.svg) no-repeat center;
          background-size: contain;
        }
        .pause {
          display: inline-block;
          width: 10vw;
          height: 10vw;
          background: url(@/assets/iconimg/video-pause.svg) no-repeat center;
          background-size: contain;
        }
      }
    }
    .poster-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 20;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .video-ownbox {
      width: 100%;
      video {
        width: 100%;
        z-index: 18;
      }
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.van-pull-refresh__track {
  z-index: 19;
}
</style>