import { FrameIterator } from './utils'

export default {
    render (h) {
        return h('span', this.speechFrameFragment)
    },
    props: {
        framerate: {
            type: Number,
            default: 1
        },
        text: {
            type: String,
            default: ''
        },
        rewrite: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            speechFrameFragment: '',
            frameIterator: new FrameIterator()
        }
    },
    watch: {
        text () {
            this.scheduleTyping()
        },
        framerate () {
            this.scheduleTyping()
        }
    },
    methods: {
        async scheduleTyping () {
            const { text } = this
            this.isHidden = false

            if (this.rewrite) {
                await this.deleteText()
            } else {
                this.speechFrameFragment = ''
            }

            let idx = 0
            this.frameIterator
                .schedule((breakLoop) => {
                    if (this.speechFrameFragment.length >= text.length) {
                        breakLoop()
                        return
                    }
                    this.speechFrameFragment += text[idx]
                    idx++
                }, this.framerate)
                .then(() => {
                    this.$emit('done')
                })
        },
        deleteText () {
            let idx = this.speechFrameFragment.length
            return this.frameIterator
                .schedule((breakLoop) => {
                    if (idx === 0) {
                        breakLoop()
                        return
                    }
                    this.speechFrameFragment = this.speechFrameFragment.substr(0, idx)
                    idx--
                })
        }
    },
    created () {
        this.speechFrameFragment = this.text
    }
}
