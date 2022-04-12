<template>
  <div class="big-li">
    <li
      v-if="BigChildren ? BigChildren.type == 'uiBigCard' : false"
      @click="toVideoArc()"
      class="mid-lis"
    >
      <div class="tx">
        <div class="img-box">
          <div class="tx-img">
            <img
              :src="
                BigChildren
                  ? BigChildren.children[0].model.resource.creator.avatar
                  : ''
              "
              alt=""
            />
          </div>
          <span class="username">{{
            BigChildren
              ? BigChildren.children[0].model.resource.creator.username
              : ""
          }}</span>
        </div>
        <span class="more" @click.stop="changeShowShare"></span>
      </div>
      <div class="title">
        {{ BigChildren ? BigChildren.children[0].model.resource.title : "" }}
      </div>
      <div class="tp">
        <img
          :src="BigChildren ? BigChildren.children[0].model.resource.cover : ''"
          alt=""
          class="vanImage"
        />
      </div>
      <div class="bottom">
        <span class="left">立即查看</span>
        <span class="right">推广</span>
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
    };
  },
  props: {
    BigChildren: [Object, null],
  },
  created() {},
  computed: {
    ...mapState(["shareVideoItem"]),
    str() {
      return this.BigChildren.children[0].model.resource.url
        .split("%")[4]
        .slice(2);
    },
  },
  methods: {
    toVideoArc() {
      this.$store.commit("changeEarcId", this.str);
      this.$router.push("/swipearc");
    },
    onSelect(option) {
      this.showShare = false;
      let urls = "https://www.xinpianchang.com/" + this.str;
      if (option.name == "复制链接" && this.shareVideoItem) {
        this.$copyText(urls).then(
          () => {
            Toast("复制成功！");
          },
          () => {
            Toast("复制失败！");
          }
        );
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
      this.$store.commit("changeshareVideoItem", this.BigChildren);
    },
  },
};
</script>

<style lang="less" scoped>
.big-li {
  width: 100%;
  .mid-lis {
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
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
    }
  }
  .tx {
    font-family: "siyuanMed";
    padding: 0 2.8vw;
    padding-top: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img-box {
      flex: 1 1 auto;
      display: flex;
      .tx-img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .username {
        display: inline-block;
        font-size: 0.8rem;
        color: #191919;
        display: flex;
        align-items: center;
        margin-left: 8px;
      }
    }
    .more {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url(@/assets/iconimg/more.svg) no-repeat center;
      background-size: contain;
      transform: translateX(1vw);
    }
  }
  .title {
    font-size: 0.85rem;
    font-family: "siyuanMed";
    padding: 5px 2.8vw;
    box-sizing: border-box;
  }
  .bottom {
    padding: 10px 2.8vw;
    font-family: "siyuanMed";
    font-size: 0.6rem;
    color: #575757;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>