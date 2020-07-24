import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import './theme/styles/vuetify.css'
import './theme/styles/prism-material-dark.css'

/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  Vue.use(Vuetify)
  options.vuetify = new Vuetify({})
}
