<template>
  <div class="VideoIntIcon">
    <div class="icon-tb">
      <li>
        <div class="tp">
          <span class="ic" @click.stop="likeVideo" v-if="mylike"></span>
          <span class="ics" @click.stop="likeVideo" v-else></span>
          <span class="wb">{{
            videoIfoObj ? videoIfoObj.count.count_like : ""
          }}</span>
        </div>
      </li>
      <li>
        <div class="tp">
          <span class="ic" @click.stop="collectVideo" v-if="iscollected"></span>
          <span class="ics" @click.stop="collectVideo" v-else></span>
          <span class="wb">{{
            videoIfoObj ? videoIfoObj.count.count_collect : ""
          }}</span>
        </div>
      </li>
      <li>
        <div class="tp">
          <span class="ic" @click.stop="changeShowShare"></span>
          <span class="wb">{{
            videoIfoObj ? videoIfoObj.count.count_share : ""
          }}</span>
        </div>
      </li>
      <li v-if="videoIfoObj ? videoIfoObj.allow_download_type == 3 : false">
        <div class="tp">
          <a href="javaScript: ;" download="">
            <!-- videoIfoObj?videoIfoObj.video.content.progressive.url:'javaScript:;' -->
            <span class="ic" @click.stop=""></span>
            <span class="vip"></span>
          </a>
          <span class="wb">下载</span>
        </div>
      </li>
    </div>

    <div class="keyword" v-if="videoIfoObj ? videoIfoObj.tags.length : false">
      <div
        class="tem"
        ref="tem"
        :class="{ act: acts }"
        v-if="videoIfoObj ? videoIfoObj.tags.length : false"
      >
        <li
          ref="lis"
          v-for="item in videoIfoObj ? videoIfoObj.tags : ''"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
        </li>
      </div>
      <div class="sp">
        <span
          class="jt"
          :class="{ tra: acts }"
          @click.stop="showacts"
          v-if="showSpan"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      activeNames: [],
      sunLen: 0,
      acts: false,
      iscollected: true,
      collectvideoIds: null,
      collectvideoIdsArr: null,
      mylike: true,
      likevideoIdsArr: null,
    };
  },
  created() {
    this.checkCollect();
    if (this.localcollectArr.length > 0) {
      for (let index = 0; index < this.localcollectArr.length; index++) {
        if (this.localcollectArr[index].id == this.videoId) {
          this.iscollected = false;
          break;
        } else {
          this.iscollected = true;
        }
      }
    }

    this.checkLike();
    if (this.locallikeArr.length > 0) {
      for (let index = 0; index < this.locallikeArr.length; index++) {
        if (this.locallikeArr[index].id == this.videoId) {
          this.mylike = false;
          break;
        } else {
          this.mylike = true;
        }
      }
    }

    let colids = JSON.parse(localStorage.getItem("collectedVideo"));
    if (!colids) {
      localStorage.setItem("collectedVideo", JSON.stringify([]));
    }

    let likecid = JSON.parse(localStorage.getItem("likeedVideo"));
    if (!likecid) {
      localStorage.setItem("likeedVideo", JSON.stringify([]));
    }

    let coluid = JSON.parse(localStorage.getItem("collectedCard"));
    if (!coluid) {
      localStorage.setItem("collectedCard", JSON.stringify([]));
    }

    let likeeucard = JSON.parse(localStorage.getItem("likeedcard"));
    if (!likeeucard) {
      localStorage.setItem("likeedcard", JSON.stringify([]));
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showMore();
    });
  },
  computed: {
    ...mapState([
      "videoIfoObj",
      "showSpan",
      "localcollectArr",
      "videoId",
      "locallikeArr",
    ]),
  },
  methods: {
    showMore() {
      this.sunLen = 0;
      if (
        this.$refs.lis &&
        (this.videoIfoObj ? this.videoIfoObj.tags.length : false)
      ) {
        this.$refs.lis.forEach((el) => {
          this.sunLen += el.offsetWidth;
        });
        if (this.sunLen > this.$refs.tem.clientWidth) {
          this.$store.commit("changeshowSpan", true);
        } else {
          this.acts = true;
          this.$store.commit("changeshowSpan", false);
        }
      }
    },
    showacts() {
      this.acts = !this.acts;
    },
    changeShowShare() {
      this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.showShare = true;
    },
    collectVideo() {
      if (this.iscollected) {
        this.iscollected = false;
        this.$store.commit("changelocalcollectArr", {
          id: this.videoIfoObj.id,
        });
        localStorage.setItem(
          "collectedVideo",
          JSON.stringify(this.localcollectArr)
        );

        let coluid = JSON.parse(localStorage.getItem("collectedCard"));
        coluid.push({
          id: this.videoIfoObj.id,
        });
        localStorage.setItem("collectedCard", JSON.stringify(coluid));
      } else {
        this.iscollected = true;
        this.$store.commit(
          "changelocalcollectArr",
          this.localcollectArr.filter((el) => {
            return el.id != this.videoIfoObj.id;
          })
        );
        localStorage.setItem(
          "collectedVideo",
          JSON.stringify(this.localcollectArr)
        );

        let coluid = JSON.parse(localStorage.getItem("collectedCard"));
        if (coluid.length) {
          coluid = coluid.filter((el) => {
            return el.id != this.videoIfoObj.id;
          });
          localStorage.setItem("collectedCard", JSON.stringify(coluid));
        }
      }
    },
    checkCollect() {
      this.collectvideoIdsArr = JSON.parse(
        localStorage.getItem("collectedVideo")
      );
      if (!this.collectvideoIdsArr) {
        this.collectvideoIdsArr = this.localcollectArr;
        localStorage.setItem(
          "collectedVideo",
          JSON.stringify(this.collectvideoIdsArr)
        );
      } else {
        this.$store.commit(
          "changelocalcollectArr",
          JSON.parse(localStorage.getItem("collectedVideo"))
        );
      }
    },
    likeVideo() {
      if (this.mylike) {
        this.mylike = false;
        this.$store.commit("changelocallikeArr", {
          id: this.videoIfoObj.id,
        });
        localStorage.setItem("likeedVideo", JSON.stringify(this.locallikeArr));

        let likeeucard = JSON.parse(localStorage.getItem("likeedcard"));
        likeeucard.push({
          id: this.videoIfoObj.id,
        });
        localStorage.setItem("likeedcard", JSON.stringify(likeeucard));
      } else {
        this.mylike = true;
        this.$store.commit(
          "changelocallikeArr",
          this.locallikeArr.filter((el) => {
            return el.id != this.videoIfoObj.id;
          })
        );
        localStorage.setItem("likeedVideo", JSON.stringify(this.locallikeArr));

        let likeeucard = JSON.parse(localStorage.getItem("likeedcard"));
        likeeucard = likeeucard.filter((el) => {
          return el.id != this.videoIfoObj.id;
        });
        localStorage.setItem("likeedcard", JSON.stringify(likeeucard));
      }
    },
    checkLike() {
      this.likevideoIdsArr = JSON.parse(localStorage.getItem("likeedVideo"));
      if (!this.likevideoIdsArr) {
        this.likevideoIdsArr = this.locallikeArr;
        localStorage.setItem("likeedVideo", JSON.stringify(this.locallikeArr));
      } else {
        this.$store.commit(
          "changelocallikeArr",
          JSON.parse(localStorage.getItem("likeedVideo"))
        );
      }
    },
  },
  watch: {
    videoIfoObj(n) {
      this.$nextTick(() => {
        if (n && this.$refs.lis) {
          this.showMore();
        }
      });
    },
    videoId(n) {
      this.$nextTick(() => {
        if (n && this.$refs.lis) {
          this.showMore();
        }

        this.checkCollect();
        if (this.localcollectArr.length > 0) {
          for (let index = 0; index < this.localcollectArr.length; index++) {
            if (this.localcollectArr[index].id == this.videoId) {
              this.iscollected = false;
              break;
            } else {
              this.iscollected = true;
            }
          }
        }

        this.checkLike();
        if (this.locallikeArr.length > 0) {
          for (let index = 0; index < this.locallikeArr.length; index++) {
            if (this.locallikeArr[index].id == this.videoId) {
              this.mylike = false;
              break;
            } else {
              this.mylike = true;
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.VideoIntIcon {
  width: 100%;
  .icon-tb {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5vw 6.5vw;
    padding-bottom: 0;
    position: relative;
    box-sizing: border-box;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      .tp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .ic {
          display: inline-block;
          width: 5vw;
          height: 5vw;
          flex-shrink: 0;
        }
        .wb {
          display: inline-block;
          flex-shrink: 0;
          font-size: 1.5vw;
          line-height: 30px;
        }
      }
      &:first-child {
        .tp {
          .ic {
            background: url(@/assets/iconimg/0B.png) no-repeat center;
            background-size: contain;
            width: 5.5vw;
            height: 5.5vw;
          }
          .ics {
            background: url(@/assets/iconimg/6J.png) no-repeat center;
            background-size: contain;
            width: 5.5vw;
            height: 5.5vw;
          }
        }
      }
      &:nth-child(2) {
        .tp {
          .ic {
            background: url(@/assets/iconimg/PL.png) no-repeat center;
            background-size: contain;
            width: 6vw;
            height: 6vw;
          }
          .ics {
            background: url(@/assets/iconimg/fF.png) no-repeat center;
            background-size: contain;
            width: 6vw;
            height: 6vw;
          }
        }
      }
      &:nth-child(3) {
        .tp {
          .ic {
            background: url(@/assets/iconimg/4j.png) no-repeat center;
            background-size: contain;
          }
        }
      }
      &:nth-child(4) {
        .tp {
          position: relative;
          a {
            text-decoration: none;
            .ic {
              background: url(@/assets/iconimg/cx.png) no-repeat center;
              background-size: contain;
              transform: translateX(1px);
            }
            .vip {
              position: absolute;
              top: -2vw;
              right: -3vw;
              display: inline-block;
              width: 6vw;
              height: 6vw;
              background: url(@/assets/iconimg/9b.png) no-repeat center;
              background-size: contain;
            }
          }
        }
      }
    }
    &::after {
      content: "";
      bottom: 0;
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0;
      border-bottom: 1px solid rgba(204, 204, 204, 0.2);
      transform: scaleX(1.5);
    }
  }
  .keyword {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    .tem {
      width: 90%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 3vw 0;
      overflow: hidden;
      &.act {
        flex-wrap: wrap;
      }
      li {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
        color: #5a5a5a;
        font-size: 1.5vw;
        margin-right: 2vw;
        padding: 1.5vw 3vw;
        border-radius: 2vw;
        margin-bottom: 5px;
        flex-shrink: 0;
      }
    }
    .sp {
      width: 10%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 3vw 0;
      flex: 1 1 auto;
      .jt {
        display: inline-block;
        width: 4vw;
        height: 4vw;
        background: url(@/assets/iconimg/jt.svg) no-repeat center;
        background-size: contain;
        transform: rotate(180deg);
        &.tra {
          transform: rotate(0deg);
        }
      }
    }
    &::after {
      content: "";
      bottom: 0;
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0;
      border-bottom: 1px solid rgba(204, 204, 204, 0.2);
      transform: scaleX(1.5);
    }
  }
}
</style>