<template>
  <section class="framerates">
    <div>
      <div>Normal Typing:</div>
      <vue-typing :text="myText" />
    </div>
    <div>
      <div>framerate = 5</div>
      <vue-typing :text="myText" :framerate="5" />
    </div>
    <div>
      <div>framerate = 10</div>
      <vue-typing :text="myText" :framerate="10" />
    </div>
    <div>
      <div>blinking cursor</div>
      <vue-typing :text="myText" :framerate="10" :disableCursor="false" />
    </div>
   <div>
      <div>solid cursor</div>
      <vue-typing :text="myText" :framerate="10" :disableCursor="false" :cursorOptions="solidCursor" />
    </div>
    <div>
      <button @click="type">Type it!</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      possibleTexts: [
        `I should be a professional typer`,
        'Awesome guysssss',
        `Yeah, I'm being typed`
      ],
      myText: 'This is the initial text (not typed)',
      solidCursor: {
            blinking: false,
            cursor: "|",
            color: "black",
        }
    }
  },
  methods: {
    type() {
      this.possibleTexts.push(this.possibleTexts.shift())
      this.myText = this.possibleTexts[0]
    }
  }
}
</script>

<style scoped>
.framerates {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 60px;
}
</style>
