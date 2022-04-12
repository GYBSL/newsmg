<template>
  <div class="userworks">
    <ul class="smv" v-if="worksItem">
      <li
        class="smv-li"
        v-for="(item, index) in worksItem ? worksItem : ''"
        :key="index"
        :item="item"
        @click.stop="toVideo(item ? item.resource : null)"
      >
        <div
          class="pic"
          :style="{
            backgroundImage: `url(${item ? item.resource.cover : ''})`,
          }"
        >
          <span>{{
            (item ? item.resource.duration : "") | formatDuration
          }}</span>
        </div>
        <div class="video-msg">
          <p class="title">
            <span class="tit">{{ item ? item.resource.title : "" }}</span>
            <span class="time">
              {{ (item ? item.resource.publish_time : "") | formatTime }}
            </span>
          </p>
          <div class="count">
            <div class="left">
              <span class="like"
                >喜欢
                {{ (item ? item.resource.count.count_like : "") | formatCount }}
                ·
              </span>
              <span class="bf"
                >播放
                {{ (item ? item.resource.count.count_view : "") | formatCount }}
              </span>
            </div>
            <span
              class="more"
              @click.stop="changeShowShare(item ? item.resource.id : null)"
            ></span>
          </div>
        </div>
      </li>
      <div class="loading">
        <span v-if="showworksloading">加载中...</span>
        <span v-if="showend" class="end"></span>
      </div>
    </ul>

    <!-- vant分享组件 -->
    <van-share-sheet
      v-model="showShare"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
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
      videoId: null,
    };
  },
  computed: {
    ...mapState(["userId", "localuserId", "worksItem", "showworksloading",'showend']),
  },
  methods: {
    toVideo(v) {
      this.$router.push("/videoplay");
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
    },
    changeShowShare(i) {
      if (i) {
        this.videoId = i;
      }
      this.showShare = true;
    },
    onSelect(option) {
      this.showShare = false;
      let uu = `https://www.xinpianchang.com/a${this.videoId}`;
      if (option.name == "复制链接" && this.userId) {
        this.$copyText(uu).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
      } else if (option.name == "二维码" && this.userId) {
        // this.axios.get(`http://apis.juhe.cn/qrcode/api?key=677b6e81658e27a43b42da8bddd82126&type=2&fgcolor=00b7ee&w=90&m=5&text=${this.shareVideoItem.children[0].model.resource.web_url}`).then(res=>{
        //   console.log(res);
        //   // this.$store.commit("changecodeData",)
        // })
        console.log("ewm");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.userworks {
  width: 100%;
  padding: 0 5vw;
  .smv {
    width: 100%;
    z-index: 19;
    position: relative;
    background-color: #fff;
    padding-bottom: 5vw;
    margin-top: 5vw;
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
      .end{
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/k5.png) no-repeat center;
          background-size: contain;
      }
    }
    .smv-li {
      width: 100%;
      height: 25vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5vw;
      .pic {
        width: 48%;
        height: 100%;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 2vw;
        span {
          display: inline-block;
          width: 10vw;
          height: 5vw;
          font-size: 3vw;
          color: #fff;
          position: absolute;
          bottom: 0;
          right: 3vw;
        }
      }
      .video-msg {
        width: 48%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;
        padding: 1vw 0;
        justify-content: space-between;
        .title {
          width: 100%;
          .tit {
            display: inline-block;
            width: 100%;
            font-family: "siyuanMed";
            font-size: 4vw;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: auto;
            color: #191919;
          }
          .time {
            font-size: 2vw;
            color: #a3a3a3;
          }
        }
        .count {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .left {
            font-size: 1.5vw;
            color: #5e5e5e;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .more {
            display: inline-block;
            width: 4vw;
            height: 4vw;
            background: url(@/assets/iconimg/more.svg) no-repeat center;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>