export default {
    render(h) {
        return h("div", [
            h("span", this.speechFrameFragment),
            h(
                "span",
                {
                    style: {
                        opacity: this.cursorOpacity,
                        color: this.cursorAnimationType.color
                    }
                },
                this.cursorAnimationType.cursor
            )
        ]);
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
        cursorAnimationType: {
            type: Object,
            default: {
                blinking: true,
                cursor: "|",
                color: "black",
                framerate: 24
            }
        }
    },
    data() {
        return {
            speechFrameFragment: "",
            cursorOpacity: 0
        };
    },
    watch: {
        text(value) {
            this.scheduleTyping();
        },
        framerate() {
            this.scheduleTyping();
        }
    },
    methods: {
        scheduleTyping() {
            const { text } = this;
            const framerate = this.framerate - 1;
            this.isHidden = false;
            this.speechFrameFragment = "";
            let idx = 0;
            let frameCount = 0;
            const cb = (this.lastTypingCb = acc => {
                const wasCancelled = cb !== this.lastTypingCb;
                if (
                    this.speechFrameFragment.length >= text.length ||
                    wasCancelled
                ) {
                    return;
                }

                if (frameCount === framerate) {
                    this.speechFrameFragment += text[idx];
                    idx++;
                    frameCount = 0;
                } else {
                    frameCount++;
                }
                requestAnimationFrame(cb);
            });

            requestAnimationFrame(cb);
        },
        blinkingCursor() {
            let frameCount = 0;
            let blinkingToggle = false;
            const framerate = this.cursorAnimationType.framerate;
            const animationLoop = () => {
                if (frameCount === framerate) {
                    blinkingToggle = !blinkingToggle;
                    this.cursorOpacity = blinkingToggle ? 100 : 0;
                    frameCount = 0;
                } else {
                    frameCount++;
                }
                requestAnimationFrame(animationLoop);
            };

            if (this.cursorAnimationType.blinking) {
                requestAnimationFrame(animationLoop);
            } else {
                this.cursorOpacity = 100;
            }
        }
    },
    created() {
        this.speechFrameFragment = this.text;
        this.blinkingCursor();
    }
};
