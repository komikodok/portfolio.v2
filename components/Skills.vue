<script setup lang="ts">
import gsap from 'gsap'

const { openSkills, openProfile } = defineProps<{
    openSkills: boolean,
    openProfile: boolean,
}>()

const emit = defineEmits<{
    (e: 'is-open'): void
}>()

onMounted(() => {
    watch(() => [openSkills, openProfile], ([s, p]) => {
        animateSkills(s, p)
    }, { immediate: true })
})

function animateSkills(s: boolean, p: boolean) {
    gsap.killTweensOf(['#scroll-parchment2', '#text-parchment2'])
    const tl = gsap.timeline()

    if (s) {
        tl.to('#text-parchment2', { opacity: 0, ease: 'sine.inOut' })
        .to('#scroll-parchment2', {
            x: p ? '75%' : '0%',
            top: 'auto',
            right: 'auto',
            scale: 1,
            rotate: 0,
            opacity: 1,
            ease: 'power1.in'
        })
        .to('#scroll-parchment2', { height: '230px', ease: 'power4' })
        .to('#skills-content', { opacity: 1, ease: 'power1' })
    } else {
        tl.to('#skills-content', { opacity: 0, ease: 'power1' })
        .to('#scroll-parchment2', { height: '120px', ease: 'power4' })
        .to('#scroll-parchment2', {
            x: 0,
            scale: 0.13,
            top: -10,
            right: -150,
            rotate: 280,
            opacity: 1,
            ease: 'power1.in'
        })
        .to('#scroll-parchment2', {
            rotation: '+=8',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        })
        .to('#text-parchment2', { opacity: 1, ease: 'sine.inOut' })
        .to('#text-parchment2', {
            rotation: '+=4',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        })
    }
}
</script>

<template>
    <div 
        @click="emit('is-open')"
        id="scroll-parchment2"
        style="background-image: url('/scroll-parchment2.webp')" 
        class="cursor-pointer absolute top-full right-0 scale-[15%] rotate-90 bg-no-repeat bg-cover max-w-md w-full h-[120px] flex justify-center items-center z-10"
    >
        <div 
            id="scroll"
            style="background-image: url('/scroll.webp')" 
            class="absolute bg-cover -bottom-5 w-full h-[47px]" 
        />

        <div id="skills-content" class="w-[85%] h-[70%] opacity-0 flex gap-2 items-center translate-y-3 py-4">
            <slot name="skills-content" />
        </div>
    </div>

    <p 
        id="text-parchment2"
        class="absolute top-22 right-9 opacity-0 drop-shadow-[0_0_8px_yellow] text-lg text-yellow-200"
        style="font-family: Pirata One"
    >
        Parchment 1
    </p>
</template>