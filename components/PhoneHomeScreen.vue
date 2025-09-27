<script setup lang="ts">
const dateNow = ref<string>('')
const timeNow = ref<string>('')

onMounted(() => {
  const dateFormatter = new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

    const timeFormatter = new Intl.DateTimeFormat('en-EN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    })

  dateNow.value = dateFormatter.format(new Date())
  timeNow.value = timeFormatter.format(new Date())
})

const assistantApps = useTemplateRef<(HTMLDivElement)>('assistant-apps')
const messageApps = useTemplateRef<(HTMLDivElement)>('message-apps')

const openPhone = inject<Ref<boolean>>('open-phone')

defineExpose({
    assistantApps,
    messageApps
})

const emit = defineEmits<{
    (e: 'open-assistant'): void
    (e: 'open-message'): void
}>()


</script>

<template>
    <div class="absolute inset-0">
        <!-- Phone Header -->
        <div class="w-full h-1/2 bg-/50 px-3 py-8">
            <p class="text-3xl text-white">
                {{ timeNow }}
            </p>
            <h2 class="text-xs text-white">{{ dateNow }}</h2>
        </div>

        <!-- Phone Apps -->
        <div class="w-full h-1/2 grid grid-cols-4 gap-3 justify-items-center py-10">
            <!-- Assistant Apps -->
            <div 
                ref="assistant-apps"
                class="cursor-pointer  col-start-2 row-start-1 flex flex-col gap-1 justify-center items-center"
                @click="emit('open-assistant')" 
            >
                <div 
                    class="w-9 h-9 rounded-lg bg-cover flex justify-center items-center backdrop-blur-lg border border-white/30"
                    style="background-image: linear-gradient(135deg, rgba(255,255,255,0.30), rgba(255,255,255,0));"
                >
                    <img src="/assistant-normal.webp" alt="Assistant">
                </div>
                <p class="text-white text-xs">Assistant</p>
            </div>

            <!-- Message Apps -->
            <div 
                ref="message-apps"
                class="cursor-pointer  col-start-2 row-start-3 flex flex-col gap-1 justify-center items-center"
                @click="emit('open-message')" 
            >
                <div class="w-9 h-9 rounded-lg bg-yellow-600 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-white">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                </div>
                <p class="text-white text-xs">Message</p>
            </div>

            <!-- Close Phone -->
            <div 
                ref="close-phone-apps"
                class="cursor-pointer  col-start-3 row-start-2 flex flex-col gap-1 justify-center items-center"
                @click.stop="openPhone = false" 
            >
                <div class="w-9 h-9 rounded-lg bg-red-500 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5 text-white">
                        <path d="M12 2v10" />
                        <path d="M6.9 5.1a9 9 0 1 0 10.2 0" />
                    </svg>
                </div>
                <p class="text-white text-xs">Turn Off</p>
            </div>
        </div>
    </div>
</template>