import { FrameIterator } from './utils'

export default {
    render(h) {
        if (this.disableCursor) {
            return h("div", [h("span", this.speechFrameFragment)])
        } else
            return h("div", [
                h("span", this.speechFrameFragment),
                h(
                    "span",
                    {
                        style: {
                            opacity: this.cursorOpacity,
                            color: this.cursorOptions.color
                        },
                        class: { "typing-cursor": true }
                    },
                    this.cursorOptions.cursor
                )
            ])
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
        },
        cursorOptions: {
            type: Object,
            default: () => {
                return {
                    blinking: true,
                    cursor: "|",
                    color: "black",
                    framerate: 24
                }
            }
        },
        disableCursor: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            speechFrameFragment: '',
            frameIterator: new FrameIterator(),
            cursorFrameIterator: new FrameIterator(),
            cursorOpacity: 0
        }
    },
    watch: {
        text() {
            this.scheduleTyping()
        },
        framerate() {
            this.scheduleTyping()
        },
        cursorOptions() {
            this.blinkingCursor()
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
                    if (idx === -1) {
                        breakLoop()
                        return
                    }
                    console.log('oi')
                    this.speechFrameFragment = this.speechFrameFragment.substr(0, idx)
                    idx--
                }, this.framerate)
        },
        blinkingCursor() {
            const { framerate } = this.cursorOptions || this
            const { blinking } = this.cursorOptions
            let blinkingToggle = false

            if (!blinking) {
                this.cursorOpacity = 1
                return
            }

            this.cursorFrameIterator
                .schedule(() => {
                    blinkingToggle = !blinkingToggle
                    this.cursorOpacity = blinkingToggle ? 1 : 0
                }, framerate)
        }
    },
    created() {
        this.speechFrameFragment = this.text
        if (!this.disableCursor) {
            this.blinkingCursor()
        }
    }
}

export const cursorSpeed = {
    slow: 40,
    normal: 24,
    fast: 5
}
