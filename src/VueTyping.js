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
            default: ""
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
            speechFrameFragment: "",
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
        scheduleTyping() {
            const { text } = this
            const framerate = this.framerate - 1
            this.isHidden = false
            this.speechFrameFragment = ""
            let idx = 0
            let frameCount = 0
            const cb = (this.lastTypingCb = () => {
                const wasCancelled = cb !== this.lastTypingCb
                if (
                    this.speechFrameFragment.length >= text.length ||
                    wasCancelled
                ) {
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
            })

            requestAnimationFrame(cb)
        },
        blinkingCursor() {
            let frameCount = 0
            let blinkingToggle = false
            const framerate = this.cursorOptions.framerate
            const animationLoop = () => {
                if (frameCount === framerate) {
                    blinkingToggle = !blinkingToggle
                    this.cursorOpacity = blinkingToggle ? 1 : 0
                    frameCount = 0
                } else {
                    frameCount++
                }
                requestAnimationFrame(animationLoop)
            }

            if (this.cursorOptions.blinking) {
                requestAnimationFrame(animationLoop)
            } else {
                this.cursorOpacity = 1
            }
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
