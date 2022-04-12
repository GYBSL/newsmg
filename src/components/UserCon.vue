<template>
  <div class="UserCon">
    <div class="mask"></div>
    <div class="back">
      <span @click="back"></span>
    </div>
    <div class="videoMore">
      <span
        @click.stop="changeShowShare"
        @touchstart.stop="showAct = true"
        @touchend.stop="showAct = false"
      ></span>
      <span class="active" v-if="showAct"></span>
    </div>
    <div class="uu" v-if="userItem">
      <div
        class="head"
        :style="{
          backgroundImage: `url(${userItem ? userItem.app_background : ''})`,
        }"
      >
        <div class="pic">
          <div class="mm">
            <img :src="userItem ? userItem.avatar : ''" alt="" />
            <span v-if="userItem ? userItem.vip_flag : ''"></span>
          </div>
        </div>
        <div class="msg">
          <div class="titbox">
            <p class="name">{{ userItem ? userItem.username : "" }}</p>
            <p class="area">
              {{ userItem ? userItem.occupation : "" }} ·
              {{
                userItem
                  ? userItem.location
                    ? userItem.location.province
                      ? userItem.location.province.name
                      : ""
                    : ""
                  : ""
              }}
            </p>
            <p class="jj">
              {{ userItem ? userItem.verify_description : "" }}
            </p>
          </div>
          <div class="hotmsg">
            <div class="left">
              <div class="litbox-one" @click.stop="showss">
                <span class="count">{{
                  (userItem ? userItem.count.count_popularity : "")
                    | formatCount
                }}</span>
                <span class="wb">人气</span>
              </div>
              <div class="litbox-two">
                <span class="count">{{
                  (userItem ? userItem.count.count_follower : "") | formatCount
                }}</span>
                <span class="wb">粉丝</span>
              </div>
              <div class="litbox-thr">
                <span class="count">{{
                  (userItem ? userItem.count.count_followee : "") | formatCount
                }}</span>
                <span class="wb">关注</span>
              </div>
            </div>
            <div class="right">
              <span class="lx">联系合作</span>
              <span class="fol">关注</span>
            </div>
          </div>
        </div>
      </div>

      <van-tabs v-model="active">
        <van-tab title="作品">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="value1"
              @change="toGetData($event)"
              ref="menu"
              :options="option1"
            />
          </van-dropdown-menu>
          <UserWorks></UserWorks>
        </van-tab>
        <van-tab title="专辑">
          <div class="zj">
            <span>还没有创建专辑</span>
          </div>
        </van-tab>
        <van-tab title="喜欢"></van-tab>
        <van-tab title="资料">
          <UserMsg></UserMsg>
        </van-tab>
      </van-tabs>

      <!-- loading -->
      <div class="loadings" v-if="showload">
        <svg
          style="margin: auto; display: block"
          width="20vw"
          height="20vw"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g transform="rotate(0 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.9375s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(22.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.875s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(45 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.8125s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(67.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.75s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(90 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.6875s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(112.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.625s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(135 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.5625s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(157.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.5s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(180 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.4375s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(202.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.375s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(225 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.3125s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(247.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.25s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(270 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.1875s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(292.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.125s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(315 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="-0.0625s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
          <g transform="rotate(337.5 50 50)">
            <rect
              x="48"
              y="23.5"
              rx="2"
              ry="3.25"
              width="4"
              height="13"
              fill="#d5d5d5"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </g>
        </svg>
      </div>

      <van-dialog
        v-model="show"
        confirmButtonText="我知道啦"
        width="70vw"
        :overlay="true"
      >
        <img src="../assets/iconimg/_R.png" alt="" />
        <div class="ts">
          <p class="tit">人气值</p>
          <p class="nr">基于创作人在社区内的内容创作数据进行的综合评判</p>
        </div>
      </van-dialog>

      <!-- vant分享组件 -->
      <van-share-sheet
        v-model="showShare"
        :options="options"
        @select="onSelect"
      />
    </div>

    <div class="user-no" v-else>
      <span>找不到此创作者</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import UserWorks from "@/components/UserWorks.vue";
import UserMsg from "@/components/UserMsg.vue";

export default {
  data() {
    return {
      videouserId: null,
      showload: true,
      active: 0,
      value1: 0,
      option1: [
        { text: "默认排序", value: 0 },
        { text: "热门排序", value: 1 },
        { text: "最新上传", value: 2 },
      ],
      showShare: false,
      showAct: false,
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
      worksorder: null,
      show: false,
    };
  },
  components: {
    UserWorks,
    UserMsg,
  },
  created() {
    this.showload = true;
    if (this.userId) {
      this.$store.commit(
        "changelocaluserId",
        JSON.stringify({
          videoNameId: this.userId,
        })
      );
      localStorage.setItem("localuserId", this.localuserId);
      this.getUserData();
    } else {
      this.videouserId = JSON.parse(
        localStorage.getItem("localuserId")
      ).videoNameId;
      this.getUserData(this.videouserId);
      this.$store.commit("changeuserId", this.videouserId);
    }
    this.worksorder = "";
    this.axios
      .get(
        `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${this.workspage}`
      )
      .then((res) => {
        this.$store.commit("changeworksItem", res.data.data.list);
        this.$store.commit("changeorgWorksItem", res.data.data);
      });
  },
  mounted() {
    window.addEventListener("scroll", this.getMoreWorks);
  },
  computed: {
    ...mapState([
      "userId",
      "userItem",
      "localuserId",
      "workspage",
      "worksItem",
      "orgWorksItem",
    ]),
  },
  methods: {
    showss() {
      this.show = true;
    },
    getUserData(n) {
      this.axios
        .get(`https://apis.netstart.cn/xpc/user/${n ? n : this.userId}`)
        .then((res) => {
          if (res) {
            this.$store.commit("changeuserItem", res.data.data);
            this.showload = false;
            this.$store.commit("changeapploading", false);
          } else {
            this.$store.commit("changeuserItem", null);
          }
        })
        .catch(() => {
          this.$store.commit("changeuserItem", null);
        });
    },
    changeShowShare() {
      this.showShare = true;
    },
    onSelect(option) {
      this.showShare = false;
      let uu = `https://www.xinpianchang.com/u${this.userId}`;
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
    toGetData(v) {
      if (v == 0) {
        this.worksorder = "";
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${this.workspage}`
          )
          .then((res) => {
            this.$store.commit("changeworksItem", res.data.data.list);
            this.$store.commit("changeorgWorksItem", res.data.data);
          });
      } else if (v == 1) {
        this.worksorder = "view";
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${this.workspage}`
          )
          .then((res) => {
            this.$store.commit("changeworksItem", res.data.data.list);
            this.$store.commit("changeorgWorksItem", res.data.data);
          });
      } else if (v == 2) {
        this.worksorder = "new";
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${this.workspage}`
          )
          .then((res) => {
            this.$store.commit("changeworksItem", res.data.data.list);
            this.$store.commit("changeorgWorksItem", res.data.data);
          });
      }
    },
    getMoreWorks() {
      if (this.active == 0) {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.worksItem) {
          if (
            this.workspage >
            Math.ceil(this.orgWorksItem.total / this.orgWorksItem.page_size)
          ) {
            this.$store.commit("changeshowworksloading", false);
            this.$store.commit("changeshowend", true);
            return;
          } else {
            this.sendTime = setTimeout(() => {
              if (
                document.documentElement.scrollTop +
                  document.documentElement.clientHeight +
                  20 >
                document.documentElement.offsetHeight
              ) {
                this.$store.commit("changeshowworksloading", true);
                this.$store.commit("changeworkspage");
              }
            }, 500);
          }
        }
      }
    },
    back() {
      window.removeEventListener("scroll", this.getMoreWorks);
      this.$router.back();
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.getMoreWorks);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getMoreWorks);
    next();
  },
  watch: {
    userId(n) {
      this.showload = true;
      this.getUserData(n);
      this.showload = true;
      if (this.userItem) {
        if (n) {
          this.$store.commit(
            "changelocaluserId",
            JSON.stringify({
              videoNameId: n,
            })
          );
          localStorage.setItem("localuserId", this.localuserId);
        }
        this.worksorder = "";
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${this.workspage}`
          )
          .then((res) => {
            this.$store.commit("changeworksItem", res.data.data.list);
            this.$store.commit("changeorgWorksItem", res.data.data);
          });
      }
      // else{
      //   this.$store.commit("changeuserItem", null);
      // }
    },
    workspage(n) {
      if (
        this.workspage >
        Math.ceil(this.orgWorksItem.total / this.orgWorksItem.page_size)
      ) {
        this.$store.commit("changeshowworksloading", false);
        this.$store.commit("changeshowend", true);
        return;
      } else {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/user/${this.userId}/articles?type=public&order=${this.worksorder}&is_hide_in_space=0&return_struct_type=user_home&page=${n}`
          )
          .then((res) => {
            this.$store.commit("changeworksItem", [
              ...this.worksItem,
              ...res.data.data.list,
            ]);
            this.$store.commit("changeshowworksloading", false);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.zj {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 4vw;
    color: #bec2c5;
    padding: 20vw 0;
    font-family: "siyuanMed";
  }
}
/deep/.ts {
  .tit {
    text-align: center;
    line-height: 40px;
    color: #1b1b1b;
  }
  .nr {
    color: #a3a3a3;
    font-size: 0.7rem;
    padding: 5px 20px;
    text-align: center;
  }
}
/deep/.van-tabs {
  z-index: 21;
}
</style>

<style lang="less" scoped>
.UserCon {
  width: 100%;
  position: relative;
  .uu {
    width: 100%;
    position: relative;
  }
  .user-no {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 12;
    position: fixed;
    top: 0;
    span {
      color: #ffffff;
      font-family: "siyuanMed";
      font-size: 4vw;
    }
  }
  .mask {
    position: fixed;
    z-index: 9;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
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
  .loadings {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 31;
  }
  .head {
    width: 100%;
    height: 80vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    padding: 0 5vw;
    box-sizing: border-box;
    position: relative;
    z-index: 20;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      top: 0;
      left: 0;
      z-index: 20;
    }
    .pic {
      width: 100%;
      padding-top: 20vw;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      z-index: 21;
      position: relative;
      .mm {
        width: 15vw;
        height: 15vw;
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        img {
          width: 15vw;
          height: 15vw;
          border-radius: 50%;
        }
        span {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(@/assets/iconimg/O_1.png) no-repeat center;
          background-size: contain;
        }
      }
    }
    .msg {
      z-index: 21;
      position: relative;
      .titbox {
        .name {
          width: 100%;
          color: #fff;
          font-family: "siyuanMed";
          font-size: 4.5vw;
          padding: 0.5vw 0;
          padding-top: 2.5vw;
          text-align: left;
        }
        .area {
          width: 100%;
          color: #e4e4e4;
          font-size: 1.5vw;
          padding: 0.5vw 0;
          text-align: left;
        }
        .jj {
          width: 80%;
          color: #e4e4e4;
          font-size: 1.5vw;
          padding: 1vw 0;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .hotmsg {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 5vw;
        .left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .litbox-one {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-right: 5vw;
            .count {
              color: #fff;
              font-size: 2.3vw;
              font-weight: bold;
            }
            .wb {
              color: #d7dfe0;
              font-size: 2.3vw;
              display: inline-block;
              margin-top: 2vw;
            }
          }
          .litbox-two {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 5vw;
            .count {
              color: #fff;
              font-size: 2.3vw;
              font-weight: bold;
            }
            .wb {
              color: #d7dfe0;
              font-size: 2.3vw;
              display: inline-block;
              margin-top: 2vw;
            }
          }
          .litbox-thr {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 5vw;
            .count {
              color: #fff;
              font-size: 2.3vw;
              font-weight: bold;
            }
            .wb {
              color: #d7dfe0;
              font-size: 2.3vw;
              display: inline-block;
              margin-top: 2vw;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          font-family: "siyuanMed";
          .lx {
            display: inline-block;
            padding: 2vw 4vw;
            background-color: #fefefe;
            font-size: 2.5vw;
            margin-right: 4vw;
            color: #1b1b1b;
            border-radius: 5vw;
          }
          .fol {
            display: inline-block;
            padding: 2vw 4vw;
            background-color: #e44b39;
            font-size: 2.5vw;
            color: #fff;
            border-radius: 5vw;
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
/deep/.van-tabs__wrap {
  font-family: "siyuanMed";
}
/deep/.van-tab--active {
  color: #d75139;
}
/deep/.van-dropdown-menu__bar {
  height: 40px;
}
/deep/.van-dropdown-menu__item {
  justify-content: flex-start;
}
/deep/.van-popup--top {
  width: 20vw;
  margin-left: 5vw;
  border-radius: 10px;
  margin-top: 1vw;
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05);
}
/deep/.van-ellipsis {
  color: #5b5b5b;
  font-size: 2vw;
  font-family: "siyuanMed";
  margin-left: 3vw;
}
/deep/.van-dropdown-item__option {
  color: #858585;
  font-size: 2vw;
  font-family: "siyuanMed";
}
/deep/.van-dropdown-item__option--active {
  color: #191919;
}
/deep/.van-cell__value {
  display: none;
}
/deep/.van-cell__title {
  text-align: center;
}
/deep/.van-cell {
  padding: 1vw 0;
}
/deep/.van-dropdown-item {
  z-index: 20;
}
/deep/.van-overlay {
  background-color: rgba(255, 255, 255, 0);
}
</style>