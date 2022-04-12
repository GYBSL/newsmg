<template>
  <div class="UserMsg" v-if="userItem">
    <div class="top">
      <div class="tit">基本资料</div>
      <div class="zl">
        <table>
          <tr>
            <td class="left">性别</td>
            <td v-if="userItem ? userItem.sex == 2 : false">女</td>
            <td v-else>男</td>
          </tr>
          <tr>
            <td class="left">年龄</td>
            <td v-if="userItem ? userItem.birthday.length : false">{{(userItem.birthday.length?userItem.birthday:null) | formatAge}}</td>
            <td v-else>未知</td>
          </tr>
          <tr>
            <td class="left">所在地区</td>
            <td v-if="userItem.location ? Object.keys(userItem.location).length : false">
              {{
                userItem.location ?userItem.location.province
                  ? userItem.location.province.name
                  : "":''
              }}
              {{
                userItem.location ?userItem.location.country ? userItem.location.country.name : "":''
              }}
              {{ userItem.location ?userItem.location.city ? userItem.location.city.name : "":'' }}
              {{ userItem.location ?userItem.location.area ? userItem.location.area.name : "":'' }}
            </td>
          </tr>
          <tr>
            <td class="left">简介</td>
            <td>{{ userItem ? userItem.about : "" }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom">
      <div class="tit">认证信息</div>
      <div class="zl">
        <table>
          <tr>
            <td class="left">认证身份</td>
            <td>{{ userItem.occupation ? userItem.occupation : "" }}</td>
          </tr>
          <tr>
            <td class="left">认证描述</td>
            <td>
              {{
                userItem.verify_description ? userItem.verify_description : ""
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userItem"]),
  },
};
</script>

<style lang="less" scoped>
.UserMsg {
  width: 100%;
  padding: 0 5vw;
  .top {
    width: 100%;
    .tit {
      width: 100%;
      font-family: "siyuanMed";
      font-size: 3.5vw;
      color: #0c0c0c;
      text-align: left;
      padding: 5vw 0;
    }
    .zl {
      width: 100%;
      table {
        width: 100%;
        tr {
          font-family: "siyuanMed";
          width: 100%;
          td {
            width: 75%;
            color: #1b1b1b;
            text-align: left;
            font-size: 2.5vw;
            padding: 1.5vw 0;
          }
          .left {
            width: 25%;
            font-size: 2.5vw;
            color: #a5a5a5;
            padding: 0;
            text-align: left;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    .tit {
      width: 100%;
      font-family: "siyuanMed";
      font-size: 3.5vw;
      color: #0c0c0c;
      text-align: left;
      padding: 5vw 0;
    }
    .zl {
      width: 100%;
      table {
          width: 100%;
        tr {
          font-family: "siyuanMed";
          width: 100%;
          td {
            width: 75%;
            color: #1b1b1b;
            text-align: left;
            font-size: 2.5vw;
            padding: 1.5vw 0;
          }
          .left {
            width: 25%;
            font-size: 2.5vw;
            color: #a5a5a5;
            padding: 0;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>