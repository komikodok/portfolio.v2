<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother';

useHead({ title: 'Landing' })

onMounted(async () => {
  await nextTick()
  
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  
  gsap.to('#home', 
    { 
      filter: 'blur(0px) brightness(1)',
      ease: 'power1.in'
    }
  )

  ScrollSmoother.create({
    smooth: 4,
    effects: true,
    wrapper: '.smooth-wrapper',
    content: '.smooth-content'
  })
  
  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'home',
      trigger: '#home',
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 2,
    }
  })

  tl.to('#forest', {
    scale: 1.1,
    ease: 'power1.inOut',
    filter: 'blur(6px) brightness(0.05)',
    transformOrigin: 'center center',
    immediateRender: false,
  })
  .to('#tree-left', {
    x: -400,
    scale: 1.5,
    opacity: 0,
    ease: 'power1.inOut',
    filter: 'blur(0px) brightness(0.5)',
    immediateRender: false,
  }, '<')
  .to('#tree-right', {
    x: 400,
    scale: 1.3,
    opacity: 0,
    ease: 'power1.inOut',
    filter: 'blur(1px) brightness(0.5)',
    immediateRender: false,
  }, '<')
  .to('#forest', {
    scale: 1.4,
    filter: 'blur(1px) brightness(0.8)',
    ease: 'power2.out',
    immediateRender: false,
  })
  .to('#forest', {
    x: 100,
    y: -50,
    ease: 'power2.inOut',
    filter: 'blur(0px) brightness(1)',
  })
  .to('#forest', {
    x: -100,
    y: -50,
    ease: 'power2.inOut',
    filter: 'blur(0px) brightness(1)',
  })
  .to(['#welcome', '#enter', '#forest'], {
    x: 0,
    y: 0,
    opacity: 1,
    ease: 'power1.inOut',
  })
})

function handleClick() {
  const tl = gsap.timeline();

  tl.to(['#welcome', '#enter'], {
    opacity: 0,
    display: 'none',
    duration: 0.6,
    ease: 'power2.inOut',
  })

  .to('#home', {
    duration: 1.2,
    ease: 'power1.in',
    transformOrigin: 'bottom center',
    onComplete: () => {
      navigateTo('/about');
    }
  })
}

onBeforeUnmount(async () => {
  ScrollSmoother.get()?.kill()
  ScrollTrigger.getById('home')?.kill()
})

onBeforeRouteLeave(async () => {
  await new Promise(resolve => {
    gsap.to('#home', {
      filter: 'blur(4px) brightness(0)',
      duration: 0.8,
      onComplete: resolve
    })
  })
})
</script>


<template>
  <div class="smooth-wrapper">
    <div class="smooth-content">
      <div 
        id="home" 
        class="w-screen h-screen overflow-hidden relative"
        style="scrollbar-width: none;"
      >
        <div 
          id="forest" 
          style="background-image: url('/forest.webp');"
          class="w-full h-[100vh] flex flex-col bg-center items-center justify-center gap-6 absolute inset-0 bg-no-repeat bg-cover blur-[1px] brightness-[60%] pointer-events-none"
        >
          <strong 
            id="welcome" 
            class="text-white text-7xl opacity-0"
            style="font-family: Lobster;"
          >
            W e l c o m e
          </strong>
    
          <button 
            @click.prevent="handleClick" 
            id="enter" 
            class="btn bg-blue-600 hover:bg-blue-700 border-transparent shadow-none text-white opacity-0 z-50 pointer-events-auto"
            style="font-family: Poppins;"
          >
            Enter
          </button>
        </div>
    
        <div class="absolute inset-0 w-full h-full pointer-events-none">
          <img id="tree-right" src="/tree-right.webp" alt="Tree1" class="object-cover h-full absolute -right-64 max-lg:hidden blur-[1px] scale-120 brightness-[7%] z-10">
          <img id="tree-left" src="/tree-left.webp" alt="Tree2" class="object-cover h-full absolute -left-64 max-lg:-left-96 blur-[1px] scale-120 brightness-[7%] z-10">
        </div> 
      </div>
    </div>
  </div>

</template>
