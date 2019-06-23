import { createLocalVue, mount } from '@vue/test-utils'
import VueTyping from '../src'
import { frame, frames } from '../src/utils'

describe('Basic rendering', () => {
    let Vue, wrapper
    beforeEach(() => {
        Vue = createLocalVue()
        wrapper = mount(VueTyping, {
            propsData: {
                text: 'Hello World!'
            },
            localVue: Vue
        })
    })

    it('renders initial content', () => {
        expect(wrapper.html()).toBe('<span>Hello World!</span>')
    })

    it('Types one character per frame', async () => {
        const text = 'Hey Guys, sup???'
        wrapper.setProps({ text })
        let currentText = ''
        for (const char of text) {
            await frame()
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText)
        }
    })

    it('Types one letter for each 2 frames when framerate is set to 2', async () => {
        const text = 'Its me again, folks@!!'
        wrapper.setProps({ text, framerate: 2 })

        // iterate over the array and count 2 frames each iteration
        let currentText = ''
        for (const char of text) {
            await frames()
            currentText += char
            expect(wrapper.element.textContent).toBe(currentText)
        }
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
})
