type UserCallback = () => any

export class FrameIterator {
    private lastCallback: UserCallback
    schedule (userCallback: UserCallback, framerate: Number): Promise<void>
}

export function frame (): Promise<void>
export function frames (numberOfFrames: Number): Promise<void>
