<script setup lang="ts">
import gsap from 'gsap'

const { openProfile, openSkills } = defineProps<{
    openProfile: boolean,
    openSkills: boolean,
}>()

const emit = defineEmits<{
    (e: 'is-open'): void
}>()

onMounted(() => {
    watch(() => [openProfile, openSkills], ([p, s]) => {
        animateProfile(p, s)
    }, { immediate: true })
})

function animateProfile(p: boolean, s: boolean) {
  gsap.killTweensOf(['#scroll-parchment', '#text-parchment'])

  const tl = gsap.timeline()

  if (p) {
    tl.to('#text-parchment', { opacity: 0, ease: 'sine.inOut' })
    .to('#scroll-parchment', {
        x: s ? '-75%' : '0%',
        top: 'auto',
        right: 'auto',
        scale: 1,
        rotate: 0,
        opacity: 1,
        ease: 'power1.in'
    })
    .to('#scroll-parchment', {
        height: '490px',
        ease: 'power4'
    })
    .to('#profile-content', { opacity: 1, ease: 'power1' })
  } else {
    tl.to('#profile-content', { opacity: 0, ease: 'power1' })
    .to('#scroll-parchment', {
        height: '110px',
        ease: 'power4'
    })
    .to('#scroll-parchment', {
        x: 0,
        scale: 0.15,
        top: -5,
        right: 0,
        rotate: 280,
        opacity: 1,
        ease: 'power1.in'
    })
    .to('#scroll-parchment', {
        rotation: '+=8',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })
    .to('#text-parchment', { opacity: 1, ease: 'sine.inOut' })
    .to('#text-parchment', {
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
        id="scroll-parchment"
        style="background-image: url('/scroll-parchment.webp')"
        class="cursor-pointer bg-no-repeat bg-cover absolute top-full rotate-90 opacity-0 scale-[18%] max-w-sm w-full h-[100px] flex justify-center items-center"
    >
        <div 
            id="scroll"
            style="background-image: url('/scroll.webp')" 
            class="absolute bg-cover -bottom-5 w-full h-[40px]" 
        />

        <div id="profile-content" class="w-[85%] h-[85%] opacity-0 translate-y-3 gap-3 px-3">
            <slot name="profile-content"/>
        </div>
    </div>

    <p 
        id="text-parchment"
        class="absolute top-22 right-38 opacity-0 drop-shadow-[0_0_8px_yellow] text-lg text-yellow-200"
        style="font-family: Pirata One"
    >
        Parchment 2
    </p>
</template>
