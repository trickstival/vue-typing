<template>
    <section class="rewriting">
        <div>
            Simple rewriting:
            <div>
                <vue-typing :text="basicRewriteText" :rewrite="true" />
            </div>
            <button @click="rewrite">
                rewrite
            </button>
        </div>
        <div>
            Automatic rewriting (using AutoTyping Component)

        </div>
    </section>
</template>

<script>
export default {
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
