<template>
  <div class="notes">
    <van-nav-bar
      title="手记精选"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
    >
      <template #right>
        <span class="righticon"></span>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="notebox" v-if="noteObj">
        <waterfall
          :col="2"
          :width="itemWidth"
          :gutterWidth="gutterWidth"
          :data="noteObj"
          :lazyDistance="lazy"
          @loadmore="loadmore"
          @scroll="scroll"
        >
          <template>
            <div
              class="noteCard"
              v-for="(item, index) in noteObj"
              :item="item"
              :key="index"
              @click.stop="toNote(item.id)"
            >
              <div class="pic">
                <img :src="item ? item.images[0] : ''" alt="" />
              </div>
              <div class="bot">
                <div class="tit">
                  <span>{{ item ? item.title : "" }}</span>
                </div>
                <div class="user">
                  <div class="lbox">
                    <div class="tx">
                      <img
                        :lazy-src="item ? item.user.avatar : ''"
                        @click.stop="toUser(item.user)"
                        alt=""
                      />
                      <span v-if="item ? item.user.vip_flag : false"></span>
                    </div>
                    <span class="name">{{
                      item ? item.user.username : ""
                    }}</span>
                    <span
                      class="vip"
                      v-if="item ? item.user.vip_status : false"
                    ></span>
                  </div>
                  <div class="rbox">
                    <span class="count">{{
                      item ? item.count.count_liked : ""
                    }}</span>
                    <span class="tb" v-if="islike" @click.stop=""></span>
                    <span class="tbs" v-else @click.stop=""></span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </waterfall>
      </div>

      <div class="loading">
        <span v-if="showrecloading">加载中...</span>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
      isLoadAgain: false,
      lazy: 500,
      islike: true,
    };
  },
  components: {},
  computed: {
    ...mapState(["notePage", "noteObj", "showrecloading"]),
    itemWidth() {
      return (document.documentElement.clientWidth / 100) * 48.5;
    },
    gutterWidth() {
      return 1 * (document.documentElement.clientWidth / 100);
    },
  },
  created() {
    this.getnoteData(this.notePage);
  },
  methods: {
    getnoteData(n) {
      this.axios
        .get(`https://apis.netstart.cn/xpc/notes?page=${n}`)
        .then((res) => {
          this.$store.commit("changenoteObj", res.data.data.list);
          this.$store.commit("changeapploading", false);
          if (this.isLoadAgain) {
            this.isLoading = false;
            this.isLoadAgain = false;
          }
        });
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getnoteData();
    },
    scroll() {
      if (this.$route.path == "/note") {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.recObjItem) {
          this.sendTime = setTimeout(() => {
            if (
              document.documentElement.scrollTop +
                document.documentElement.clientHeight +
                20 >
              document.documentElement.offsetHeight
            ) {
              this.$store.commit("changeshowrecloading", true);
              this.$store.commit("changenotePage");
            }
          }, 500);
        }
      }
    },
    loadmore() {
      this.$store.commit("changenotePage");
      this.axios
        .get(`https://apis.netstart.cn/xpc/notes?page=${this.notePage}`)
        .then((res) => {
          this.$store.commit("changenoteObj", [
            ...this.noteObj,
            ...res.data.data.list,
          ]);
          this.$store.commit("changeshowrecloading", false);
        });
    },
    toNote(v) {
      this.$store.commit("changeNoteId", v ? v : null);
      this.$router.push("/notedetail");
    },
    toUser(v) {
      this.$store.commit("changeuserId", v.id);
      this.$router.push("/user");
    },
    like(){
        if(this.islike){
            this.islike=false
        }else{
            this.islike=true
        }
    },
  },
};
</script>

<style lang="less" scoped>
.notes {
  width: 100%;
  background-color: #f7f7f7;
  padding-bottom: 60px;
  .notebox {
    width: 100%;
    padding: 0 1vw;
    display: flex;
    justify-content: center;
    padding-top: 2vw;
  }
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
  }
}
</style>

<style lang="less" scoped>
/deep/.righticon {
  display: inline-block;
  width: 4.5vw;
  height: 4.5vw;
  background: url(@/assets/iconimg/_52.png) no-repeat center;
  background-size: contain;
}
/deep/.van-ellipsis {
  font-family: "siyuanMed";
}
/deep/.van-hairline--bottom::after {
  border-bottom-width: 0;
}
</style>

<style lang="less" scoped>
.noteCard {
  width: 100%;
  margin-bottom: 2vw;
  background-color: #fff;
  border-radius: 2vw;
  overflow: hidden;
  .pic {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .bot {
    width: 100%;
    .tit {
      width: 100%;
      padding: 2vw 2vw;
      span {
        font-family: "siyuanMed";
        font-size: 3.8vw;
        color: #2b2b2b;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .user {
      width: 100%;
      padding: 0 2vw;
      padding-bottom: 3vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lbox {
        display: flex;
        align-items: center;
        .tx {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          img {
            width: 6vw;
            height: 6vw;
            border-radius: 50%;
          }
          span {
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 2.5vw;
            height: 2.5vw;
            background: url(@/assets/iconimg/O_1.png) no-repeat center;
            background-size: contain;
          }
        }
        .name {
          width: 40%;
          font-family: "siyuanMed";
          font-size: 2vw;
          flex: 1 1 auto;
          color: #5e5e5e;
          margin-left: 2vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .vip {
          display: inline-block;
          flex-shrink: 0;
          width: 5vw;
          height: 5vw;
          background: url(@/assets/iconimg/5X.png) no-repeat center;
          background-size: contain;
        }
      }
      .rbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .count {
          flex-shrink: 0;
          color: #a1a1a1;
          font-size: 2vw;
          margin-right: 1vw;
        }
        .tb {
          flex-shrink: 0;
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/7M.png) no-repeat center;
          background-size: contain;
        }
        .tbs {
          flex-shrink: 0;
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
</style>