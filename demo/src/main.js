import Vue from 'vue'
import App from './App.vue'
import VueTyping from '../../src/index'

Vue.config.productionTip = false
Vue.component('vue-typing', VueTyping)

new Vue({
    render: h => h(App),
}).$mount('#app')
