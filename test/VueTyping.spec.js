import { createLocalVue, mount } from '@vue/test-utils'
import VueTyping from '../src'
import { replaceRaf } from 'raf-stub'

replaceRaf()

const getSandbox = (wrapper) => {
    function testTyping (text, framerate = 1) {
        let currentText = ''
        for (const char of text) {
            requestAnimationFrame.step(framerate)
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText)
        }
    }
    function testDeleting (text, framerate = 1) {
        let currentText = text
        let idx = text.length
        for (let i = 0; i < text.length + 1; i++) {
            requestAnimationFrame.step(framerate)
            currentText = currentText.substr(0, idx)
            expect(wrapper.element.textContent).toBe(currentText)
            idx--
        }
    }
    return {
        testTyping,
        testDeleting,
    }
}

describe('Basic rendering', () => {
    let Vue, wrapper, sandbox
    beforeEach(() => {
        Vue = createLocalVue()
        wrapper = mount(VueTyping, {
            propsData: {
                text: 'Hello World!'
            },
            localVue: Vue
        })
        sandbox = getSandbox(wrapper)
    })

    it('renders initial content', () => {
        expect(wrapper.html()).toBe('<div><span>Hello World!</span></div>')
    })

    it('Types one character per frame', async () => {
        const text = 'Hey Guys, sup???'
        wrapper.setProps({ text })
        sandbox.testTyping(text)
    })

    it('Basic rewriting', async () => {
        const text = 'Im gonna be rewritten'
        const newText = 'it is done'

        wrapper.setProps({ text })
        sandbox.testTyping(text)
        wrapper.setProps({ rewrite: true })
        wrapper.setProps({ text: newText })

        sandbox.testDeleting(text)
        // TODO: I don't know why I have to wait for two frames here
        requestAnimationFrame.step(2)
        await wrapper.vm.$nextTick()
        sandbox.testTyping(newText)
    })

    it('Types one letter for each 2 frames when framerate is set to 2', async () => {
        const text = 'Its me again, folks@!!'
        wrapper.setProps({ text, framerate: 2 })

        // iterate over the array and count 2 frames each iteration
        sandbox.testTyping(text, 2)
    })
})

// Cursor Rendering

describe('cursor Rendering', () => {
    let Vue, wrapper
    beforeEach(() => {
        Vue = createLocalVue()
        wrapper = mount(VueTyping, {
            propsData: {
                text: 'Hello World!',
                disableCursor: false,
                cursorOptions: {
                    blinking: false,
                    cursor: '|',
                    color: 'black',
                    framerate: 24
                }
            },
            localVue: Vue
        })
    })

    it('renders initial content', () => {
        expect(wrapper.html()).toBe(
            '<div><span>Hello World!</span><span class="typing-cursor" style="opacity: 1; color: black;">|</span></div>'
        )
    })

    it('Types one character per frame with cursor', async () => {
        const text = 'Hey Guys, sup???'
        wrapper.setProps({ text })
        let currentText = ''
        for (const char of text) {
            requestAnimationFrame.step()
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText + '|')
        }
    })

    it('Types one letter for each 2 frames when framerate is set to 2 with cursor', async () => {
        const text = 'Its me again, folks@!!'
        wrapper.setProps({ text, framerate: 2 })

        // iterate over the array and count 2 frames each iteration
        let currentText = ''
        for (const char of text) {
            requestAnimationFrame.step(2)
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText + '|')
        }
    })
    it('Confirm that cursor is blinking', async () => {
        const text = 'Its me again, folks@!!'
        wrapper.setProps({
            text,
            framerate: 15,
            cursorOptions: {
                blinking: true,
                cursor: '|',
                color: 'black',
                framerate: 2
            }
        })
        requestAnimationFrame.step()
        let spanCursor = wrapper.findAll('span').at(1)
        expect(spanCursor.attributes().style).toBe('opacity: 1; color: black;')
        requestAnimationFrame.step(3)
        spanCursor = wrapper.findAll('span').at(1)
        expect(spanCursor.attributes().style).toBe('opacity: 0; color: black;')
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
