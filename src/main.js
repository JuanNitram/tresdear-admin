import Vue from "vue";
import Axios from "axios";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";
import VueQuillEditor from 'vue-quill-editor'
import Toasted from 'vue-toasted';

for (let name in filters) {
  Vue.filter(name, filters[name]);
}

Vue.use(Toasted)
Vue.use(VueQuillEditor)
Vue.use(Vuetify, { theme: { primary: "#2c3e50" } });
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

const token = localStorage.getItem("token");
if(token) Vue.prototype.$http.defaults.headers.common["Authorization"] = token;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
