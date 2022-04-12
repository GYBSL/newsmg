<template>
  <div class="FindSearch">
    <div class="van-search van-search--show-action ipt-box">
      <div class="van-search__content van-search__content--square">
        <div class="van-cell van-cell--borderless van-field">
          <div class="van-field__left-icon">
            <i class="van-icon van-icon-search"></i>
          </div>
          <div class="van-cell__value van-cell__value--alone van-field__value">
            <div class="van-field__body">
              <input
                type="search"
                @keyup.stop.enter="onSearch"
                @input.stop="iptMethods"
                @focus.stop="focusMethods"
                placeholder="请输入作品名、创作人"
                class="van-field__control"
                ref="ipts"
                v-model="value"
              />
              <i v-if="showclear" @click.stop="changevalue"></i>
            </div>
          </div>
        </div>
      </div>
      <div
        role="button"
        tabindex="0"
        class="van-search__action"
        @click.stop="onCancel"
      >
        取消
      </div>
    </div>

    <div class="sea-van" v-if="showSearchres && searchdata">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <SearchWorks
          :searchdata="searchdata"
          :iptvalue="value"
          :searchcreater="searchcreater"
          @changeact="changeact"
          :searchdataArr="searchdataArr"
          :createrdataArr="createrdataArr"
        ></SearchWorks>

        <div class="loading">
          <span v-if="showrecloading">加载中...</span>
        </div>
      </van-pull-refresh>
    </div>

    <div class="rec-nr" v-else>
      <div
        class="navtitle"
        v-if="
          searchhistoryData
            ? searchhistoryData.length
              ? searchhistoryData.length
              : false
            : false
        "
      >
        <span>历史记录</span>
        <i @click.stop="deleteAll"></i>
      </div>
      <div
        class="navReclist"
        v-if="
          searchhistoryData
            ? searchhistoryData.length
              ? searchhistoryData.length
              : false
            : false
        "
      >
        <li
          class="reclist"
          v-for="(item, index) in searchhistoryData ? searchhistoryData : ''"
          :key="index"
          @click.stop="toSearchResTwo(item)"
        >
          {{ item ? item : "" }}
        </li>
      </div>

      <div class="navtitle">
        <span>大家都在搜</span>
      </div>
      <div class="navReclist">
        <li
          class="reclist"
          v-for="item in tipAllObj ? tipAllObj.list : ''"
          :key="item.id"
          @click.stop="toSearchRes(item)"
        >
          {{ item ? item.name : "" }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchWorks from "@/components/SearchWorks.vue";

export default {
  data() {
    return {
      value: "",
      flag: true,
      tipAllObj: null,
      showSearchres: false,
      showclear: false,
      isLoading: false,
      isLoadAgain: false,
      act: 0,
      searchhistoryData: null,
    };
  },
  components: {
    SearchWorks,
  },
  computed: {
    ...mapState([
      "SearchBlur",
      "searchdata",
      "searchcreater",
      "searchWorkpage",
      "searchdataArr",
      "showrecloading",
      "searchCreaterpage",
      "createrdataArr",
    ]),
  },
  created() {
    this.getTipAllData();
    let searchhistoryarr = JSON.parse(localStorage.getItem("searchhistory"));
    if (!searchhistoryarr) {
      localStorage.setItem("searchhistory", JSON.stringify([]));
      this.searchhistoryData = [];
    } else {
      this.searchhistoryData = searchhistoryarr;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.getMore);
    window.addEventListener("scroll", this.getMoreCreater);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getMore);
    window.removeEventListener("scroll", this.getMoreCreater);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => {
        window.addEventListener("scroll", vm.getMore);
        window.addEventListener("scroll", vm.getMoreCreater);
        vm.$refs.ipts.focus();
        vm.value = "";
      });
    });
  },
  methods: {
    deleteAll() {
      this.searchhistoryData = [];
      localStorage.setItem("searchhistory", JSON.stringify([]));
    },
    changeact(n) {
      this.act = n;
    },
    getMore() {
      if (this.searchdata && this.act == 0) {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.searchdata) {
          if (
            this.searchWorkpage >
            Math.ceil(this.searchdata.total / this.searchdata.per_page)
          ) {
            this.$store.commit("changeshowrecloading", false);
            return;
          } else {
            this.sendTime = setTimeout(() => {
              if (
                document.documentElement.scrollTop +
                  document.documentElement.clientHeight +
                  20 >
                document.documentElement.offsetHeight
              ) {
                this.$store.commit("changeshowrecloading", true);
                this.$store.commit("changesearchWorkpage");
              }
            }, 500);
          }
        } else {
          this.sendTime = setTimeout(() => {
            if (
              document.documentElement.scrollTop +
                document.documentElement.clientHeight +
                20 >
              document.documentElement.offsetHeight
            ) {
              this.$store.commit("changeshowrecloading", true);
              this.$store.commit("changesearchWorkpage");
            }
          }, 500);
        }
      }
    },
    getMoreCreater() {
      if (this.searchcreater && this.act == 1) {
        if (this.sendTime) {
          clearTimeout(this.sendTime);
        }

        if (this.searchcreater) {
          if (
            this.searchCreaterpage >
            Math.ceil(this.searchcreater.total / this.searchcreater.per_page)
          ) {
            this.$store.commit("changeshowrecloading", false);
            return;
          } else {
            this.sendTime = setTimeout(() => {
              if (
                document.documentElement.scrollTop +
                  document.documentElement.clientHeight +
                  20 >
                document.documentElement.offsetHeight
              ) {
                this.$store.commit("changeshowrecloading", true);
                this.$store.commit("changesearchCreaterpage");
              }
            }, 500);
          }
        } else {
          this.sendTime = setTimeout(() => {
            if (
              document.documentElement.scrollTop +
                document.documentElement.clientHeight +
                20 >
              document.documentElement.offsetHeight
            ) {
              this.$store.commit("changeshowrecloading", true);
              this.$store.commit("changesearchCreaterpage");
            }
          }, 500);
        }
      }
    },
    onSearch() {
      this.$refs.ipts.blur();
      if (this.value.trim() != "") {
        this.getSerchData(this.value.trim());
        this.getCreater(this.value.trim());
        if (this.searchhistoryData.includes(this.value.trim())) {
          return;
        }
        this.searchhistoryData.push(this.value.trim());
        localStorage.setItem(
          "searchhistory",
          JSON.stringify(this.searchhistoryData)
        );
      }
    },
    onCancel() {
      this.$router.back();
    },
    iptMethods() {
      if (this.value != "") {
        this.showclear = true;
      } else {
        this.showclear = false;
      }
    },
    changevalue() {
      this.value = "";
      this.showclear = false;
      this.showSearchres = false;
      this.$store.commit("changesearchdata", null);
    },
    getTipAllData() {
      this.axios
        .get("https://apis.netstart.cn/xpc/search/recommend_kws")
        .then((res) => {
          this.tipAllObj = res.data.data;
        });
    },
    getSerchData(n, p) {
      if (p) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=article&kw=${n}&sort=hot&page=${p}`
          )
          .then((res) => {
            this.$store.commit("changeshowrecloading", false);
            this.$store.commit("changesearchdataArr", [
              ...this.searchdataArr,
              ...res.data.data.list,
            ]);
            this.showSearchres = true;
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
      } else {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=article&kw=${n}&sort=hot`
          )
          .then((res) => {
            this.$store.commit("changesearchdata", res.data.data);
            this.$store.commit("changesearchdataArr", res.data.data.list);
            this.showSearchres = true;
            this.$store.commit("changeshowrecloading", false);
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
      }
    },
    getCreater(n, p) {
      if (p) {
        this.axios
          .get(
            `https://apis.netstart.cn/xpc/search?type=creator&kw=${n}&page=${p}`
          )
          .then((res) => {
            this.$store.commit("changeshowrecloading", false);
            this.$store.commit("changecreaterdataArr", [
              ...this.createrdataArr,
              ...res.data.data.list,
            ]);
            this.showSearchres = true;
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
      } else {
        this.axios
          .get(`https://apis.netstart.cn/xpc/search?type=creator&kw=${n}`)
          .then((res) => {
            this.$store.commit("changesearchcreater", res.data.data);
            this.$store.commit("changecreaterdataArr", res.data.data.list);
            if (this.isLoadAgain) {
              this.isLoading = false;
              this.isLoadAgain = false;
            }
          });
      }
    },
    onRefresh() {
      this.isLoadAgain = true;
      this.getSerchData(this.value.trim());
    },
    toSearchRes(v) {
      this.value = v.name;
      this.getSerchData(v.name);
      this.getCreater(v.name);
      if (this.searchhistoryData.includes(v.name)) {
        return;
      }
      this.searchhistoryData.push(v.name);
      localStorage.setItem(
        "searchhistory",
        JSON.stringify(this.searchhistoryData)
      );
    },
    toSearchResTwo(v) {
      this.value = v;
      this.getSerchData(v);
      this.getCreater(v);
    },
    focusMethods() {
      this.showSearchres = false;
      this.$store.commit("changesearchdata", null);
    },
  },
  watch: {
    value() {
      if (this.value != "") {
        this.showclear = true;
      } else {
        this.showclear = false;
        this.showSearchres = false;
        this.$store.commit("changesearchdata", null);
      }
    },
    searchWorkpage(n) {
      if (this.value != "") {
        this.getSerchData(this.value, n);
      }
    },
    searchCreaterpage(n) {
      if (this.value != "") {
        this.getCreater(this.value, n);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.FindSearch {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
  position: relative;
  padding-top: 54px;
  .ipt-box {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid rgba(204, 204, 204, 0.2);
    }
  }
  .rec-nr {
    width: 100%;
    .navtitle {
      width: 100%;
      padding: 3vw 5vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #a1a1a1;
        font-size: 3.7vw;
      }
      i {
        display: inline-block;
        width: 4vw;
        height: 4vw;
        background: url(@/assets/iconimg/7o.png) no-repeat center;
        background-size: contain;
      }
    }
    .navReclist {
      width: 100%;
      padding: 0 5vw;
      .reclist {
        color: #1a1a1a;
        font-size: 3vw;
        padding: 2vw 4vw;
        background-color: #f7f7f7;
        margin-right: 2.5vw;
        margin-bottom: 2.5vw;
        border-radius: 4px;
        display: inline-block;
        flex-shrink: 0;
        list-style: none;
      }
    }
  }
}
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  span {
    display: inline-block;
    font-family: "siyuanMed";
    font-size: 2.5vw;
    color: #1b1b1b;
    padding: 1.5vw;
  }
}
</style>

<style lang="less" scoped>
/deep/.van-search__action:active {
  background: transparent;
}
/deep/.van-search__content {
  background-color: #efefef;
  border-radius: 2vw;
}
/deep/.van-search {
  padding-right: 5vw;
  padding-left: 5vw;
}
/deep/.van-field__body {
  i {
    display: inline-block;
    width: 4vw;
    height: 4vw;
    background: url(@/assets/iconimg/hq.png) no-repeat center;
    background-size: contain;
    flex-shrink: 0;
  }
}
</style>