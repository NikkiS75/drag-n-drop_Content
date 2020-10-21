import Vue from 'vue'
import Vuex from 'vuex'
import containers from './container'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        containers
    },
    state:{},
    getters:{},
    mutations:{},
    actions:{}
})
