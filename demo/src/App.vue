<template>
  <div id="app">
    <div>
      <vue-typing :text="myText" />
    </div>
    <button @click="type">Type it!</button>
  </div>
</template>

<script>
import VueTyping from '../../src/index'
export default {
  name: 'app',
  components: {
    VueTyping
  },
  data () {
    return {
      possibleTexts: [
        `I'm typing one character per frame`,
        'Awesome guysssss',
        `Yeah, I'm being typed`
      ],
      myText: 'This is the initial text (not typed)'
    }
  },
  methods: {
    type () {
      this.possibleTexts.push(this.possibleTexts.shift())
      this.myText = this.possibleTexts[0]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
