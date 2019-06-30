import Vue from 'vue'
import VueTyping, { AutoTyping } from '../'

Vue.component('VueTyping', VueTyping);

new Vue({
  components: { VueTyping, AutoTyping },
})

Vue.extend({
  extends: VueTyping,
})

Vue.extend({
    extends: AutoTyping,
})
