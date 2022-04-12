import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomeNote from '@/views/HomeNote.vue'
import HomeFind from '@/views/HomeFind.vue'
import HomeMine from '@/views/HomeMine.vue'
import MustSee from '@/components/MustSee.vue'
import UserFeed from '@/components/UserFeed.vue'
import HomeRecommend from '@/components/HomeRecommend.vue'
import CareChoice from '@/components/CareChoice.vue'
import HotVideo from '@/components/HotVideo.vue'
import JqVideo from '@/components/JqVideo.vue'
import SwipeArticle from '@/components/SwipeArticle.vue'
import VideoPlay from '@/components/VideoPlay.vue'
import UserCon from '@/components/UserCon.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import FindSearch from '@/components/FindSearch.vue'
import SearchDetails from '@/components/SearchDetails.vue'
import CkCareChoice from '@/components/CkCareChoice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/recommend'
  },
  {
    path: '/home',
    name: 'homeview',
    component: HomeView,
    redirect: '/home/recommend',
    children: [
      {
        path: 'mustSee',
        name: 'mustSee',
        component: MustSee
      },
      {
        path: 'feed',
        name: 'feed',
        component: UserFeed
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: HomeRecommend
      },
      {
        path: 'selection',
        name: 'selection',
        component: CareChoice,
      },
      {
        path: 'hot',
        name: 'hot',
        component: HotVideo
      },
      {
        path: 'cateRecommend',
        component: JqVideo
      },
    ]
  },
  {
    path: '/note',
    name: 'homenote',
    component: HomeNote
  },
  {
    path: '/find',
    name: 'homefind',
    component: HomeFind,
  },
  {
    path: '/mine',
    name: 'homemine',
    component: HomeMine,
    meta: {
      flag: false
    },
  },
  {
    path: '/swipearc',
    name: 'swipearc',
    component: SwipeArticle
  },
  {
    path: '/videoplay',
    name: 'videoplay',
    component: VideoPlay,
    meta: {
      flag: false
    },
  },
  {
    path: '/user',
    name: 'user',
    component: UserCon,
    meta: {
      flag: false
    },
  },
  {
    path: '/notedetail',
    name: 'notedetail',
    component: NoteDetail,
    meta: {
      flag: false
    },
  },
  {
    path: '/search',
    name: 'search',
    component: FindSearch,
    meta: {
      flag: false
    },
  },
  {
    path: '/searchdetails',
    name: 'searchdetails',
    component: SearchDetails,
    meta: {
      flag: false
    },
  },
  {
    path: '/ckcarechoice',
    name: 'ckcarechoice',
    component: CkCareChoice,
    meta: {
      flag: false
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
