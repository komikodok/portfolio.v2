<script setup lang="ts">
import gsap from 'gsap';


const inputPrompt = ref<string>('')
const botResponse = ref<string>('Hi!')

const quickPromptIndex = ref<number>(0)
const quickPrompt = [
  'Who are you',
  'What is fazport means?',
  'Tell me a random fact',
  'How can I use this app?',
  'Give me a quote of the day',
  'Do you have a name?',
  'Sing me a song!',
  'Tell me a joke'
]

let tl: gsap.core.Timeline

const props = defineProps<{
  xOrigin: number
  yOrigin: number,
}>()

const emit = defineEmits<{
    (e: 'back-home'): void
}>()

onMounted(() => {
    initialAnimate()
})

function initialAnimate() {
    const origin = `${props.xOrigin}px ${props.yOrigin}px`

    tl = gsap.timeline()

    tl.fromTo('#assistant-screen', { opacity: 0.5, scale: 0.3 },
    {
        opacity: 1,
        scale: 1,
        transformOrigin: origin,
        ease: 'power4'
    })
    .add([
        gsap.fromTo('#chatbot-content', { y: 110 }, { y: 0, ease: 'power1' }),
        gsap.fromTo('#assistant-avatar', { y: 100 }, { y: 0, delay: 0.5, ease: 'power1' })
    ])
}

function handleClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement

    inputPrompt.value = target.innerText.trim()

    handleSubmit()

    inputPrompt.value = ''

    quickPromptIndex.value++
    if (quickPromptIndex.value >= quickPrompt.length) {
        quickPromptIndex.value = 0
    }
}

function handleSubmit() {
    botResponse.value = 'This feature is not available yet. Please stay tuned!'

    tl = gsap.timeline()

    tl.fromTo('#bot-response', { opacity: 0, y: 200 }, {
        opacity: 1,
        y: 0,
        ease: 'power4'
    })
    .fromTo('#assistant-avatar', { y: 100 }, {
        y: 0,
        ease: 'power1'
    })

    inputPrompt.value = ''
}
</script>

<template>
    <div id="assistant-screen" class="absolute inset-0">
        <div class="w-full h-full rounded-2xl flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="h-14 flex justify-between items-center px-5">
                <button 
                    class="text-white cursor-pointer"
                    @click="emit('back-home')"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                </button>
            </div>

            <!-- Content -->
            <div class="w-full h-full relative bg-gradient-to-b from-transparent via-black/80 to-black/90">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-42 flex flex-col justify-center items-center gap-2">
                    <h2 
                        class="w-full text-center text-xs text-sky-300 hover:bg-cyan-600/50 hover:text-sky-100 rounded-md p-1 cursor-pointer"
                        @click="handleClick"
                    >
                        {{ quickPrompt[quickPromptIndex] }}
                    </h2>
                    <form @submit.prevent="handleSubmit">
                        <input 
                            placeholder="..." 
                            class="text-sky-300 text-xs text-center w-full resize-none outline-none"
                            v-model="inputPrompt"
                            @keydown.enter.prevent="handleSubmit"
                        >
                        <button 
                            type="submit"
                            class="text-xs text-center w-full drop-shadow-[0_0_10px_#0e7490] my-3 p-0.5 text-white bg-cyan-600 rounded-sm transition-all duration-500"
                            :class="inputPrompt ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-not-allowed'"
                            :disabled="!inputPrompt"
                        >
                            Send
                        </button>
                    </form>
                </div>

                <div 
                    id="chatbot-content"
                    class="w-full h-24 absolute bottom-1 flex border-2 border-cyan-600 overflow-hidden rounded-2xl shadow-[0_0_20px_#0e7490]"
                    style="background-image: linear-gradient(to right, transparent, transparent, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), transparent);"
                >
                    <img 
                        id="assistant-avatar"
                        src="/assistant-normal.webp" 
                        class="w-20 h-20 pointer-events-none absolute bottom-0 object-cover"
                        @contextmenu.prevent=""
                        draggable="false"
                    >
                    <div class="overflow-y-scroll w-3/4 h-20 ml-auto my-auto" style="scrollbar-width: none;">
                        <p 
                            id="bot-response"
                            class="text-white mx-2 p-0.5 text-xs text-center break-words break-all"
                        >
                            {{ botResponse }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>