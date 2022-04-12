<template>
  <li class="smv-li">
    <div
      class="pic"
      :style="{ backgroundImage: `url(${item ? item.cover : ''})` }"
    >
      <span>{{ (item ? item.duration : "") | formatDuration }}</span>
    </div>
    <div class="video-msg">
      <p class="title">{{ item ? item.title : "" }}</p>
      <p class="count">
        <span class="bf"
          >播放 {{ (item ? item.count.count_view : "") | formatCount }} ·
        </span>
        <span class="like"
          >喜欢 {{ (item ? item.count.count_like : "") | formatCount }}</span
        >
      </p>
      <p class="type">
        {{ item ? item.categories[0].sub.category_name : "" }}
      </p>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    item: [Object, null],
  },
  computed: {
    ...mapState(["simialVideo"]),
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.smv-li {
  width: 100%;
  height: 25vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vw;
  .pic {
    width: 48%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 2vw;
    span {
      display: inline-block;
      width: 10vw;
      height: 5vw;
      font-size: 3vw;
      color: #fff;
      position: absolute;
      bottom: 0;
      right: 3vw;
    }
  }
  .video-msg {
    width: 48%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 1vw 0;
    justify-content: space-between;
    .title {
      font-family: "siyuanMed";
      font-size: 4vw;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: auto;
      color: #191919;
    }
    .count {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-height: auto;
      font-size: 1.5vw;
      color: #a0a0a0;
    }
    .type {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-height: auto;
      color: #616161;
      font-size: 2vw;
      font-family: "siyuanMed";
    }
  }
}
</style>