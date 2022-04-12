<template>
  <div class="VideoAutho">
    <li
      class="author"
      @touchstart.stop=""
      @touchend.stop=""
      @touchmove.stop=""
      @click.stop='touser'
      v-if="videoIfoObj ? true : false"
    >
      <div class="tx-inf">
        <div class="tx">
          <img
            :src="videoIfoObj ? videoIfoObj.author.userinfo.avatar : ''"
            alt=""
          />
          <span
            v-if="videoIfoObj ? videoIfoObj.author.userinfo.vip_flag : false"
          ></span>
        </div>
        <div class="aut">
          <p class="name">
            {{ videoIfoObj ? videoIfoObj.author.userinfo.username : "" }}
          </p>
          <p class="role">
            {{ videoIfoObj ? videoIfoObj.author.role : "" }}
          </p>
        </div>
      </div>
      <div class="gz">
        <span @click.stop="">关注</span>
      </div>
    </li>
    <template v-if="videoIfoObj ? videoIfoObj.team.length : false">
      <li
        class="team"
        v-for="(item, index) in videoIfoObj ? videoIfoObj.team : ''"
        :key="item ? item.userinfo.id : index"
        @touchstart.stop=""
        @touchend.stop=""
        @touchmove.stop=""
        @click.stop='toteamUser(item?item.userinfo.id:null)'
      >
        <div class="tx-inf">
          <div class="tx">
            <img :src="item ? item.userinfo.avatar : ''" alt="" />
            <span v-if="item ? item.userinfo.vip_flag : false"></span>
          </div>
          <div class="aut">
            <p class="name">
              {{ item ? item.userinfo.username : "" }}
            </p>
            <p class="role">
              {{ item ? item.role : "" }}
            </p>
          </div>
        </div>
        <div class="gz">
          <span @click.stop="">关注</span>
        </div>
      </li>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["videoIfoObj"]),
  },
  methods: {
    touser(){
      this.$store.commit('changeuserId',this.videoIfoObj.author.userinfo.id)
      this.$router.push('/user')
    },
    toteamUser(v){
      if(v){
        this.$store.commit('changeuserId',v)
        this.$router.push('/user')
      }
    },
  },
};
</script>

<style lang="less" scoped>
.VideoAutho {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  justify-content: flex-start;
  flex-wrap: nowrap;
  padding: 1.5vw;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .author {
    width: 60vw;
    height: 15vw;
    display: flex;
    flex-shrink: 0;
    border-radius: 3vw;
    box-shadow: 0 0 2px 2px rgba(179, 179, 179, 0.1);
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2vw;
    margin-left: -1.1vw;
    .tx-inf {
      width: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .tx {
        width: 12vw;
        height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-right: 2vw;
        img {
          width: 11vw;
          height: 11vw;
          border-radius: 50%;
          flex-shrink: 0;
        }
        span {
          position: absolute;
          bottom: 0;
          right: 0;
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/O_1.png) no-repeat center;
          background-size: contain;
        }
      }
      .aut {
        width: 50%;
        flex-shrink: 0;
        .name {
          font-size: 3.9vw;
          color: #191919;
          font-family: "siyuanMed";
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .role {
          font-size: 1.5vw;
          color: #a8a8a8;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .gz {
      width: 17vw;
      height: 7vw;
      display: flex;
      border-radius: 5vw;
      justify-content: center;
      align-items: center;
      background-color: #faede7;
      span {
        font-family: "siyuanMed";
        font-size: 1.5vw;
        color: #e24e40;
      }
    }
  }
  .team {
    width: 60vw;
    height: 15vw;
    display: flex;
    flex-shrink: 0;
    border-radius: 3vw;
    box-shadow: 0 0 2px 2px rgba(179, 179, 179, 0.1);
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2vw;
    margin-left: 4vw;
    .tx-inf {
      width: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .tx {
        width: 12vw;
        height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-right: 2vw;
        img {
          width: 11vw;
          height: 11vw;
          border-radius: 50%;
          flex-shrink: 0;
        }
        span {
          position: absolute;
          bottom: 0;
          right: 0;
          display: inline-block;
          width: 4vw;
          height: 4vw;
          background: url(@/assets/iconimg/O_1.png) no-repeat center;
          background-size: contain;
        }
      }
      .aut {
        width: 50%;
        flex-shrink: 0;
        .name {
          font-size: 3.9vw;
          color: #191919;
          font-family: "siyuanMed";
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .role {
          font-size: 1.5vw;
          color: #a8a8a8;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .gz {
      width: 17vw;
      height: 7vw;
      display: flex;
      border-radius: 5vw;
      justify-content: center;
      align-items: center;
      background-color: #faede7;
      span {
        font-family: "siyuanMed";
        font-size: 1.5vw;
        color: #e24e40;
      }
    }
  }
}
</style>