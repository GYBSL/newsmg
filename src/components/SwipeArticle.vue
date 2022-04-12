<template>
  <div class="ifr-bg">
    <div class="back">
      <span @click="$router.back()"></span>
    </div>
    <iframe
      :src="`https://www.xinpianchang.com/${earcId}`"
      class="ifr"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["earcId"]),
  },
};
</script>

<style lang="less" scoped>
.ifr-bg {
  z-index: 200;
  position: relative;
  .back {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    height: 40px;
    display: flex;
    align-items: center;
    position: absolute;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-left: 15px;
      background: url(@/assets/iconimg/back.svg) no-repeat center;
      background-size: contain;
    }
  }
  .ifr {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    // #document {
    //   &::-webkit-scrollbar-track {
    //     background-color: #f5f5f5 !important;
    //   }
    //   &::-webkit-scrollbar {
    //     width: 10px;
    //     background-color: #f5f5f5 !important;
    //   }
    //   &::-webkit-scrollbar-thumb {
    //     background-color: #000000 !important;
    //     border: 2px solid #555555 !important;
    //   }
    // }
  }
}
</style>

