import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recObj: null,
    recObjItem: null,
    earcId: null,
    videoId: null,
    videoIfoObj: null,
    localVideoArr: [],
    videoPoster: null,
    shareVideoItem: null,
    codeData: null,
    simialVideo: null,
    showSpan: false,
    localcollectArr: [],
    locallikeArr: [],
    videoComments: null,
    compage: 1,
    videoComTotalObj: null,
    showComloading: false,
    userId: null,
    userItem: null,
    localuserId: null,
    workspage: 1,
    worksItem: null,
    orgWorksItem: null,
    showworksloading: false,
    showend: false,
    recpage: 1,
    showrecloading: false,
    carechoiceObj: null,
    apploading: true,
    cardsVideoId: null,
    cardsVideoObj: null,
    showVideoCarePost: true,
    playingCardVideoNode: null,
    localcollectCard: [],
    locallikecard: [],
    hotvideoobj: null,
    jqvideoObj: null,
    jqpage: 1,
    jqvideoArr: null,
    mustSeeObj: null,
    mustSeeArr: null,
    userfeedArr: null,
    userfeedObj: null,
    notePage: 1,
    noteObj: null,
    NoteId: null,
    NoteDeaobj: null,
    localnoteid: [],
    notecom: null,
    findObj: null,
    SearchBlur: false,
    searchdata: null,
    searchcreater: null,
    searchWorkpage: 1,
    searchdataArr: null,
    searchCreaterpage: 1,
    createrdataArr: null,
    searchDeatialUrl: null,
    searchDeatialUrls: null,
    searchDetailObjs: null,
    searchDetailObj: null,
    detailpage: 1,
    searchDetailArr: null,
    searchDetailArrs: null,
    hotflag: false,
    hottitle: '',
    hotrecflag: false,
  },
  getters: {
  },
  mutations: {
    changeRecData(state, n) {
      state.recObj = n
    },
    changefindObj(state, n) {
      state.findObj = n
    },
    changehotrecflag(state, n) {
      state.hotrecflag = n
    },
    changehottitle(state, n) {
      state.hottitle = n
    },
    changehotflag(state, n) {
      state.hotflag = n
    },
    changesearchDetailArr(state, n) {
      state.searchDetailArr = n
    },
    changesearchDetailArrs(state, n) {
      state.searchDetailArrs = n
    },
    changesearchDetailObjs(state, n) {
      state.searchDetailObjs = n
    },
    changesearchDetailObj(state, n) {
      state.searchDetailObj = n
    },
    changesearchDeatialUrl(state, n) {
      state.searchDeatialUrl = n
    },
    changesearchDeatialUrls(state, n) {
      state.searchDeatialUrls = n
    },
    changecreaterdataArr(state, n) {
      state.createrdataArr = n
    },
    changesearchcreater(state, n) {
      state.searchcreater = n
    },
    changesearchdata(state, n) {
      state.searchdata = n
    },
    changeSearchBlur(state, n) {
      state.SearchBlur = n
    },
    changemustSeeObj(state, n) {
      state.mustSeeObj = n
    },
    changenotecom(state, n) {
      state.notecom = n
    },
    changeNoteId(state, n) {
      state.NoteId = n
    },
    changeNoteDeaobj(state, n) {
      state.NoteDeaobj = n
    },
    changenoteObj(state, n) {
      state.noteObj = n
    },
    changeuserfeedArr(state, n) {
      state.userfeedArr = n
    },
    changeuseruserfeedObj(state, n) {
      state.userfeedObj = n
    },
    changemustSeeArr(state, n) {
      state.mustSeeArr = n
    },
    changerecObjItem(state, n) {
      state.recObjItem = n
    },
    changeEarcId(state, n) {
      state.earcId = n
    },
    changevideoId(state, n) {
      state.videoId = n
    },
    changevideoIfoObj(state, n) {
      state.videoIfoObj = n
    },
    changelocalVideoArr(state, n) {
      state.localVideoArr = n
    },
    changevideoPoster(state, n) {
      state.videoPoster = n
    },
    changeshareVideoItem(state, n) {
      state.shareVideoItem = n
    },
    changecodeData(state, n) {
      state.codeData = n
    },
    changesimialVideo(state, n) {
      state.simialVideo = n
    },
    changeshowSpan(state, n) {
      state.showSpan = n
    },
    changelocalcollectArr(state, n) {
      if (Array.isArray(n)) {
        state.localcollectArr = n
      } else {
        state.localcollectArr.push(n)
      }
    },
    changelocalnoteid(state, n) {
      state.localnoteid = n
    },
    changelocallikeArr(state, n) {
      if (Array.isArray(n)) {
        state.locallikeArr = n
      } else {
        state.locallikeArr.push(n)
      }
    },
    changevideoComments(state, n) {
      state.videoComments = n
    },
    changevideoComTotalObj(state, n) {
      state.videoComTotalObj = n
    },
    changeshowComloading(state, n) {
      state.showComloading = n
    },
    changecompage(state, n) {
      if (n) {
        state.compage = n
      } else {
        state.compage++
      }
    },
    changesearchWorkpage(state, n) {
      if (n) {
        state.searchWorkpage = n
      } else {
        state.searchWorkpage++
      }
    },
    changedetailpage(state, n) {
      if (n) {
        state.detailpage = n
      } else {
        state.detailpage++
      }
    },
    changesearchCreaterpage(state, n) {
      if (n) {
        state.searchCreaterpage = n
      } else {
        state.searchCreaterpage++
      }
    },
    changenotePage(state, n) {
      if (n) {
        state.notePage = n
      } else {
        state.notePage++
      }
    },
    changeuserId(state, n) {
      state.userId = n
    },
    changeuserItem(state, n) {
      state.userItem = n
    },
    changelocaluserId(state, n) {
      state.localuserId = n
    },
    changeworkspage(state, n) {
      if (n) {
        state.workspage = n
      } else {
        state.workspage++
      }
    },
    changerecpage(state, n) {
      if (n) {
        state.recpage = n
      } else {
        state.recpage++
      }
    },
    changeworksItem(state, n) {
      state.worksItem = n
    },
    changeorgWorksItem(state, n) {
      state.orgWorksItem = n
    },
    changeshowworksloading(state, n) {
      state.showworksloading = n
    },
    changeshowend(state, n) {
      state.showend = n
    },
    changeshowrecloading(state, n) {
      state.showrecloading = n
    },
    changesearchdataArr(state, n) {
      state.searchdataArr = n
    },
    changecarechoiceObj(state, n) {
      state.carechoiceObj = n
    },
    changeapploading(state, n) {
      state.apploading = n
    },
    changecardsVideoId(state, n) {
      state.cardsVideoId = n
    },
    changecardsVideoObj(state, n) {
      state.cardsVideoObj = n
    },
    changeshowVideoCarePost(state, n) {
      state.showVideoCarePost = n
    },
    changeplayingCardVideoNode(state, n) {
      state.playingCardVideoNode = n
    },
    changelocalcollectCard(state, n) {
      if (Array.isArray(n)) {
        state.localcollectCard = n
      } else {
        state.localcollectCard.push(n)
      }
    },
    changelocallikecard(state, n) {
      if (Array.isArray(n)) {
        state.locallikecard = n
      } else {
        state.locallikecard.push(n)
      }
    },
    changehotvideoobj(state, n) {
      state.hotvideoobj = n
    },
    changejqvideoObj(state, n) {
      state.jqvideoObj = n
    },
    changejqvideoArr(state, n) {
      state.jqvideoArr = n
    },
    changejqpage(state, n) {
      if (n) {
        state.jqpage = n
      } else {
        state.jqpage++
      }
    },
  },
  actions: {
    commitcardsVideoObj(context, n) {
      context.commit("changecardsVideoObj", n.data);
    }
  },
  modules: {
  }
})
