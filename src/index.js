import VueLyTable from './components/ly-table'
const LyTable = {
  install (Vue, options) {
    Vue.component(VueLyTable.name, VueLyTable)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LyTable)
}

export default LyTable
