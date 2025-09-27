<script setup lang="ts">
import gsap from 'gsap';

let tl: gsap.core.Timeline

onMounted(async () => {
    await nextTick()
    
    tl = gsap.timeline()

    tl.to('#mobile-warning-bg', {
        scale: 2,
        transformOrigin: '50% 70%',
        duration: 5,
        ease: 'power1',
        onComplete: () => animateLeaf()
    })
    .to('#mobile-warning-bg', {
        x: -100,
        y: 100,
        duration: 5,
        ease: 'power1'
    })
    .to('#mobile-warning-bg', {
        x: 100,
        y: 0,
        duration: 5,
        ease: 'power1'
    })
})

function animateLeaf() {
    tl = gsap.timeline()

    tl.to('#leaf', {
        keyframes: [
            { rotation: '-=30', ease: 'sine.out' },            
            { rotation: '+=35',},            
        ],
        rotateX: 60,
        top: '47%',
        right: '60%',
        scale: 1.5,
        duration: 7,
        ease: 'sine.inOut'
    })
    .to('#leaf', {
        keyframes: [
            { rotation: '-=30', ease: 'sine.out' },            
            { rotation: '+=35',},            
        ],
        rotateX: 40,
        top: '100%',
        right: '70%',
        opacity: 0,
        scale: 1,
        duration: 7,
        ease: 'sine.inOut'
    })  
}
</script>

<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <div
      id="mobile-warning-bg"
      class="absolute inset-0 bg-no-repeat bg-cover"
      style="background-image: url('/forest.webp'); background-position: center;"
    />
    
    <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white"
        style="font-family: Poppins;"
        >
        <p class="text-lg font-semibold mb-2">Mobile not supported.</p>
        <p class="text-sm opacity-80">
            Please open it on a laptop or desktop for the best experience.
        </p>
    </div>

    <img 
        id="leaf"
        src="/leaf.webp"
        class="absolute -top-20 right-0 w-12 h-12"
    >
  </div>
</template>