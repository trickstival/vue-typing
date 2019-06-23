export function frame () {
    return new Promise(resolve => window.requestAnimationFrame(resolve))
}

export async function frames (numberOfFrames = 2) {
    let currentFrame = 0
    while (currentFrame < numberOfFrames) {
        await frame()
        currentFrame++
    }
}

export class FrameIterator {
    constructor () {
        this.lastCallback = null
    }
    schedule (userCallback, framerate = 1) {
        framerate = framerate - 1
        this.lastCallback = userCallback
        return new Promise(resolve => {
            let breakLoop = false
            let frameCount = 0

            const doBreakLoop = () => (breakLoop = true)

            const loop = () => {
                const { lastCallback } = this
                // If schedule is called twice the first loop should be cancelled
                const wasCancelled = lastCallback && lastCallback !== userCallback
                if (breakLoop || wasCancelled) {
                    resolve()
                    return
                }

                if (frameCount === framerate) {
                    userCallback(doBreakLoop)
                    frameCount = 0
                } else {
                    frameCount++
                }


                requestAnimationFrame(loop)
            }
            requestAnimationFrame(loop)
        })
    }
}
