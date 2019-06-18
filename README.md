# Vue Typing

Vue typing is an open-source Vue.js component that provides typing-like effect

## Usage
```js
import VueTyping from 'vue-typing'
export default {
    template: `
        <div>
            <vue-typing :text="myText" />
            <button @click="type">Type it!</button>
        </div>
    `
    name: 'my-component',
    components: { VueTyping },
    data () {
        return {
            myText: 'initialText'
        }
    },
    methods: {
        type () {
            this.myText = `I'm typing one character per frame`
        }
    }
}
```

## props
- `text`: String
The text that is going to be typed into the component

- `framerate`: Number (default 1)
The number of frames for each character. Set it higher if you want to make the typing slower.
