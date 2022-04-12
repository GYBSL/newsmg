<template>
  <div class="SearchWorks" v-if="searchdata">
    <van-tabs v-model="active" sticky swipeable animated offset-top="54px">
      <van-tab v-for="(item, index) in title" :title="item" :key="index">
        <div class="svideo" v-if="active == 0">
          <div class="tit">
            共<span>{{ searchdata ? searchdata.total : "" }}</span
            >部作品
          </div>
          <div class="smvideo">
            <SimialVideo
              v-for="(item, index) in searchdataArr ? searchdataArr : ''"
              :item="item"
              :key="index"
              @click.stop.native="toVideo(item)"
            ></SimialVideo>
          </div>
        </div>
        <div class="creater" v-else>
          <div class="tit">
            共<span>{{ searchcreater ? searchcreater.total : "" }}</span
            >位创作人
          </div>
          <div class="cre">
            <li
              class="cre-li"
              v-for="(item, index) in createrdataArr ? createrdataArr : ''"
              :key="index"
            >
              <div class="pic">
                <img :src="item ? item.avatar : ''" alt="" />
                <span v-if="item ? item.id % 2 == 0 : false"></span>
                <i v-else></i>
              </div>
              <div class="msg">
                <div class="inf">
                  <p class="name">{{ item ? item.username : "" }}</p>
                  <p class="count">
                    {{ item ? item.occupation : "" }} · 粉丝
                    {{ item ? item.count.count_follower : "" }}
                  </p>
                </div>
                <div class="gz">
                  <span>关注</span>
                </div>
              </div>
            </li>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-dropdown-menu v-if="active == 0">
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeKind"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="candownload"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
import SimialVideo from "@/components/SimialVideo.vue";

export default {
  props: {
    searchdata: [Object, null],
    iptvalue: [String],
    searchcreater: [Object, null],
    searchdataArr: [Array, null],
    createrdataArr: [Array, null],
  },
  data() {
    return {
      active: 0,
      title: ["作品", "创作人"],
      value1: 0,
      value2: "a",
      option1: [
        { text: "最热门", value: 0 },
        { text: "最匹配", value: 1 },
        { text: "新发布", value: 2 },
      ],
      option2: [
        { text: "全部", value: "a" },
        { text: "可下载", value: "b" },
      ],
    };
  },
  components: {
    SimialVideo,
  },
  methods: {
    toVideo(v) {
      this.$router.push("/videoplay");
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
    },
    changeKind() {
      if (this.value1 == 0) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=hot`
          )
          .then((res) => {
            this.$store.commit("changesearchdata", res.data.data);
            this.$store.commit("changesearchdataArr", res.data.data.list);
          });
      } else if (this.value1 == 1) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=default`
          )
          .then((res) => {
            this.$store.commit("changesearchdata", res.data.data);
            this.$store.commit("changesearchdataArr", res.data.data.list);
          });
      } else if (this.value1 == 2) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=addtime`
          )
          .then((res) => {
            this.$store.commit("changesearchdata", res.data.data);
            this.$store.commit("changesearchdataArr", res.data.data.list);
          });
      }
    },
    candownload() {
      if (this.value2 == "a") {
        this.changeKind();
      } else if (this.value2 == "b") {
        if (this.value1 == 0) {
          this.axios
            .get(
              `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=hot&allow_download=1`
            )
            .then((res) => {
              this.$store.commit("changesearchdata", res.data.data);
              this.$store.commit("changesearchdataArr", res.data.data.list);
            });
        } else if (this.value1 == 1) {
          this.axios
            .get(
              `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=default&allow_download=1`
            )
            .then((res) => {
              this.$store.commit("changesearchdata", res.data.data);
              this.$store.commit("changesearchdataArr", res.data.data.list);
            });
        } else if (this.value1 == 2) {
          this.axios
            .get(
              `https://apis.netstart.cn/xpc/search?type=article&kw=${this.iptvalue}&sort=addtime&allow_download=1`
            )
            .then((res) => {
              this.$store.commit("changesearchdata", res.data.data);
              this.$store.commit("changesearchdataArr", res.data.data.list);
            });
        }
      }
    },
  },
  watch: {
    active(n) {
      this.$emit("changeact", n);
    },
  },
};
</script>

<style lang="less" scoped>
.SearchWorks {
  width: 100%;
  background-color: #fff;
  .svideo {
    background-color: #fff;
    padding-top: 45px;
    .tit {
      font-size: 2.5vw;
      width: 100%;
      color: #c6c6c6;
      padding: 3vw 5vw;
      span {
        color: #d55644;
        font-family: "siyuanMed";
      }
    }
    .smvideo {
      padding: 0 5vw;
    }
  }
  .creater {
    width: 100%;
    .tit {
      font-size: 2.5vw;
      width: 100%;
      color: #c6c6c6;
      padding: 3vw 5vw;
      span {
        color: #d55644;
        font-family: "siyuanMed";
      }
    }
    .cre {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 5vw;
      .cre-li {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3vw 0;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 1px;
          width: 100%;
          border-bottom: 1px solid rgba(204, 204, 204, 0.3);
        }
        .pic {
          flex-shrink: 0;
          position: relative;
          img {
            width: 13vw;
            height: 13vw;
            border-radius: 50%;
          }
          span {
            display: inline-block;
            position: absolute;
            bottom: 3px;
            right: 3px;
            width: 4vw;
            height: 4vw;
            background: url(@/assets/iconimg/nV.png) no-repeat center;
            background-size: contain;
          }
          i {
            display: inline-block;
            position: absolute;
            bottom: 3px;
            right: 3px;
            width: 4vw;
            height: 4vw;
            background: url(@/assets/iconimg/O_1.png) no-repeat center;
            background-size: contain;
          }
        }
        .msg {
          width: 60%;
          display: flex;
          flex: 1 1 auto;
          justify-content: space-between;
          align-items: center;
          .inf {
            width: 60%;
            flex-shrink: 0;
            padding-left: 2vw;
            .name {
              width: 100%;
              font-size: 4vw;
              font-family: "siyuanMed";
              color: #1a1a1a;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .count {
              width: 100%;
              font-size: 1.5vw;
              color: #a1a1a1;
            }
          }
          .gz {
            span {
              font-size: 2vw;
              font-family: "siyuanMed";
              color: #d55644;
              padding: 1vw 4.5vw;
              border-radius: 5vw;
              display: inline-block;
              background-color: #f9edeb;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.van-tab {
  font-family: "siyuanMed";
  color: #a1a1a1;
}
/deep/.van-tab--active {
  color: #ee4438;
}
/deep/.van-dropdown-menu {
  position: fixed;
  top: 92px;
  left: 0;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 100%;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }
}
/deep/.van-dropdown-menu__bar {
  box-shadow: 0 2px 12px transparent;
}
/deep/.van-dropdown-menu__bar {
  height: 40px;
  font-family: "siyuanMed";
}
/deep/.van-ellipsis {
  font-size: 3.7vw;
}
/deep/.van-cell__title {
  font-family: "siyuanMed";
  font-size: 3.7vw;
}
/deep/.van-tabs__line {
  z-index: 22;
}
/deep/.van-tabs__nav--line {
  padding-bottom: 13px;
}
/deep/.van-tabs__wrap {
  position: relative;
  height: 40px;
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 2px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }
}
</style>