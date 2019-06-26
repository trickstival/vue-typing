# Vue Typing

[Check the Demo](https://nifty-albattani-956460.netlify.com/)

Vue typing is an open-source Vue.js component that provides typing-like effect

## Install

```bash
yarn add vue-typing
# or
npm install vue-typing
```

## Usage

```js
import VueTyping from 'vue-typing'
export default {
    template: `
        <div>
            <vue-typing :text="myText" :cursorOptions="myCursor" />
            <button @click="type">Type it!</button>
        </div>
    `
    name: 'my-component',
    components: { VueTyping },
    data () {
        return {
            myText: 'initialText',
            myCursor: { blinking: true, cursor: "|", color: "black", framerate: 24}
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

-   `text`: String
    The text that is going to be typed into the component

-   `framerate`: Number (default 1)
    The number of frames for each character. Set it higher if you want to make the typing slower.

-   `cursorOptions` : Object (default : `{ blinking: true, cursor: "|", color: "black", framerate: 24}`)
    An object that defines the cursor in the animation, with the following options :
    -   `blinking`: `boolean`. defines if the cursor is blinking or not
    -   `cursor`: `string`. defines what's the cursor character.
    -   `color`: `CSS color string`, `hex value`, `rgb value` as defined in css. defines the color of the cursor.
    -   `framerate`: `Number`. defines the speed in which the cursor blinks, if blinking is set to true. values should be positive integers
-   `disableCursor`: Boolean (default false) a prop that defines if the cursor is enabled or not.

## Utils

-   `cursorSpeed`
    -   An exported objects that contains some default values to help setting the framerate for the cursor blinking animation

```js
export const CursorSpeed = {
    slow: 40,
    normal: 24,
    fast: 5
};

import VueTyping, { CursorSpeed } from "vue-typing";
new Vue({
    template: '<vue-typing :cursorOptions="$options.cursorOptions" />',
    cursorOptions: {
        framerate: CursorSpeed.fast
    }
});
```

## CSS Classes

-   the cursor selector has a class named `typing-cursor` that you can utilize with css to edit the cursor.
