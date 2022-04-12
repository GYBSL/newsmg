<template>
  <div class="HomeMine">
    <div class="mine" :class="{ show: showNavTit }">
      <span>我的</span>
    </div>
    <div class="set">
      <div class="rtb">
        <span class="ewm"></span>
        <span class="setspan"></span>
      </div>
    </div>
    <div class="tx">
      <div class="pic">
        <!-- <img @click="showPopup" src="@/assets/iconimg/6R.png" alt="" /> -->
        <img src="@/assets/iconimg/6R.png" alt="" />
      </div>
      <div class="names">
        <!-- <span @click="showPopup">点击登录</span> -->
        <span>点击登录</span>
      </div>
    </div>

    <div class="create">
      <div class="titwz">
        <span class="lwz">创作中心</span>
        <span class="rwz">草稿箱</span>
      </div>
      <div class="btbox">
        <div class="sub">
          <div class="pic">
            <img src="@/assets/iconimg/5a.png" alt="" />
          </div>
          <div class="wb">
            <p class="top">发布公开作品</p>
            <p class="bot">分享你的个作品</p>
          </div>
        </div>
        <div class="onw">
          <div class="pic">
            <img src="@/assets/iconimg/6_.png" alt="" />
          </div>
          <div class="wb">
            <p class="top">上传私密视频</p>
            <p class="bot">加密分享，高清播放</p>
          </div>
        </div>
      </div>
    </div>

    <div class="list-mine">
      <van-grid :column-num="1">
        <van-grid-item
          v-for="(value, index) in listLi"
          :key="index"
          :text="value"
        />
      </van-grid>
    </div>

    <!-- 弹出层登录 -->
    <van-popup
      v-model="showload"
      :closeable="true"
      close-icon-position="top-left"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="zc">
        <span @click.stop="showPopupZc">注册</span>
      </div>
      <div class="titload">
        <span>登录</span>
      </div>
      <div class="inp">
        <div class="tbox">
          <input v-model="dlname" type="text" placeholder="请输入用户名" />
        </div>
        <div class="bbox">
          <input v-model="dlpassword" type="password" name="" id="" placeholder="请输入密码" />
        </div>
      </div>
      <div class="load-bor">
        <span @click.stop="loadaccount">登录</span>
      </div>
    </van-popup>

    <!-- 弹出层注册 -->
    <van-popup
      v-model="showzc"
      :closeable="true"
      :close-icon="require('@/assets/iconimg/vi.png')"
      close-icon-position="top-left"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="zc-tit">
        <span>注册</span>
      </div>
      <div class="zc-ipt">
        <div class="tbox">
          <input v-model="zcname" type="text" placeholder="请设置用户名" />
        </div>
        <div class="bbox">
          <input v-model="zcpassword" type="password" name="" id="" placeholder="请设置密码" />
        </div>
      </div>
      <div class="zc-bor">
        <span @click.stop="register">注册</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      listLi: [
        "传输列表",
        "会员中心",
        "私密视频",
        "我的课程",
        "我的订单",
        "作品通",
        "新片场认证",
      ],
      showNavTit: false,
      showload: false,
      showzc: false,
      zcname: '',
      zcpassword: '',
      dlname: '',
      dlpassword: '',
    };
  },
  computed: {
    ...mapState([]),
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.showNav);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.showNav);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.showNav);
    next();
  },
  methods: {
    loadaccount(){},
    register(){},
    showPopup() {
      this.showload = true;
    },
    showPopupZc() {
      this.showzc = true;
    },
    showNav() {
      if (this.$route.path == "/mine") {
        if (this.sendTimes) {
          clearTimeout(this.sendTimes);
        }

        this.sendTimes = setTimeout(() => {
          if (document.documentElement.scrollTop > 0) {
            this.showNavTit = true;
          } else if (document.documentElement.scrollTop == 0) {
            this.showNavTit = false;
          }
        }, 100);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.HomeMine {
  width: 100%;
  background-color: #f7f7f7;
  position: relative;
  padding-bottom: 70px;
  .mine {
    width: 100%;
    height: 54px;
    position: fixed;
    top: 0;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
    text-align: center;
    opacity: 0;
    &.show {
      opacity: 1;
    }
    span {
      color: #1a1a1a;
      font-family: "siyuanMed";
      font-size: 5vw;
      line-height: 54px;
    }
  }
  .set {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    height: 54px;
    .rtb {
      display: flex;
      align-items: center;
      .ewm {
        display: inline-block;
        width: 5vw;
        height: 5vw;
        background: url(@/assets/iconimg/Vs.png) no-repeat center;
        background-size: contain;
        margin-right: 5vw;
      }
      .setspan {
        display: inline-block;
        width: 5.5vw;
        height: 5.5vw;
        background: url(@/assets/iconimg/set.png) no-repeat center;
        margin-right: 5vw;
        background-size: contain;
      }
    }
  }
  .tx {
    width: 100%;
    padding: 20vw 0;
    padding-bottom: 15vw;
    .pic {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5vw;
      img {
        width: 15vw;
        height: 15vw;
      }
    }
    .names {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 3.5vw;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
  }
  .create {
    width: 100%;
    padding: 0 5vw;
    .titwz {
      color: #1a1a1a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "siyuanMed";
      padding: 2vw 0;
      .lwz {
        font-size: 4vw;
      }
      .rwz {
        font-size: 3vw;
      }
    }
    .btbox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "siyuanMed";
      margin-bottom: 4vw;
      .sub {
        flex-shrink: 0;
        width: 49%;
        padding: 2vw;
        background-color: #fff;
        display: flex;
        border-radius: 5px;
        .pic {
          margin-right: 1.5vw;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            flex-shrink: 0;
            width: 8.5vw;
            height: 8.5vw;
          }
        }
        .wb {
          flex-shrink: 0;
          .top {
            color: #1a1a1a;
            font-size: 4vw;
          }
          .bot {
            color: #b1b1b1;
            font-size: 1vw;
          }
        }
      }
      .onw {
        flex-shrink: 0;
        width: 49%;
        padding: 2vw;
        border-radius: 5px;
        display: flex;
        background-color: #fff;
        .pic {
          margin-right: 1.5vw;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            flex-shrink: 0;
            width: 8.5vw;
            height: 8.5vw;
          }
        }
        .wb {
          flex-shrink: 0;
          .top {
            color: #1a1a1a;
            font-size: 4vw;
          }
          .bot {
            color: #b1b1b1;
            font-size: 1vw;
          }
        }
      }
    }
  }
  .list-mine {
    width: 100%;
  }
}
</style>

<style lang="less" scoped>
/deep/.van-grid-item__content--center {
  align-items: flex-start;
}
/deep/.van-grid-item {
  padding: 0 5vw;
  background-color: #fff;
}
/deep/.van-grid-item__content::after {
  border-width: 0 0 1px 0;
}
/deep/.van-grid-item__content {
  padding: 16px 0;
}
/deep/.van-grid-item__text {
  color: #1a1a1a;
  font-family: "siyuanMed";
  font-size: 4vw;
}
</style>