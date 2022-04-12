<template>
  <div class="videointrod">
    <div class="introd-box">
      <div class="title">
        <p>{{ videoIfoObj ? videoIfoObj.title : "" }}</p>
      </div>
      <div class="detials" v-if="videoIfoObj">
        <span
          class="type"
          v-for="(item, index) in videoIfoObj ? videoIfoObj.categories : ''"
          :key="index"
          >{{ item ? item.category_name : ""
          }}<span
            v-if="item ? item.category_name != item.sub.category_name : false"
            >-{{ item ? item.sub.category_name : "" }}
          </span>
          <span
            v-if="item ? index + 1 != videoIfoObj.categories.length : false"
            class="dian"
          >
            ·
          </span>
        </span>
        <span class="dateTime">{{
          (videoIfoObj ? videoIfoObj.publish_time : "") | formatTime
        }}</span>
        <span class="count"
          >{{
            (videoIfoObj ? videoIfoObj.count.count_view : "") | formatCount
          }}次播放</span
        >
      </div>
      <div class="jj" v-if="videoIfoObj">
        <p :class="{ act: act }">
          {{ videoIfoObj ? videoIfoObj.content : "" }}
        </p>
        <span v-if="act" @click.stop="act = false">展开</span>
      </div>
    </div>

    <VideoIntIcon v-if="videoIfoObj"></VideoIntIcon>

    <TitleSlot>创作人</TitleSlot>
    <VideoAutho></VideoAutho>

    <TitleSlot class="smv-tit">相似视频</TitleSlot>
    <div class="simialvideo">
      <ul class="smv" v-if="simialVideo">
        <SimialVideo
          v-for="(item, index) in simialVideo ? simialVideo.list : ''"
          :key="index"
          :item="item"
          @click.native.stop="toVideo(item ? item : null)"
        ></SimialVideo>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoIntIcon from "@/components/VideoIntIcon.vue";
import SimialVideo from "@/components/SimialVideo.vue";
import TitleSlot from "@/components/TitleSlot.vue";
import VideoAutho from "@/components/VideoAutho.vue";

export default {
  data() {
    return {
      act: true,
    };
  },
  components: {
    VideoIntIcon,
    SimialVideo,
    TitleSlot,
    VideoAutho,
  },
  computed: {
    ...mapState(["videoIfoObj", "localVideoArr", "simialVideo"]),
  },
  watch: {
    "$route.path": function () {
      this.act = true;
    },
  },
  methods: {
    toVideo(v) {
    //   this.$router.push("/videoplay");
      this.$store.commit("changevideoId", v ? v.id : null);
      this.$store.commit("changevideoPoster", v ? v.cover : null);
    },
  },
};
</script>

<style lang="less" scoped>
.videointrod {
  width: 100%;
  padding: 0 5vw;
  .introd-box {
    width: 100%;
    .title {
      padding: 2.5vw 0;
      p {
        font-family: "siyuanMed";
        font-size: 5.5vw;
        color: #1a1a1a;
      }
    }
    .detials {
      color: #a2a2a2;
      display: flex;
      justify-content: flex-start;
      font-size: 1.8vw;
      flex-wrap: wrap;
      align-items: center;
      .type {
        flex-shrink: 0;
        display: inline-block;
        .dian {
          display: inline-block;
          margin: 0 1vw;
        }
      }
      .dateTime {
        flex-shrink: 0;
        margin: 0 4vw;
      }
      .count {
        flex-shrink: 0;
      }
    }
    .jj {
      padding-top: 2.5vw;
      position: relative;
      p {
        font-size: 2.4vw;
        color: #5c5c5c;
        text-align: justify;
      }
      .act {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: auto;
      }
      span {
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        color: #fe0611;
        font-size: 2.8vw;
        background-color: #fff;
        box-shadow: -20px 10px 25px 1px rgba(255, 255, 255, 0.9);
      }
    }
  }
  .smv-tit {
    position: relative;
    &::after {
      content: "";
      top: 0;
      height: 1px;
      width: 100%;
      position: absolute;
      left: 0;
      border-bottom: 1px solid rgba(204, 204, 204, 0.2);
      transform: scaleX(1.5);
    }
  }

  .simialvideo {
    width: 100%;
    .smv {
      width: 100%;
    }
  }
}
</style>