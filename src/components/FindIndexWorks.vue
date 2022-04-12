<template>
  <div class="FindIndexWorks">
    <div class="works" v-if="findObj">
      <li
        class="find-li"
        v-for="(item, index) in findObj ? findObj.categories : ''"
        @click.stop="toWorks(item)"
        :key="index"
        :style="{ backgroundImage: `url(${item ? item.cover : ''})` }"
      >
        <span>{{ item ? item.category_name : "" }}</span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    findObj: [Object, null],
  },
  methods: {
    toWorks(n) {
      let url = 'https://apis.netstart.cn/xpc/' + n.url.split("/")[3];
      this.$store.commit("changesearchDeatialUrl", url);
      this.$store.commit("changedetailpage",1);
      this.$router.push("/searchdetails");
    },
  },
};
</script>

<style lang="less" scoped>
.FindIndexWorks {
  width: 100%;
  .works {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 3vw;
    .find-li {
      list-style: none;
      width: 49%;
      height: 35vw;
      flex-shrink: 0;
      margin-bottom: 2vw;
      border-radius: 1.5vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      position: relative;
      span {
        position: absolute;
        top: 3vw;
        left: 3vw;
        color: #fff;
        font-family: "siyuanMed";
        font-size: 3.5vw;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>