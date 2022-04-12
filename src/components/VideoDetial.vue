<template>
  <div class="videodeatial">
    <van-tabs
      v-model="active"
      swipeable
      animated
      offset-top="60vw"
      sticky
      :isFixed="true"
      @scroll="getScorllData"
    >
      <!-- ref="commentbox" -->
      <van-tab
        v-for="(item, index) in titleArr"
        :title="item"
        :key="index"
        class="detail-vantab"
      >
        <VideoIntrod v-if="active == 0"></VideoIntrod>
        <div v-else class="videocomments" ref="ulss">
          <ul v-if="videoComments ? videoComments.length : false">
            <li
              v-for="item in videoComments ? videoComments : ''"
              :key="item.id"
            >
              <div class="pic">
                <div class="tx" @click.stop="touser(item.userid)">
                  <img :src="item ? item.userInfo.avatar : ''" alt="" />
                  <span v-if="item ? item.userInfo.vip_flag : ''"></span>
                </div>
              </div>
              <div class="con">
                <div class="callthery">
                  <div class="mz">
                    <span class="names">{{
                      item ? item.userInfo.username : ""
                    }}</span>
                    <!-- <span
                      class="czr"
                      v-if="item ? item.userInfo.author_type == 2 : false"
                      >本片创作人</span
                    > -->
                  </div>
                  <span class="more"></span>
                </div>
                <div class="comments">
                  <p>
                    <span v-if="item ? item.referid : false"
                      >回复{{
                        item
                          ? item.referer
                            ? item.referer.userInfo.username
                            : ""
                          : ""
                      }}:</span
                    >{{ item ? item.content : "" }}
                  </p>
                </div>
                <div class="timebox">
                  <div class="time">
                    <span>{{ (item ? item.addtime : "") | formatTime }}</span>
                  </div>
                  <div class="tb">
                    <span class="pl"></span>
                    <span class="zan">
                      <i></i>
                      {{
                        (item ? item.userInfo.count.count_liked : "")
                          | formatCount
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="nonebox" v-else>
            <span class="bgi"></span>
            <span class="wz">还没有人评论</span>
          </div>

          <div class="loading">
            <span v-if="showComloading">加载中...</span>
            <span v-else class="nones">暂时没有更多了</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoIntrod from "@/components/VideoIntrod.vue";

export default {
  data() {
    return {
      active: 0,
      titleArr: ["简介", "评论"],
      sendTime: null,
    };
  },
  components: {
    VideoIntrod,
  },
  computed: {
    ...mapState([
      "videoIfoObj",
      "localVideoArr",
      "player",
      "localVideoArr",
      "videoComments",
      "compage",
      "showComloading",
      "videoComTotalObj",
    ]),
  },
  methods: {
    getScorllData() {
      if (this.active == 1) {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.videoComTotalObj) {
          if (
            this.compage >
            Math.ceil(
              this.videoComTotalObj.total / this.videoComTotalObj.page_size
            )
          ) {
            this.$store.commit("changeshowComloading", false);
            return;
          } else {
            this.sendTime = setTimeout(() => {
              if (
                document.documentElement.scrollTop +
                  document.documentElement.clientHeight +
                  20 >
                document.documentElement.offsetHeight
              ) {
                this.$store.commit("changeshowComloading", true);
                this.$store.commit("changecompage");
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
              this.$store.commit("changeshowComloading", true);
              this.$store.commit("changecompage");
            }
          }, 500);
        }
      }
    },
    touser(v){
      this.$store.commit('changeuserId',v)
      this.$router.push('/user')
    },
  },
  watch: {
    active(n){
      this.$emit('changeact',n)
    }
  },
};
</script>

<style lang="less" scoped>
.videodeatial {
  width: 100%;
  padding-top: 60vw;
  background-color: #fff;
}
</style>

<style lang="less" scoped>
/deep/.detail-vantab {
  position: relative;
  z-index: 19;
  background-color: #fff;
}
/deep/.van-tabs__nav {
  height: 40px;
}
/deep/.van-tabs__wrap {
  width: 100%;
  height: 41px;
  background-color: #fff !important;
  z-index: 20;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scale(1.5);
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }
}
</style>

<style lang="less" scoped>
.videocomments {
  width: 100vw;
  // height: 100vh;
  padding: 0 5vw;
  // overflow-y: scroll;
  // &::-webkit-scrollbar {
  //   width: 0 !important;
  // }
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
    .nones {
      font-size: 2.5vw;
      color: #c4c4c4;
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 3vw;
      box-sizing: border-box;
      .pic {
        flex-shrink: 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding-right: 4vw;
        .tx {
          width: 10vw;
          height: 10vw;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          span {
            display: inline-block;
            width: 3vw;
            height: 3vw;
            position: absolute;
            right: -1vw;
            bottom: 0;
            background: url(@/assets/iconimg/O_1.png) no-repeat center;
            background-size: contain;
          }
        }
      }
      .con {
        flex: 1 1 auto;
        width: 80vw;
        padding-bottom: 1vw;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid rgba(204, 204, 204, 0.3);
        }
        .callthery {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2vw;
          .mz {
            .names {
              display: inline-block;
              margin-right: 2vw;
              font-size: 3.5vw;
              font-family: "siyuanMed";
              color: #5c5c5c;
            }
            .czr {
              display: inline-block;
              border-radius: 5vw;
              padding: 1.5vw;
              background-color: #efefef;
              font-size: 1vw;
              color: #202020;
            }
          }
          .more {
            display: inline-block;
            width: 5vw;
            height: 5vw;
            background: url(@/assets/iconimg/more.svg) no-repeat center;
            background-size: contain;
          }
        }
        .comments {
          width: 100%;
          padding-bottom: 2vw;
          font-family: "siyuanMed";
          padding-right: 6vw;
          box-sizing: border-box;
          p {
            width: 100%;
            color: #1a1a1a;
            font-size: 3.5vw;
            text-align: justify;
            overflow: hidden;
            span {
              color: #a1a1a1;
            }
          }
        }
        .timebox {
          width: 100%;
          padding-bottom: 2vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .time {
            width: 80%;
            flex-shrink: 0;
            span {
              display: inline-block;
              color: #9e9e9e;
              font-size: 1.5vw;
            }
          }
          .tb {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            flex-shrink: 0;
            width: 20%;
            .pl {
              width: 30%;
              flex-shrink: 0;
              display: inline-block;
              width: 3vw;
              height: 3vw;
              background: url(@/assets/iconimg/ve.png) no-repeat center;
              background-size: contain;
              margin-right: 2vw;
              transform: translateY(1px);
            }
            .zan {
              width: 70%;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              i {
                flex-shrink: 0;
                display: inline-block;
                width: 3.5vw;
                height: 3.5vw;
                background: url(@/assets/iconimg/7M.png) no-repeat center;
                background-size: contain;
                margin-right: 0.5vw;
              }
              font-size: 2vw;
              color: #5c5c5c;
            }
          }
        }
      }
    }
  }
  .nonebox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
    .bgi {
      display: inline-block;
      width: 20vw;
      height: 20vw;
      background: url(@/assets/iconimg/Of.png) no-repeat center;
      background-size: contain;
    }
    .wz {
      color: #a1a1a1;
      font-size: 3vw;
    }
  }
}
</style>