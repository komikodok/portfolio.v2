<script setup lang="ts">
import gsap from 'gsap'
import ProjectCard from './ProjectCard.vue'

const { data, error } = await useFetch('/api/projects')

const angle = ref<number>(0)

const openCarousel = ref<boolean>(false)

let tl: gsap.core.Timeline

onMounted(async () => {
    await nextTick()

    if (data.value && !error.value) {
        angle.value = 360 / data.value.length
        animate()
    }
})

watch(() => openCarousel.value, () => animate())

function animate() {
    if (openCarousel.value) {
        tl = gsap.timeline()

        tl.add([
            gsap.to('.project-card-wrapper', {
                top: 200,
                right: 'auto',
                scale: 1,
                stagger: 0.1,
                transformOrigin: 'center center',
                ease: 'power4'
            }),
            gsap.to('.overlay', { opacity: 1, ease: 'linear'}),
            gsap.to('#text-project-card', { opacity: 0, ease: 'linear'})
        ])
        .to('.project-card-wrapper', {
            stagger: 0.2,
            transform: (i) => {
                const rotateY = `rotateY(${i * angle.value}deg)`
                const translateZ = `translateZ(300px)`
                return `${rotateY} ${translateZ}`
            },
            ease: 'power2'
        })
    } else {
        gsap.killTweensOf('.slider')

        tl = gsap.timeline()

        tl.add([
            gsap.to('.slider', { rotateY: 0 }),
            gsap.to('.overlay', { opacity: 0, ease: 'linear' }),
            gsap.to('#text-project-card', { opacity: 1, ease: 'linear'})
        ])
        .to('.project-card-wrapper', {
            top: 20,
            right: 40,
            scale: 0.1,
            filter: 'brightness(1) blur(0px)',
            stagger: 0.1,
            transformOrigin: 'top right',
            transform: 'rotateY(0deg) translateZ(0px)',
            ease: 'power1'
        })
        .to('.project-card-wrapper', {
            rotate: (i) => i * (angle.value / 20),
            stagger: 0.2,
            ease: 'power2'
        })
    }
}

function handlePrevClick() {
    gsap.to('.slider', {
        rotateY: `+=${angle.value}`,
        ease: 'power1.inOut'
    })
}

function handleNextClick() {
    gsap.to('.slider', {
        rotateY: `-=${angle.value}`,
        ease: 'power1.inOut'
    })
}
</script>

<template>
    <div id="project-carousel" class="w-screen h-screen flex justify-center items-center absolute inset-0">

        <div class="overlay w-full h-full absolute inset-0 opacity-0 bg-black/70"></div>

        <div class="slider transform-3d w-full h-full absolute inset-0 flex justify-center items-center">
            <div 
                v-for="(d, index) in data" 
                :key="index"
                class="project-card-wrapper h-80 cursor-pointer rotate-12 absolute bottom-0 brightness-[5%] blur-[2px] -translate-x-10 scale-10 z-20"              
                style="backface-visibility: hidden;"
            >
                <ProjectCard 
                    :id="d.id"
                    :title="d.title"
                    :description="d.description"
                    :image="d.image"
                    :github="d.github"
                    :link="d.link"
                    :open-carousel="openCarousel"
                />
            </div>
        </div>

        <div v-if="openCarousel" class="flex justify-between absolute bottom-0 w-96 h-20">
            <button
                id="prev-button" 
                class="w-20 h-20 cursor-pointer"
                @click="handlePrevClick"
            >
                <img src="/prev-button.webp" class="object-cover">
            </button>
            
            <button 
                id="close-card-button"
                class="w-20 h-20 cursor-pointer flex justify-center items-center"
                @click="() => openCarousel = false"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white drop-shadow-[0_0_8px_white] hover:scale-110 transition">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            </button>

            <button 
                id="next-button" 
                class="w-20 h-20 cursor-pointer"
                @click="handleNextClick"
            >
                <img src="/next-button.webp" class="object-cover">
            </button>
        </div>

        <p 
            id="text-project-card"
            class="absolute top-15 right-8 cursor-pointer drop-shadow-[0_0_8px_yellow] text-yellow-200 text-xl"
            @click="openCarousel = true"
            style="font-family: Pirata One;"
        >
            Card's
        </p>
    </div>
</template>

<style scoped>
#project-carousel {
    perspective: 5000px;
}

.project-card-wrapper {
  transform: rotateY(0deg) translateZ(0px);
  transform-origin: center center;
}

</style>