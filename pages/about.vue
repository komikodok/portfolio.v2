<script setup lang="ts">
import gsap from 'gsap'

useHead({ title: 'About Me' })

const openProfile = ref<boolean>(true)
const openSkills = ref<boolean>(true)

onMounted(async () => {
    await nextTick()
    
    setTimeout(() => {
        openSkills.value = false

        setTimeout(() => {
            openProfile.value = false
        }, 2300)
    }, 2000)

    const tl = gsap.timeline()
    tl.add([
        gsap.fromTo('#about', 
            { filter: 'blur(0px) brightness(0.1)', },
            { 
                filter: 'blur(0px) brightness(1)',
                ease: 'power1.in'
            }
        ),
        gsap.to('#flashlight', {
            clipPath: `circle(100px at 50px 50px)`,
            filter: 'blur(0px) brightness(1)',
            ease: 'power4'
        }),
        gsap.to('#bg-layer', { 
            zIndex: 0,
        })
    ])
    .to(['#bg-layer', '#flashlight'], {
        backgroundPositionY: '100%',
        duration: 5,
        ease: 'power3',
    })
    .add([
        gsap.to(['#bg-layer', '#flashlight'], {
            backgroundPositionY: '30%',
            duration: 5,
            ease: 'power3',
        }),
        gsap.to('.notif', {
            opacity: 1,
            scale: 1,
            ease: "back.out(1.7)"
        }),
    ])
    .to('.notif', {
        opacity: 0,
        scale: 0.9,
        display: 'none',
        ease: 'power2.inOut'
    })
})

onBeforeRouteLeave(async () => {
  await new Promise(resolve => {
    gsap.to('#about', {
      filter: 'blur(4px) brightness(0)',
      duration: 0.8,
      onComplete: resolve
    })
  })
})

function handleMouseMove(e: MouseEvent) {
    e.preventDefault()

    gsap.to('#flashlight', {
        clipPath: `circle(100px at ${e.clientX}px ${e.clientY}px)`,
        filter: 'blur(0px) brightness(1)',
        ease: 'power4'
    })
}

function handleTouchMove(e: TouchEvent) {
    const touch = e.touches[0];
    if (!touch) return;

    gsap.to('#flashlight', {
        clipPath: `circle(100px at ${touch.clientX}px ${touch.clientY}px)`,
        filter: 'blur(0px) brightness(1)',
        ease: 'power4'
    });
}

</script>

<template>
    <div 
        @mousemove="handleMouseMove" 
        @touchmove="handleTouchMove"
        id="about" 
        class="relative w-screen h-screen bg-black overflow-hidden"
    >

        <Notif class="notif">
            <p class="text-sm text-yellow-200">Item Acquired</p>
            <p class="text-xl font-bold text-white typing-text">You got 2 scroll parchments!</p>
        </Notif>

        <div class="w-full h-full">
            <div
                id="bg-layer"
                style="background-image: url('/forest2.webp');"
                class="w-full h-full absolute inset-0 flex justify-center items-center gap-4 bg-center bg-no-repeat brightness-[20%] bg-cover z-10"
            >
                <Profile :open-profile="openProfile" :open-skills="openSkills" @is-open="() => openProfile = !openProfile" />
                <Skills :open-skills="openSkills" :open-profile="openProfile" @is-open="() => openSkills = !openSkills" />
                <Menu />
            </div>

            <div
                id="flashlight"
                style="background-image: url('/forest2.webp');"
                class="w-full h-full absolute inset-0 flex justify-center items-center gap-4 bg-center bg-no-repeat brightness-100 bg-cover"
            >
                <Profile 
                    :open-profile="openProfile" 
                    :open-skills="openSkills" 
                    @is-open="() => openProfile = !openProfile"
                >
                    <template #profile-content>
                        <ProfileContent />
                    </template>
                </Profile>
                <Skills 
                    :open-skills="openSkills" 
                    :open-profile="openProfile" 
                    @is-open="() => openSkills = !openSkills"
                >
                    <template #skills-content>
                      <SkillsContent />
                    </template>
                </Skills>

                <Menu />

            </div>
        </div>
    </div>
</template>