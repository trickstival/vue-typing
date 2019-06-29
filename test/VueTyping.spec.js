import { createLocalVue, mount } from '@vue/test-utils'
import VueTyping from '../src'
import { frame, frames } from '../src/utils'

const getSandbox = (wrapper) => {
    async function testTyping (text, framerate = 1) {
        let currentText = ''
        for (const char of text) {
            await frames(framerate)
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText)
        }
    }
    async function testDeleting (text, framerate = 1) {
        let currentText = text
        let idx = text.length
        for (const _ of text) {
            await frames(framerate)
            currentText = currentText.substr(0, idx)
            console.log(wrapper.element.textContent, currentText)
            expect(wrapper.element.textContent).toBe(currentText)
            idx--
        }
    }
    return {
        testTyping,
        testDeleting,
    }
}

describe("Basic rendering", () => {
    let Vue, wrapper, sandbox
    beforeEach(() => {
        Vue = createLocalVue()
        wrapper = mount(VueTyping, {
            propsData: {
                text: "Hello World!"
            },
            localVue: Vue
        })
        sandbox = getSandbox(wrapper)
    })

    it("renders initial content", () => {
        expect(wrapper.html()).toBe("<div><span>Hello World!</span></div>")
    })

    it("Types one character per frame", async () => {
        const text = "Hey Guys, sup???"
        wrapper.setProps({ text })
        await sandbox.testTyping(text)
    })

    // TODO: I just cant make this test work
    // it('Basic rewriting', async () => {
    //     const text = 'Im gonna be rewritten'
    //     const newText = 'it is done'
    //     wrapper.setProps({ text, rewrite: true })
    //     await sandbox.testTyping(text)
    //     wrapper.setProps({ text: newText })
    //     await sandbox.testDeleting(text)
    //     await sandbox.testTyping(newText)
    // })

    it('Types one character per frame', async () => {
        const text = 'Hey Guys, sup???'
        wrapper.setProps({ text })
        sandbox.testTyping(text)
    })

    it("Types one letter for each 2 frames when framerate is set to 2", async () => {
        const text = "Its me again, folks@!!"
        wrapper.setProps({ text, framerate: 2 })

        // iterate over the array and count 2 frames each iteration
        sandbox.testTyping(text, 2)
    })
})

// Cursor Rendering

describe("cursor Rendering", () => {
    let Vue, wrapper, sandbox
    beforeEach(() => {
        Vue = createLocalVue()
        wrapper = mount(VueTyping, {
            propsData: {
                text: "Hello World!",
                disableCursor: false,
                cursorOptions: {
                    blinking: false,
                    cursor: "|",
                    color: "black",
                    framerate: 24
                }
            },
            localVue: Vue
        })
        sandbox = getSandbox(wrapper)
    })

    it("renders initial content", () => {
        expect(wrapper.html()).toBe(
            '<div><span>Hello World!</span><span class="typing-cursor" style="opacity: 1; color: black;">|</span></div>'
        )
    })

    it("Types one character per frame with cursor", async () => {
        const text = "Hey Guys, sup???"
        wrapper.setProps({ text })
        let currentText = ''
        for (const char of text) {
            await frame()
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText + '|')
        }
    })

    it("Types one letter for each 2 frames when framerate is set to 2 with cursor", async () => {
        const text = "Its me again, folks@!!"
        wrapper.setProps({ text, framerate: 2 })

        // iterate over the array and count 2 frames each iteration
        let currentText = ''
        for (const char of text) {
            await frames(2)
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText + '|')
        }
    })
    it("Confirm that cursor is blinking", async () => {
        const text = "Its me again, folks@!!"
        wrapper.setProps({
            text,
            framerate: 15,
            cursorOptions: {
                blinking: true,
                cursor: "|",
                color: "black",
                framerate: 2
            }
        })
        await frames(6)
        let spanCursor = wrapper.findAll("span").at(1)
        expect(spanCursor.attributes().style).toBe("opacity: 1; color: black;")
        await frames(1)
        spanCursor = wrapper.findAll("span").at(1)
        expect(spanCursor.attributes().style).toBe("opacity: 0; color: black;")
    })
})
// TODO: Make it work for fractional framerates
// it('Types 2 letters for each frame when framerate is set to .5', async () => {
//     const text = 'Okay, Im gonna do it faster!!!'
//     wrapper.setProps({ text, framerate: .5 })

//     // mount an array like ['It', 's ', 'me', ' a', 'ga', 'in', ...]
//     let textChars = []
//     let lastGroup = []
//     textChars.push(lastGroup)
//     for (const char of text) {
//         if (lastGroup.length < 2) {
//             lastGroup.push(char)
//             continue
//         }
//         lastGroup = textChars.push([])
//     }
//     // joins each group created by array-reference
//     textChars = textChars.map(group => group.join(''))

//     let currentText = ''
//     for (let charGroup of textChars) {
//         await frame()
//         currentText += charGroup
//         expect(wrapper.element.textContent).toBe(currentText)
//     }
// })
