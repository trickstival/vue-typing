<template>
    <section class="rewriting">
        <div>
            Simple rewriting:
            <div>
                <vue-typing :text="basicRewriteText" :rewrite="true" />
            </div>
            <button @click="rewrite">
                rewrite once
            </button>
        </div>
        <div>
            Automatic rewriting (using AutoTyping Component)
            <div>
                <auto-typing
                    :textList="['First Text', 'Second one', 'Third text']"
                    :framerate="4"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { AutoTyping } from '../../src/'
export default {
    components: {
        AutoTyping
    },
    data () {
        return {
            basicRewriteText: `I'm gonna be rewritten`
        }
    },
    methods: {
        rewrite () {
            this.basicRewriteText = 'I was rewritten!'
        }
    }
}
</script>

<style scoped>
.rewriting {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
