<template>
    <v-btn
        text="Show Code"
        variant="outlined"
        prepend-icon="mdi-code-tags"
        class="mb-4"
        @click="show()"
    />

    <v-dialog
        v-model="dialog"
        class="dialog-responsive"
    >
        <v-card
            variant="elevated"
            ripple
        >
            <v-card-title class="d-flex justify-end">
                <VIcon
                    size="large"
                    aria-label="Close"
                    @click="dialog = false"
                >
                    mdi-close
                </VIcon>
            </v-card-title>

            <v-card-text class="scrollable-content">
                <VueCodeHighlighter
                    :code="code"
                    lang="ts"
                    :title="title"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { VueCodeHighlighter } from 'vue-code-highlighter'
import 'vue-code-highlighter/dist/style.css'

const props = defineProps({
    title: { type: String, required: true },
    component: { type: String, required: true },
    collection: { type: String, required: true },
    type: { type: String, required: true },
    showDialog: { type: Boolean, required: true },
})
const dialog = ref(false)
const code = ref('')

async function getCode () {
    const response = await import(`~/components/${props.type}/${props.collection}/${props.component}.vue?raw`)
    code.value = response.default
}

async function show () {
    await getCode()
    dialog.value = true
}
</script>

<style scoped>
.dialog-responsive {
    max-width: 90vw;
    max-height: 80vh;
}

/* Scrollbar Width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
  transition: background 0.3s ease;
}
</style>
