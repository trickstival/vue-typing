import VueTyping from "."

export default {
    functional: true,
    props: {
        textList: {
            type: Array,
            default: () => []
        }
    },
    render(h, { props }) {
        let [currentText, ...textList] = props.textList
        return h(VueTyping, {
            propsData: {
                text: currentText
            },
            on: {
                done: () => currentText = textList.slice(textList.indexOf(currentText) + 1)
            }
        })
    }
}
