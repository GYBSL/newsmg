import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tab, Tabs } from 'vant';
import '@/common/font/font.css';
import { Tabbar, TabbarItem } from 'vant';
import { Popup } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { PullRefresh } from 'vant';
import { Loading } from 'vant';
import { ShareSheet } from 'vant';
import VueClipboard from 'vue-clipboard2'
import '@/assets/iconfont/iconfont.css'
import { DropdownMenu, DropdownItem } from 'vant';
import { Dialog } from 'vant';
import { Image as VanImage } from 'vant';
import { NavBar } from 'vant';
import waterfall from 'vue-waterfall2'
import { Lazyload } from 'vant';
import { Search } from 'vant';
import { List } from 'vant';
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
Vue.use(List);
Vue.use(Search);
Vue.use(Lazyload);
Vue.use(waterfall)
Vue.use(NavBar);
Vue.use(VanImage);
Vue.use(Dialog);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VueClipboard)
Vue.use(ShareSheet);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.filter('formatCount', (value) => {
  let mat = value >= 10000 ? Math.floor(value / 10000) + "." + String(value % 10000).slice(0, 1) + "w" : value
  return mat
})
Vue.filter('formatDuration', (value) => {
  let minute = value >= 60 ? Math.floor(value / 60) > 9 ? Math.floor(value / 60) : "0" + Math.floor(value / 60) : "00"
  let second = Math.floor(value % 60) > 9 ? Math.floor(value % 60) : "0" + Math.floor(value % 60)
  let mat = minute + ':' + second
  return mat
})
Vue.filter('formatTime', (value) => {
  let formats = function(t){
    const y = t.getFullYear()//年
    const m = (t.getMonth() + 1 + '').padStart(2, '0') //月
    const d = (t.getDate() + '').padStart(2, '0') //日
    const hh = (t.getHours() + '').padStart(2, '0') //时
    const mm = (t.getMinutes() + '').padStart(2, '0') //分
    
    return [y,m,d,hh,mm]
  }

  if(String(value).length==10&&value){
    value=value*1000
  }
  const timesnow=new Date(Date.now())
  const timeValue=new Date(parseInt(value))
  const nowTime = formats(timesnow)
  const dt = formats(timeValue)
  let mat;

  if(nowTime[0]==dt[0]){
    if(nowTime[1]==dt[1]){
      if(nowTime[2]==dt[2]){
        mat=`${dt[3]}:${dt[4]}`
      }else{
        mat=`${dt[1]}-${dt[2]}`
      }
    }else{
      mat=`${dt[1]}-${dt[2]}`
    }
  }else{
    mat=`${dt[0]}-${dt[1]}-${dt[2]}`
  }

  return mat;
})
Vue.filter('formatAge', (value) => {
  if(value){
    let mat ;
    const timesnow=new Date(Date.now())
    const y = timesnow.getFullYear()//年
    mat=y-Number(value.slice(0,4))
    return mat
  }else{
    return '';
  }
})

