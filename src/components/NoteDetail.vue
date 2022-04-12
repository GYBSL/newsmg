<template>
  <div class="NoteDetail">
    <van-nav-bar
      title="手记详情"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
    >
      <template #right>
        <span class="righticon"></span>
      </template>
    </van-nav-bar>

    <div class="nr" v-if="NoteDeaobj">
      <div class="title">
        <div class="left">
          <div class="lbox">
            <img :src="NoteDeaobj ? NoteDeaobj.user.avatar : ''" @click.stop='toUser(NoteDeaobj.user)' alt="" />
            <span v-if="NoteDeaobj ? NoteDeaobj.user.vip_flag : false"></span>
          </div>
          <div class="rbox">
            <div class="tbox">
              <span class="name">{{
                NoteDeaobj ? NoteDeaobj.user.username : ""
              }}</span>
              <span
                class="vip"
                v-if="NoteDeaobj ? NoteDeaobj.user.vip_status : false"
              ></span>
            </div>
            <div class="bbox">
              <span class="time">
                发布于 {{ (NoteDeaobj ? NoteDeaobj.addtime : "") | formatTime }}
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <span>+ 关注</span>
        </div>
      </div>

      <van-swipe indicator-color="#FB443C">
        <van-swipe-item
          v-for="(image, index) in NoteDeaobj ? NoteDeaobj.images : ''"
          :key="index"
        >
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="titcon">
        <p class="tit">{{ NoteDeaobj ? NoteDeaobj.title : "" }}</p>
        <p class="content">{{ NoteDeaobj ? NoteDeaobj.content : "" }}</p>
      </div>
    </div>

    <div class="comment-note" v-if="notecom">
      <template v-for="item in notecom ? notecom : ''">
        <div
          class="com-exit"
          v-if="notecom ? notecom.length : false"
          :key="item.id"
        >
          <div class="conunt">
            <span>{{ notecom ? notecom.length : "" }} 评论</span>
          </div>
          <div class="for-com">
            <div class="lboxs">
              <img :src="item ? item.userDetail.avatar_small : ''" alt="" />
            </div>
            <div class="ribox">
              <div class="name">
                <span>{{ item ? item.userDetail.nickname : "" }}</span>
              </div>
              <div class="con-pl">
                <p>{{ item ? item.contentText : "" }}</p>
              </div>
              <div class="tbox">
                <span class="time">{{
                  (item ? item.createTimeUnix : "") | formatTime
                }}</span>
                <div class="zan">
                  <span class="like">{{ item ? item.likeCount : "" }}</span>
                  <span class="tb" v-if="iszan" @click.stop='like'></span>
                  <span class="tbs" v-else @click.stop='like'></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="none-com" v-if="notecom ? notecom.length == 0 : false">
        <p>还没有评论</p>
      </div>
    </div>

    <!-- vant分享组件 -->
    <van-share-sheet
      v-model="showShare"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";

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
      iszan: true,
    };
  },
  computed: {
    ...mapState(["NoteId", "NoteDeaobj", "localnoteid", "notecom"]),
  },
  created() {
    this.noteIdArr = JSON.parse(localStorage.getItem("noteId"));
    if (!this.noteIdArr) {
      this.noteIdArr = this.localnoteid;
      localStorage.setItem("noteId", JSON.stringify(this.NoteId));
      this.getNoteData(this.NoteId);
      this.getCommentData(this.NoteId);
    } else {
      this.$store.commit(
        "changelocalnoteid",
        JSON.parse(localStorage.getItem("noteId"))
      );
      this.$store.commit("changeNoteId", this.localnoteid);
      localStorage.setItem("noteId", JSON.stringify(this.NoteId));
      this.getNoteData(this.localnoteid);
      this.getCommentData(this.localnoteid);
    }
  },
  methods: {
    getNoteData(n) {
      this.axios.get(`https://apis.netstart.cn/xpc/note/${n}`).then((res) => {
        this.$store.commit("changeNoteDeaobj", res.data.data);
      });
    },
    getCommentData(n) {
      this.axios
        .get(
          `https://apis.netstart.cn/xpc/note/${n}/comment?offset=0&limit_size=10`
        )
        .then((res) => {
          this.$store.commit("changenotecom", res.data.data);
        });
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.showShare = true;
    },
    onSelect(option) {
      this.showShare = false;
      let uu = this.NoteDeaobj.web_url;
      if (option.name == "复制链接" && this.NoteDeaobj) {
        this.$copyText(uu).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
      } else if (option.name == "不感兴趣" && this.NoteDeaobj) {
        this.showUnlike = true;
      } else if (option.name == "二维码" && this.NoteDeaobj) {
        console.log("ewm");
      }
    },
    toUser(v) {
      this.$store.commit("changeuserId", v.id);
      this.$router.push("/user");
    },
    like(){
        if(this.iszan){
            this.iszan=false
        }else{
            this.iszan=true
        }
    },
  },
  watch: {
    NoteId(n) {
      this.$store.commit("changelocalnoteid", n);
      localStorage.setItem("noteId", JSON.stringify(n));
      this.getNoteData(n);
      this.getCommentData(n);
    },
  },
};
</script>

<style lang="less" scoped>
.NoteDetail {
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: relative;
  background-color: #f6f6f6;
  .nr {
    width: 100%;
    background: #fff;
    margin-bottom: 2vw;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3vw 5vw;
      .left {
        width: 60%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .lbox {
          position: relative;
          margin-right: 2vw;
          flex-shrink: 0;
          img {
            width: 9vw;
            height: 9vw;
            border-radius: 50%;
          }
          span {
            display: inline-block;
            width: 3.5vw;
            height: 3.5vw;
            background: url(@/assets/iconimg/O_1.png) no-repeat center;
            background-size: contain;
            right: 0;
            bottom: 0;
            position: absolute;
            transform: translateY(-1vw);
          }
        }
        .rbox {
          width: 80%;
          flex: 1 1 auto;
          .tbox {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .name {
              width: 50%;
              color: #666666;
              font-size: 3vw;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              font-family: "siyuanMed";
            }
            .vip {
              display: inline-block;
              width: 4vw;
              height: 4vw;
              background: url(@/assets/iconimg/5X.png) no-repeat center;
              background-size: contain;
            }
          }
          .bbox {
            width: 100%;
            text-align: left;
            span {
              color: #9e9e9e;
              font-size: 1.5vw;
            }
          }
        }
      }
      .right {
        span {
          display: inline-block;
          font-size: 3.5vw;
          color: #e64a3b;
          padding: 1vw 4vw;
          border-radius: 5vw;
          border: 2px solid #e64a3b;
          font-family: "siyuanMed";
        }
      }
    }
    .titcon {
      width: 100%;
      padding: 0 5vw;
      font-family: "siyuanMed";
      .tit {
        color: #2a2a2a;
        font-size: 5vw;
        padding: 2.5vw 0;
        padding-bottom: 1.5vw;
      }
      .content {
        width: 100%;
        text-align: justify;
        font-size: 3.5vw;
        color: #666666;
        padding-bottom: 3vw;
      }
    }
  }
  .comment-note {
    width: 100%;
    padding: 0 5vw;
    padding-bottom: 5vw;
    background-color: #fff;
    z-index: 10;
    .com-exit {
      width: 100%;
      padding-bottom: 3vw;
      .conunt {
        padding: 3vw 0;
        width: 100%;
        span {
          font-family: "siyuanMed";
          color: #1a1a1a;
        }
      }
      .for-com {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .lboxs {
          flex-shrink: 0;
          margin-right: 3vw;
          display: flex;
          img {
            width: 9vw;
            height: 9vw;
            border-radius: 50%;
          }
        }
        .ribox {
          width: 80%;
          flex: 1 1 auto;
          .name {
            width: 100%;
            span {
              font-family: "siyuanMed";
              font-size: 4vw;
              color: #666666;
            }
          }
          .con-pl {
            width: 100%;
            p {
              color: #333333;
              font-family: "siyuanMed";
              font-size: 3.5vw;
              line-height: 7vw;
            }
          }
          .tbox {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .time {
              color: #a0a0a0;
              font-size: 1.5vw;
            }
            .zan {
              display: flex;
              align-items: center;
              .like {
                color: #a0a0a0;
                font-size: 1.5vw;
                margin-right: 2vw;
              }
              .tb {
                display: inline-block;
                width: 4vw;
                height: 4vw;
                background: url(@/assets/iconimg/7M.png) no-repeat center;
                background-size: contain;
              }
              .tbs {
                display: inline-block;
                width: 4vw;
                height: 4vw;
                background: url(@/assets/iconimg/1O1.png) no-repeat center;
                background-size: contain;
              }
            }
          }
        }
      }
    }
    .none-com {
      width: 100%;
      padding: 20vw 0;
      p {
        width: 100%;
        text-align: center;
        color: #9e9e9e;
        font-family: "siyuanMed";
        font-size: 4vw;
      }
    }
  }
}
</style>

<style lang="less" scoped>
/deep/.righticon {
  display: inline-block;
  width: 4vw;
  height: 4vw;
  background: url(@/assets/iconimg/4j.png) no-repeat center;
  background-size: contain;
}
/deep/.van-ellipsis {
  font-family: "siyuanMed";
}
/deep/.van-nav-bar .van-icon {
  color: #000;
}
/deep/.van-nav-bar__arrow {
  font-size: 4.5vw;
}
/deep/.van-swipe-item {
  max-height: 120vw;
  align-items: flex-start;
  overflow: hidden;
  img {
    width: 100%;
  }
}
/deep/.van-swipe {
  border-radius: 0;
}
</style>