<template>
  <div id="app">
    <div>
      <div>Normal Typing:</div>
      <vue-typing :text="myText" />
    </div>
    <div>
      <div>framerate = 2</div>
      <vue-typing :text="myText" :framerate="2" />
    </div>
    <div>
      <div>framerate = 3</div>
      <vue-typing :text="myText" :framerate="3" />
    </div>
    <div>
      <button @click="type">Type it!</button>
    </div>
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
        `I should be a professional typer`,
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
