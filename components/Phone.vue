<script setup lang="ts">
import gsap from 'gsap';

const openPhone = ref<boolean>(false)
const isSleepMode = ref<boolean>(true)

provide('open-phone', openPhone)

let tl: gsap.core.Timeline

onMounted(() => {
    watch(openPhone, () => phoneAnimate(), { immediate: true })
})

function phoneAnimate() {
    if (openPhone.value) {
        gsap.killTweensOf('#phone')
        
        tl = gsap.timeline()

        tl.to('#text-phone', {
            opacity: 0,
            ease: 'power1'
        })
        .to('#phone', {
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1,
            rotate: 0,
            ease: 'power1',
            onComplete: () => {
                isSleepMode.value = false
                sleepModeAnimate()
            }
        })
    } else {
        isSleepMode.value = true
        sleepModeAnimate()
        
        tl = gsap.timeline()

        tl.to('#phone', {
            top: '-260px',
            left: '50px',
            x: 0,
            y: 0,
            scale: 0.10,
            rotate: -90,
            delay: 0.8,
            ease: 'power4',
        })
        .to('#text-phone', {
            opacity: 1,
            ease: 'power1'
        })
        .to(['#phone', '#text-phone'], {
            rotation: '+=5',
            repeat: -1,
            yoyo: true,
            ease: 'power1'
        })
    }
}
 
function sleepModeAnimate() {
    if (isSleepMode.value) {
        tl = gsap.timeline()
        
        tl.to('.sleep-mode', {
            opacity: 1,
            height: '50%',
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.fromTo('.boot-flash', 
                    { width: '40px', height: '40px', ease: 'power1.inOut' },
                    { width: '0px', height: '0px', ease: 'power4' }
                )
            }
        })
    } else {
        tl = gsap.timeline()
        
        tl.to('.sleep-mode', {
            opacity: 0,
            ease: 'power2.inOut',
        })
        .to('.sleep-mode', {
            height: '0%'
        })
    }
}

function handlePhoneButton() {
    isSleepMode.value = !isSleepMode.value
    sleepModeAnimate()
}
</script>

<template>
    <div 
        id="phone"
        class="w-72 h-[600px] scale-10 absolute z-[70] -top-[260px] left-[50px] -rotate-90 p-2 rounded-4xl"
        :class="openPhone ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'"
        @click="openPhone = true"
    >
        <div 
            class="w-full h-[90%] border-6 border-zinc-900 bg-cover bg-zinc-900 ring-2 ring-slate-600 rounded-3xl relative"
            style="background-image: url('/walpaper.webp');"
            >
            
            <!-- Phone Button -->
            <div class="absolute top-18 -right-3 w-1 h-17 bg-zinc-950 rounded-r-4xl"></div>
            <div @click.stop="handlePhoneButton" class="absolute cursor-pointer pointer-events-auto top-40 -right-3 w-1 h-9 bg-zinc-950 rounded-r-4xl"></div>

            <!-- Sleep/Off Mode -->
            <div class="w-full h-full flex flex-col relative">
                <div 
                    class="sleep-mode w-full h-[50%] absolute top-0 rounded-t-2xl"
                    style="background-image: linear-gradient(to bottom right, black, black, black, #09090b, black);"
                />
                <div
                    class="sleep-mode w-full h-[50%] absolute bottom-0 bg-black rounded-b-2xl"
                    style="background-image: linear-gradient(to top left, black, black, black, #09090b, black);"
                />

                <div class="boot-flash absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-0 h-0 bg-white blur-xs drop-shadow-[0_0_8px_white]"></div>
            </div>

            <PhoneScreen class=" pointer-events-auto" :is-sleep-mode="isSleepMode"/>

             <!-- Camera -->
            <div class="absolute top-2 left-2 w-5 h-5 flex justify-center items-center rounded-full bg-zinc-950">
                <div 
                    class="w-3 h-3 rounded-full" 
                    style="background-image: linear-gradient(to top left, #18181b, #09090b, #18181b, #18181b);"
                />
            </div>
        </div>
    </div>

    <p 
        id="text-phone"
        class="absolute top-[65px] left-[170px] drop-shadow-[0_0_8px_yellow] text-xl text-yellow-200"
        style="font-family: Pirata One;"
    >
        Phone
    </p>
</template>