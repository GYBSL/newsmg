<template>
  <div class="col-li">
    <div class="title">
      <span class="authors">推荐创作人</span>
      <span class="more" @click.stop="">查看更多 ></span>
    </div>
    <div class="lis-box">
      <li
        v-for="(item, index) in ColChildren ? ColChildren.children : ''"
        :key="index"
        @click.stop="toUser(item?item.model.resource.id:null)"
      >
        <p class="p-all p-img">
          <img
            :src="
              item ? item.model.resource.articles[0].author.userinfo.avatar : ''
            "
            alt=""
          />
        </p>
        <p class="p-all p-name">
          <span>{{ item ? item.model.resource.username : "" }}</span>
          <i></i>
        </p>
        <p class="p-all p-ifo">
          <span
            >{{
              item
                ? item.model.resource.articles[0].author.userinfo.count
                    .count_article
                : ""
            }}
            作品 ·
            {{
              item
                ? item.model.resource.articles[0].author.userinfo.count
                    .count_follower
                : ""
            }}
            粉丝</span
          >
        </p>
        <p class="p-all p-job">
          <span>{{
            item
              ? item.model.resource.articles[0].categories[0].category_name
              : ""
          }}</span>
        </p>
        <p class="p-all p-flo">
          <span>+ 关注</span>
        </p>
      </li>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    ColChildren: [Object, null],
  },
  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    toUser(i) {
      if(i){
        this.$store.commit('changeuserId',i)
      }
      this.$router.push("/user");
    },
  },
};
</script>

<style lang="less" scoped>
.col-li {
  width: 100%;
  overflow: scroll;
  font-family: "siyuanMed";
  .title {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .authors {
      font-size: 1.1rem;
      color: #1c1c1c;
    }
    .more {
      font-size: 0.7rem;
      color: #a7a7a7;
    }
  }
  .lis-box {
    width: 100%;
    display: flex;
    overflow-x: scroll;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    li {
      width: 40vw;
      height: 25vh;
      margin-right: 10px;
      background-color: #fff;
      flex-shrink: 0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      padding-bottom: 10px;
      .p-all {
        color: #1c1c1c;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .p-img {
        margin-top: 15px;
        width: 100%;
        img {
          width: 11vw;
          height: 11vw;
          border-radius: 50%;
        }
      }
      .p-name {
        width: 100%;
        padding: 0 3.63vw;
        span {
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        i {
          display: inline-block;
          width: 15px;
          height: 15px;
          margin-left: 5px;
          background: url(@/assets/iconimg/5X.png) no-repeat center;
          background-size: contain;
          flex-shrink: 0;
        }
      }
      .p-ifo {
        width: 100%;
        text-align: center;
        span {
          font-size: 0.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #a2a2a2;
        }
      }
      .p-job {
        width: 100%;
        text-align: center;
        span {
          font-size: 0.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #a2a2a2;
        }
      }
      .p-flo {
        width: 100%;
        span {
          color: #fff;
          width: 18vw;
          height: 8vw;
          border-radius: 10vw;
          background-color: #e44b39;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>