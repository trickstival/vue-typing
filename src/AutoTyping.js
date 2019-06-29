import VueTyping from '.'

export default {
    props: {
        textList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            currentText: ''
        }
    },
    render(h) {
        return h(VueTyping, {
            props: {
                text: this.currentText,
                rewrite: true,
                ...this.$attrs
            },
            on: {
                done: () => this.next()
            }
        })
    },
    methods: {
        next () {
            const { textList } = this
            textList.push(textList.shift())
            this.currentText = textList[0]
        }
    },
    mounted () {
        this.$set(this, 'currentText' ,this.textList[0])
    }
}
