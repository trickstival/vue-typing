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
        }
    },
    data () {
        return {
            speechFrameFragment: ''
        }
    },
    watch: {
        text (value) {
            this.scheduleTyping()
        },
        framerate () {
            this.scheduleTyping()
        }
    },
    methods: {
        scheduleTyping () {
            const { text } = this
            const framerate = this.framerate - 1
            this.isHidden = false
            this.speechFrameFragment = ''
            let idx = 0
            let frameCount = 0
            const cb = this.lastTypingCb = (acc) => {
                const wasCancelled = cb !== this.lastTypingCb
                if (this.speechFrameFragment.length >= text.length || wasCancelled) {
                    return
                }

                if (frameCount === framerate) {
                    this.speechFrameFragment += text[idx]
                    idx++
                    frameCount = 0
                } else {
                    frameCount++
                }
                requestAnimationFrame(cb)
            }

            requestAnimationFrame(cb)
        }
    },
    created () {
        this.speechFrameFragment = this.text
    }
}
