import Vue from 'vue'
import Vuex from 'vuex'
import notes from './notes'
import note from './note'
import properties from './properties'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notes,
    note,
    properties
  }
})