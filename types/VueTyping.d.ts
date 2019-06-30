import {
    ComponentOptions,
    DefaultMethods,
    DefaultComputed,
    PropsDefinition
} from "vue/types/options"
import { Vue } from 'vue/types/vue'
import { FrameIterator } from './utils'

interface CursorOptions {
    blinking: boolean,
    cursor: String,
    color: String,
    framerate: Number
}

interface Props {
    framerate: Number,
    text: String,
    rewrite: Boolean,
    cursorOptions: CursorOptions
}

interface Data {
    (): {
        speechFrameFragment: '',
        frameIterator: FrameIterator,
        cursorFrameIterator: FrameIterator,
        cursorOpacity: 0
    }
}

declare const VueTyping: ComponentOptions<
    Vue,
    Data,
    DefaultMethods<Vue>,
    DefaultComputed,
    PropsDefinition<Props>
>

export default VueTyping
