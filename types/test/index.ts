import Vue from 'vue'
import VueTyping from '../'

Vue.component('VueTyping', VueTyping);

new Vue({
  components: { VueTyping },
})

Vue.extend({
  extends: VueTyping
})
