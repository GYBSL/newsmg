<template>
  <div class="HomeCards">
    <li v-if="item" class="lis">
      <div class="tit">
        <div class="top">
          <div class="leftbox">
            <div class="pic" @click.stop="touser">
              <img
                :src="
                  item
                    ? item.children[0].model.resource.author.userinfo.avatar
                    : ''
                "
                alt=""
              />
              <span
                v-if="
                  item
                    ? item.children[0].model.resource.author.userinfo
                        .vip_flag == 0
                    : false
                "
              ></span>
            </div>
            <span class="name">{{
              item
                ? item.children[0].model.resource.author.userinfo.username
                : ""
            }}</span>
            <span
              class="team"
              v-if="item ? item.children[0].model.resource.team?item.children[0].model.resource.team.length:false : false"
              >和其它
              <b>{{
                item ? item.children[0].model.resource.team.length : ""
              }}</b>
              人</span
            >
          </div>
          <div class="rightbox">
            <span
              class="gz"
              @click.stop=""
              v-if="
                item
                  ? !item.children[0].model.resource.author.userinfo
                      .is_vmovier_migrate_user
                  : false
              "
              >+ 关注</span
            >
            <span class="more" @click.stop="changeShowShare"></span>
          </div>
        </div>
        <div class="wb">
          <p>{{ item ? item.children[0].model.resource.title : "" }}</p>
        </div>
      </div>
      <div
        class="vid"
        @click.stop="toVideo(item ? item.children[0].model.resource : null)"
      >
        <div
          class="video-mask"
          :style="{
            backgroundImage: `url(${
              item ? item.children[0].model.resource.cover : ''
            })`,
          }"
        >
          <div class="msg">
            <span class="count"
              >{{
                (item ? item.children[0].model.resource.count.count_view : "")
                  | formatCount
              }}
              观看 |
              {{
                (item ? item.children[0].model.resource.duration : "")
                  | formatDuration
              }}</span
            >
          </div>
        </div>
        <video autoplay muted ref="carevideo" src=""></video>
      </div>
      <div class="bot">
        <li class="sc">
          <span class="ic" @click.stop="collectVideo" v-if="iscollected"></span>
          <span class="ics" @click.stop="collectVideo" v-else></span>
          <span class="wb">{{
            (item ? item.children[0].model.resource.count.count_collect : "")
              | formatCount
          }}</span>
        </li>
        <li class="pl">
          <span class="tb" @click.stop="toVideoCom(item ? item.children[0].model.resource : null)"></span>
          <span class="wb">{{
            (item ? item.children[0].model.resource.count.count_comment : "")
              | formatCount
          }}</span>
        </li>
        <li class="zan">
          <span class="ic" @click.stop="likeVideo" v-if="mylike"></span>
          <span class="ics" @click.stop="likeVideo" v-else></span>
          <span class="wb">{{
            (item ? item.children[0].model.resource.count.count_like : "")
              | formatCount
          }}</span>
        </li>
      </div>
    </li>

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
      iscollected: true,
      collectvideoIds: null,
      collectvideoIdsArr: null,
      mylike: true,
      likevideoIdsArr: null,
    };
  },
  props: {
    item: [Object],
  },
  computed: {
    ...mapState([
      "cardsVideoObj",
      "showVideoCarePost",
      "localcollectCard",
      "locallikecard",
    ]),
  },
  created() {
    this.checkCollect();
    if (this.localcollectCard.length > 0) {
      for (let index = 0; index < this.localcollectCard.length; index++) {
        if (
          this.localcollectCard[index].id ==
          this.item.children[0].model.resource.id
        ) {
          this.iscollected = false;
          break;
        } else {
          this.iscollected = true;
        }
      }
    }

    this.checkLike();
    if (this.locallikecard.length > 0) {
      for (let index = 0; index < this.locallikecard.length; index++) {
        if (
          this.locallikecard[index].id ==
          this.item.children[0].model.resource.id
        ) {
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
  },
  methods: {
    toVideo(v) {
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
      this.$router.push("/videoplay");
    },
    touser() {
      this.$store.commit(
        "changeuserId",
        this.item.children[0].model.resource.author.userinfo.id
      );
      this.$router.push("/user");
    },
    onSelect(option) {
      this.showShare = false;
      let uu = `https://www.xinpianchang.com/a${this.item.children[0].model.resource.id}`;
      if (option.name == "复制链接" && this.item) {
        this.$copyText(uu).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
      } else if (option.name == "二维码" && this.shareVideoItem) {
        console.log("ewm");
      }
    },
    changeShowShare() {
      this.showShare = true;
    },
    collectVideo() {
      if (this.iscollected) {
        this.iscollected = false;
        this.$store.commit("changelocalcollectCard", {
          id: this.item.children[0].model.resource.id,
        });
        localStorage.setItem(
          "collectedCard",
          JSON.stringify(this.localcollectCard)
        );

        let colids = JSON.parse(localStorage.getItem("collectedVideo"));
        colids.push({
          id: this.item.children[0].model.resource.id,
        });
        localStorage.setItem("collectedVideo", JSON.stringify(colids));
      } else {
        this.iscollected = true;
        this.$store.commit(
          "changelocalcollectCard",
          this.localcollectCard.filter((el) => {
            return el.id != this.item.children[0].model.resource.id;
          })
        );
        localStorage.setItem(
          "collectedCard",
          JSON.stringify(this.localcollectCard)
        );

        let colids = JSON.parse(localStorage.getItem("collectedVideo"));
        colids = colids.filter((el) => {
          return el.id != this.item.children[0].model.resource.id;
        });
        localStorage.setItem("collectedVideo", JSON.stringify(colids));
      }
    },
    checkCollect() {
      this.collectvideoIdsArr = JSON.parse(
        localStorage.getItem("collectedCard")
      );
      if (!this.collectvideoIdsArr) {
        this.collectvideoIdsArr = this.localcollectCard;
        localStorage.setItem(
          "collectedCard",
          JSON.stringify(this.collectvideoIdsArr)
        );
      } else {
        this.$store.commit(
          "changelocalcollectCard",
          JSON.parse(localStorage.getItem("collectedCard"))
        );
      }
    },
    likeVideo() {
      if (this.mylike) {
        this.mylike = false;
        this.$store.commit("changelocallikecard", {
          id: this.item.children[0].model.resource.id,
        });
        localStorage.setItem("likeedcard", JSON.stringify(this.locallikecard));

        let likecid = JSON.parse(localStorage.getItem("likeedVideo"));
        likecid.push({
          id: this.item.children[0].model.resource.id,
        });
        localStorage.setItem("likeedVideo", JSON.stringify(likecid));
      } else {
        this.mylike = true;
        this.$store.commit(
          "changelocallikecard",
          this.locallikecard.filter((el) => {
            return el.id != this.item.children[0].model.resource.id;
          })
        );
        localStorage.setItem("likeedcard", JSON.stringify(this.locallikecard));

        let likecid = JSON.parse(localStorage.getItem("likeedVideo"));
        likecid = likecid.filter((el) => {
          return el.id != this.item.children[0].model.resource.id;
        });
        localStorage.setItem("likeedVideo", JSON.stringify(likecid));
      }
    },
    checkLike() {
      this.likevideoIdsArr = JSON.parse(localStorage.getItem("likeedcard"));
      if (!this.likevideoIdsArr) {
        this.likevideoIdsArr = this.locallikecard;
        localStorage.setItem("likeedcard", JSON.stringify(this.locallikecard));
      } else {
        this.$store.commit(
          "changelocallikecard",
          JSON.parse(localStorage.getItem("likeedcard"))
        );
      }
    },
    toVideoCom(v) {
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
      this.$router.push("/videoplay");
    },
  },
};
</script>

<style lang="less" scoped>
.HomeCards {
  width: 100%;
  .lis {
    width: 100%;
    background-color: #fff;
    margin-bottom: 2.5vw;
    border-radius: 2vw;
    list-style: none;
    .tit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 5vw;
      padding-top: 5vw;
      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "siyuanMed";
        .leftbox {
          flex-shrink: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1 1 auto;
          .pic {
            flex-shrink: 0;
            position: relative;
            img {
              width: 8vw;
              height: 8vw;
              border-radius: 50%;
            }
            span {
              display: inline-block;
              position: absolute;
              width: 3vw;
              height: 3vw;
              background: url(@/assets/iconimg/nV.png) no-repeat center;
              background-size: contain;
              bottom: 0;
              right: 0;
              transform: translateY(-1vw);
            }
          }
          .name {
            width: 25%;
            font-size: 2.5vw;
            color: #1a1a1a;
            margin: 0 2vw;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .team {
            font-size: 2.5vw;
            color: #5c5c5c;
            flex: 1 1 auto;
            b {
              color: #1a1a1a;
            }
          }
        }
        .rightbox {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .gz {
            color: #e04c3c;
            font-size: 2.5vw;
            padding: 0 3vw;
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
      .wb {
        width: 100%;
        padding: 1.5vw 0;
        p {
          width: 100%;
          text-align: left;
          color: #191919;
          font-size: 4vw;
          font-family: "siyuanMed";
        }
      }
    }
    .vid {
      width: 100%;
      position: relative;
      height: 50vw;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .video-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        z-index: 1;
        .msg {
          position: absolute;
          bottom: 3.5vw;
          right: 2.5vw;
          .count {
            color: #fff;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
            font-size: 2.5vw;
          }
        }
      }
      video {
        width: 100%;
        z-index: 0;
      }
    }
    .bot {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .sc {
        padding: 3vw 5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ic {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/28.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
        .ics {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/fF.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
        .wb {
          font-size: 3.5vw;
          flex-shrink: 0;
          color: #5c5c5c;
          margin-left: 2vw;
        }
      }
      .pl {
        padding: 3vw 5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tb {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/Gl.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
        .wb {
          font-size: 3.5vw;
          flex-shrink: 0;
          color: #5c5c5c;
          margin-left: 2vw;
        }
      }
      .zan {
        padding: 3vw 5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ic {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/7M.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
        .ics {
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/1O1.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
        .wb {
          font-size: 3.5vw;
          flex-shrink: 0;
          color: #5c5c5c;
          margin-left: 2vw;
        }
      }
    }
  }
}
</style>