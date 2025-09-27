<script setup lang="ts">
import gsap from 'gsap'

import { menu } from '~/data/menu'

const openMenu = ref<boolean>(false)

const route = useRoute()

let tl: gsap.core.Timeline | null = null

onMounted(() => {
  const initPinPosition = menu.find((item) => item.path === route.path)

  gsap.set('#map-pin', {
    top: initPinPosition?.top,
    left: initPinPosition?.left,
    width: initPinPosition?.width,
    height: initPinPosition?.height,
    ease: 'power1'
  })

  watch(openMenu, () => {
    if (openMenu.value) { 
      gsap.killTweensOf('#menu')

      tl = gsap.timeline()
      tl.to('#text-menu', { opacity: 0, ease: 'sine.inOut' })
      .to('#menu', {
          opacity: 1,
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          scale: 1,
          rotate: 0,
          ease: 'power1.in',
      })
      .to('#menu', {
        scale: 1.005,
        repeat: -1,
        yoyo: true,
        ease: 'power1'
      })
    } else {
      gsap.killTweensOf('#menu')

      tl = gsap.timeline()
      tl.to('#menu', {
        opacity: 1,
        scale: 0.15,
        top: -120,
        left: -220,
        x: 0,
        y: 0,
        ease: 'power1.in',
      })
      .to('#menu', {
        rotation: '+=4',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      .to('#text-menu', { opacity: 1, ease: 'sine.inOut' })
    }
  }, { immediate: true })
})

function handleClick(e: MouseEvent) {
  const targetEl = e.currentTarget as HTMLElement
  const h2 = targetEl.querySelector('h2')
  const textContent = h2?.textContent?.toLowerCase()

  tl = gsap.timeline()

  tl.to('#map-pin', {
    top: targetEl.offsetTop,
    left: targetEl.offsetLeft,
    width: targetEl.offsetWidth,
    height: targetEl.offsetHeight,
    ease: 'power1',
    onComplete: () => {
      setTimeout( () => {
        if (textContent === 'home') {
          navigateTo('/')
        } else {
          navigateTo(`/${textContent}`)
        }
      }, 20)
    }
  })
}

</script>

<template>
  <div
    @click.prevent="openMenu = true"
    id="menu"
    :class="openMenu ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'"
    class="bg-no-repeat bg-contain max-w-xl w-full h-80 flex scale-[15%] justify-center items-center absolute -top-[120px] -left-[220px] z-[99]"
    :style="{
      backgroundImage: `url('/map.webp')`,
      fontFamily: 'Pirata One'
    }"
  >
    <!-- Home -->
    <div 
      ref="home"
      @click="handleClick"
      :class="openMenu ? 'pointer-events-auto' : 'pointer-events-none'"
      class="cursor-pointer flex flex-col gap-2 justify-center items-center absolute top-[210px] left-[240px]"
    >
      <div class="w-2.5 h-2.5 rounded-full bg-black/60 shadow-md"></div>
      <h2 class="text-lg font-extrabold text-black/70 tracking-widest drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">home</h2>
    </div>

    <!-- About -->
    <div 
      ref="about"
      @click="handleClick" 
      :class="openMenu ? 'pointer-events-auto' : 'pointer-events-none'"
      class="cursor-pointer flex flex-col gap-2 justify-center items-center absolute top-[160px] left-[420px]"
    >
      <div class="w-2.5 h-2.5 rounded-full bg-black/60 shadow-md"></div>
      <h2 class="text-lg font-extrabold text-black/70 tracking-widest drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">about</h2>
    </div>
    
    <!-- Project -->
    <div 
      ref="project"
      @click="handleClick" 
      :class="openMenu ? 'pointer-events-auto' : 'pointer-events-none'"
      class="cursor-pointer flex flex-col gap-2 justify-center items-center absolute top-[100px] left-[100px]"
    >
      <div class="w-2.5 h-2.5 rounded-full bg-black/60 shadow-md"></div>
      <h2 class="text-lg font-extrabold text-black/70 tracking-widest drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">project</h2>
    </div>

    <!-- Map Pin -->
    <div 
      id="map-pin" 
      class="absolute top-0 left-0 flex justify-center animate-bounce"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 text-red-500">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
      </svg>
    </div>

    <!-- X Button -->
    <div 
      @click.prevent.stop="openMenu = false"
      class="cursor-pointer pointer-events-auto absolute w-10 h-10 top-3 right-0 flex justify-center items-center"
    >
      <span class="text-6xl text-[#7a7067] font-light" style="font-family: Tangerine;">×</span>
    </div>

    <p 
      id="text-menu"
      class="absolute -bottom-40 drop-shadow-[0_0_40px_yellow] text-yellow-200 text-9xl"
    >
      Menu
    </p>
  </div>
</template>