<template>
  <div class="div-li">
    <template>
      <li
        v-if="midChildren ? midChildren.type == 'uiMiddleCard' : false"
        @click="
          toVideo(midChildren ? midChildren.children[0].model.resource : null)
        "
        class="mid-lis"
      >
        <div class="mask-unlike" v-if="showUnlike" @click.stop="">
          <div
            class="mask-mask"
            :style="{
              backgroundImage: `url(${
                midChildren ? midChildren.children[0].model.resource.cover : ''
              })`,
            }"
          ></div>
          <p class="bq">
            <span></span>
          </p>
          <p class="bgxq">不感兴趣</p>
          <p class="cut">将减少此类内容推荐</p>
        </div>
        <div class="tp">
          <img
            :src="
              midChildren ? midChildren.children[0].model.resource.cover : ''
            "
            alt=""
            class="vanImage"
          />
          <div class="videoMsg">
            <div class="total">
              <span class="bf">
                <i class="iconfont icon-yanjing"></i>
                {{
                  midChildren.children[0].model.resource.count.count_view
                    | formatCount
                }}
              </span>
              <span class="like">
                <i class="iconfont icon-dianzan1"></i>
                {{
                  midChildren.children[0].model.resource.count.count_like
                    | formatCount
                }}
              </span>
            </div>
            <div class="TotalTime">
              <span>{{
                midChildren.children[0].model.resource.duration | formatDuration
              }}</span>
            </div>
          </div>
        </div>
        <div class="title">
          <p>
            {{
              midChildren ? midChildren.children[0].model.resource.title : ""
            }}
          </p>
          <div class="author">
            <span class="au">{{
              midChildren
                ? midChildren.children[0].model.resource.author.userinfo
                    .username
                : ""
            }}</span>
            <span class="more" @click.stop="changeShowShare"></span>
          </div>
        </div>
      </li>
    </template>

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
          { name: "不感兴趣", icon: require("@/assets/iconimg/unlike.png") },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      showUnlike: false,
    };
  },
  props: {
    midChildren: [Object, null],
  },
  computed: {
    ...mapState(["videoId", "shareVideoItem", "codeData"]),
  },
  methods: {
    toVideo(v) {
      this.$router.push("/videoplay");
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
    },
    onSelect(option) {
      this.showShare = false;
      if (option.name == "复制链接" && this.shareVideoItem) {
        this.$copyText(
          this.shareVideoItem.children[0].model.resource.web_url
        ).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
      } else if (option.name == "不感兴趣" && this.shareVideoItem) {
        this.showUnlike = true;
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
      this.$store.commit("changeshareVideoItem", this.midChildren);
    },
  },
};
</script>

<style lang="less" scoped>
.div-li {
  width: 49%;
  .mid-lis {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    position: relative;
    z-index: 0;
    .mask-unlike {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow: hidden;
      .mask-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        background-color: rgba(0, 0, 0, 0.9);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        transform: scale(2);
      }
      .bq {
        width: 100%;
        text-align: center;
        line-height: 5vw;
        margin-top: -5vw;
        z-index: 2;
        span {
          display: inline-block;
          width: 10vw;
          height: 10vw;
          background: url(@/assets/iconimg/Au.png) no-repeat center;
          background-size: contain;
        }
      }
      .bgxq {
        width: 100%;
        text-align: center;
        color: #fdfdfb;
        font-size: 0.85rem;
        margin-bottom: 1vw;
        z-index: 2;
      }
      .cut {
        width: 100%;
        text-align: center;
        color: #f3f2f2;
        font-size: 0.6rem;
        z-index: 2;
      }
    }
    .tp {
      width: 100%;
      overflow: hidden;
      position: relative;
      &::before {
        display: block;
        width: 100%;
        padding-bottom: 56.25%;
        content: "";
      }
      .vanImage {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .videoMsg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 2.2vw;
        padding: 1.33333vw 2.8vw;
        display: flex;
        justify-content: space-between;
        color: #fff;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
        .total {
          display: flex;
          .bf {
            display: flex;
            align-items: center;
            margin-right: 1.6vw;
            i {
              margin-right: 1.33333vw;
              font-size: 3.26667vw;
              font-style: normal;
              font-family: iconfont !important;
            }
          }
          .like {
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            i {
              margin-right: 1.33333vw;
              font-size: 3.26667vw;
              font-style: normal;
              font-family: iconfont !important;
            }
          }
        }
        .TotalTime {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
      }
    }
    .title {
      width: 100%;
      padding: 0 2.8vw;
      padding-bottom: 10px;
      box-sizing: border-box;
      font-family: "siyuanMed";
      p {
        font-size: 0.85rem;
        color: #151515;
        margin-top: 1.8vw;
        width: 100%;
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .author {
        width: 100%;
        position: relative;
        .au {
          width: 60%;
          font-size: 0.6rem;
          color: #a0a0a0;
          padding-top: 2px;
          box-sizing: border-box;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .more {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url(@/assets/iconimg/more.svg) no-repeat center;
          background-size: contain;
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translateX(1vw);
        }
      }
    }
  }
}
</style>