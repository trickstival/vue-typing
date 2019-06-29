<template>
  <div id="app">
    <h2>Framerate</h2>
    <framerates />
    <h2>Rewriting Text</h2>
    <rewriting />
  </div>
</template>

<script>
import Framerates from './Framerates'
import Rewriting from './Rewriting'

export default {
    name: 'App',
    components: {
        Framerates,
        Rewriting
    },
    data() {
        return {
        }
    },
    methods: {

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
}
</style>
