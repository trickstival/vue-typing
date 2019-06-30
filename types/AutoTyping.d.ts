import {
    ComponentOptions,
    DefaultMethods,
    DefaultComputed,
    PropsDefinition
} from "vue/types/options"
import { Vue } from 'vue/types/vue'


interface Props {
    textList: string[],
}

interface Data {
    (): {
        currentText: String,
    }
}

declare const AutoTyping: ComponentOptions<
    Vue,
    Data,
    DefaultMethods<Vue>,
    DefaultComputed,
    PropsDefinition<Props>
>

export default AutoTyping
