<template>
    <div class="main-body">
        <header>
            <nav>
                <NuxtLink
                    v-for="tab in tabs"
                    :key="tab"
                    :data-tab="tab"
                    @click="switchTab(tab)"
                >{{ tab }}</NuxtLink>
            </nav>
        </header>

        <!-- Intro Tab -->
        <section
            id="intro"
            ref="intro"
            class="tab"
        >
            <div class="container">
                <div class="avatar">
                    <img
                        src="/images/webdev.png"
                        alt="Web Developer"
                    >
                </div>
                <div class="content">
                    <div class="name">
                        Your Name
                    </div>
                    <div class="job">
                        I'm <span class="text-gradient">Developer</span>
                    </div>
                    <div class="des">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse dolorum vero a,
                        quibusdam ipsa eius aliquid incidunt totam vel itaque exercitationem doloribus
                        tenetur officia repellendus velit in distinctio optio quisquam.
                        <br>
                        <NuxtLink
                            class="text-gradient"
                            to="#"
                        >
                            See my Skills
                        </NuxtLink>
                    </div>
                    <i class="fa-solid fa-quote-right" />
                </div>
            </div>
        </section>

        <!-- Experience Tab -->
        <section
            id="experience"
            ref="experience"
            class="tab"
        >
            <div class="container">
                <div class="list">
                    <div
                        v-for="item in experiences"
                        :key="item.year"
                        class="item"
                    >
                        <div class="time">
                            {{ item.year }}
                        </div>
                        <i :class="item.icon" />
                        <div class="content">
                            <div class="job">
                                {{ item.job }}
                            </div>
                            <div class="company">
                                {{ item.company }}
                            </div>
                            <div class="des">
                                {{ item.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skill Tab -->
        <section
            id="skill"
            ref="skill"
            class="tab"
        >
            <div class="container">
                <div class="list">
                    <div
                        v-for="sk in skills"
                        :key="sk.name"
                        class="item"
                    >
                        <i :class="sk.icon" />
                        <div class="name">
                            {{ sk.name }}
                        </div>
                        <div class="des">
                            {{ sk.description }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Tab -->
        <section
            id="project"
            ref="project"
            class="tab"
        >
            <div class="container">
                <div class="list">
                    <div
                        v-for="(proj, index) in projects"
                        :key="index"
                        class="item"
                    >
                        <img
                            :src="'https://picsum.photos/300?random=' + index"
                            :alt="proj.name"
                        >
                        <div class="index">
                            #{{ index + 1 }}
                        </div>
                        <div class="name">
                            {{ proj.name }}
                        </div>
                        <div class="des">
                            {{ proj.description }}
                        </div>
                        <div class="author">
                            <div class="job">
                                {{ proj.role }}
                            </div>
                            <div class="time">
                                {{ proj.date }}
                                <i class="fa-regular fa-clock" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Tab -->
        <section
            id="contact"
            ref="contact"
            class="tab"
        >
            <div class="container">
                <div class="content">
                    <div class="thank text-gradient">
                        Thank you!
                    </div>
                    <div class="des">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, laborum!
                        Vitae perspiciatis error nobis dolore corrupti quos dolorum a veniam rem
                        praesentium harum nam ipsum modi, in dignissimos voluptatem nesciunt eveniet,
                        nihil doloremque. Eos, repellendus mollitia nemo soluta ex eum aliquid
                        voluptates saepe voluptate minima! Commodi voluptatibus maxime suscipit
                        ullam!
                        <br>
                        <NuxtLink
                            class="text-gradient"
                        >
                            See My Intro
                        </NuxtLink>
                    </div>
                    <div class="list">
                        <div class="item">
                            <i class="fa-solid fa-phone" />
                            +12345XXX
                        </div>
                        <div class="item">
                            <i class="fa-regular fa-envelope" />
                            guy.XXX@gmail.com
                        </div>
                        <div class="item">
                            <i class="fa-brands fa-instagram" />
                            @mr_bombastic.web
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const active = ref('intro')
const zIndex = ref(2)

// Refs for each section
const intro = ref<HTMLElement | null>(null)
const experience = ref<HTMLElement | null>(null)
const skill = ref<HTMLElement | null>(null)
const project = ref<HTMLElement | null>(null)
const contact = ref<HTMLElement | null>(null)

// Reactive variables for tracking mouse position as percentage
const mouseX = ref('50%')
const mouseY = ref('50%')

const tabs = [
    'intro', 'experience', 'skill', 'project', 'contact',
]

// Convert mouse position to percentage relative to viewport width and height
const updateMousePosition = (event: MouseEvent) => {
    mouseX.value = `${(event.clientX / window.innerWidth) * 100}%`
    mouseY.value = `${(event.clientY / window.innerHeight) * 100}%`
}

// Function to switch tabs and start the animation from the mouse position
const switchTab = (tab: string) => {
    if (tab !== null && tab !== active.value) {
        const activeOld = document.querySelector('.tab.active')
        if (activeOld) { activeOld.classList.remove('active') }
        active.value = tab

        const tabActive = document.getElementById(active.value)!
        zIndex.value++
        tabActive.style.zIndex = zIndex.value.toString()
        tabActive.classList.add('active')
    }
}

onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
})

// Clean up listener on component unmount
onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
})
// Experience data
const experiences = [
    {
        year: '2015',
        icon: 'fa-solid fa-school-flag',
        job: 'Go To School',
        company: 'Name School',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates perspiciatis veniam animi reiciendis autem perferendis.',
    },
    {
        year: '2019',
        icon: 'fa-solid fa-briefcase',
        job: 'BackEnd Developer',
        company: 'Name Company',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates perspiciatis veniam animi reiciendis autem perferendis.',
    },
    {
        year: '2020',
        icon: 'fa-solid fa-briefcase',
        job: 'FrontEnd Developer',
        company: 'Name Company ABC',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates perspiciatis veniam animi reiciendis autem perferendis.',
    },
    {
        year: '2024',
        icon: 'fa-solid fa-briefcase',
        job: 'FullStack Developer',
        company: 'Name Company AAA',
        description:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates perspiciatis veniam animi reiciendis autem perferendis.',
    },
]

// Skills data
const skills = [
    {
        name: 'CSS',
        icon: 'fa-brands fa-css3-alt',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
    {
        name: 'HTML5',
        icon: 'fa-brands fa-html5',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
    {
        name: 'Javascript',
        icon: 'fa-brands fa-js',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
    {
        name: 'React Js',
        icon: 'fa-brands fa-react',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
    {
        name: 'PHP',
        icon: 'fa-brands fa-php',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
    {
        name: 'Angular',
        icon: 'fa-brands fa-angular',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    },
]

// Projects data
const projects = [
    {
        name: 'Name Project',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        role: 'FullStack',
        date: '2022/10/10',
    },
    {
        name: 'Name Project',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        role: 'FullStack',
        date: '2022/10/10',
    },
    {
        name: 'Name Project',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        role: 'FullStack',
        date: '2022/10/10',
    },
    {
        name: 'Name Project',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        role: 'FullStack',
        date: '2022/10/10',
    },
    {
        name: 'Name Project',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sint? Amet minus similique officiis enim impedit unde cumque id corrupti!',
        role: 'FullStack',
        date: '2022/10/10',
    },
]
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Righteous&display=swap');

.main-body {
    height: 100vh;
    background-color: #23282E;
    font-family: 'Poppins';
    margin: 0;
    font-size: 16px;
    color: white;
}

a{
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
}

::-webkit-scrollbar{
    width: 0;
}

header{
    width: 100%;
    position: fixed;
    z-index: 100;
    text-align: center;
    padding-top: 10px;
}

header nav a{
    margin: 0 30px;
    color: var(--color);
    font-size: small;
}

.tab{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-image: url(/images/bg.png);
    background-size: 50%;
}

.tab .container{
    width: 1140px;
    max-width: 100%;
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    margin: auto;
    position: relative;
}

#intro{
    background-color: #16222D;
}

#intro .avatar{
    text-align: right;
    height: 100%;
}

#intro .avatar img{
    height: 100%;
    filter: saturate(0.5);
}

#intro .content{
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    width: 500px;
    max-width: 80%;
}

#intro .content .name,
#intro .content .job{
    font-size: 6em;
    font-weight: bold;
    font-family: 'Righteous', sans-serif;
    line-height: 1em;
}

.text-gradient{
    background-image: linear-gradient(
        to right, #E4454A, #CA3EA7
    );
    display: inline-block;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

#intro .content .des{
    margin-top: 1.2em;
    width: 70%;
}
#intro .content .des a{
    margin-top: 1.2em;
}

#intro .content i{
    font-size: 5em;
    position: absolute;
    top: -20px;
    right: -60px;
    color: #293b4c;
}

/* skills */
#skill{
    background-color: #F2F0EB;
    color: #eee;
    background-image: linear-gradient(
        45deg, #3A2530, #171514, #412726
    );
    background-size: cover;
}

#skill .list{
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 50px;
    box-sizing: border-box;
    gap: 0px;
}

#skill .list .item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
}

#skill .list .item:nth-child(odd){
    background-color: #3F2525;
}

#skill .list .item i{
    width: 50px;
    height: 50px;
    background-color: #eee;
    color: #CA3EA7;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 10px 10px #0005;
}

#skill .list .item .name{
    font-size: 1.5em;
    margin-top: 0.7em;
}

#skill .list .item .des{
    font-size: small;
    opacity: 0.8;
}

/* project */
#project{
    background-color: #cfbaba;
    color: #444B57;
}

#project .list{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 50px;
}

#project .list .item img{
    width: 100%;
    height: 150px;
    object-fit: cover;
}

#project .list .item{
    border-radius: 30px;
    overflow: hidden;
    background-color: #fff;
    position: relative;
}

#project .list .item .index{
    background-color: #fff;
    font-weight: bold;
    font-size: 1.5em;
    position: absolute;
    transform: translateY(-100%);
    padding: 10px;
    font-style: italic;
    border-top-right-radius: 20px;
}

#project .list .item .name{
    font-weight: bold;
    font-size: large;
    padding: 10px;
}

#project .list .item .des{
    padding: 0 10px 10px 10px;
}

#project .list .item .author{
    padding: 10px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
}

#project .list .item .job{
    font-weight: bold;
}

#project .container{
    overflow: auto;
}

/* experience */
#experience{
    background-image: linear-gradient(
        45deg, #212632, #242A34, #3C4C5A
    );
    background-size: cover;
}

#experience .list{
    height: 100%;
    width: max-content;
    display: flex;
    justify-content: left;
    box-sizing: border-box;
    gap: 20px;
    position: relative;
    z-index: 1;
}

#experience .list .item{
    display: grid;
    grid-template-rows: 1fr 50px 1fr;
    gap: 20px;
    width: 200px;
    flex-shrink: 0;
}

#experience .list .item i{
    background-color: #444B57;
    width: 50px;
    color: #16222D;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

#experience .list .item .time{
    display: flex;
    align-items: end;
    font-size: large;
}

#experience .list .item .content .job{
    font-size: large;
}

#experience .list .item .content .company{
    color: #E4454A;
}

#experience .list .item .content .des{
    font-size: 0.8em;
    opacity: 0.7;
}

#experience .list .item:nth-child(odd) .content{
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    flex-direction: column;
    justify-content: end;
}

#experience .list .item:nth-child(odd) .time{
    grid-row-start: 3;
    grid-row-end: 4;
    align-items: start;
}

#experience .list::before{
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2px;
    background-color: #444B57;
    content: '';
    z-index: -1;
}

#experience .container{
    overflow: auto;
    padding: 50px;
}

#contact{
    background: #242330;
}

#contact .content{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#contact .thank{
    font-size: 5em;
    font-weight: bold;
    display: block;
}

#contact .des{
    width: 500px;
    max-width: 80%;
    text-align: center;
}

#contact .list{
    text-align: center;
}

#contact .list .item{
    display: inline-block;
    margin: 10px 30px;
}

@media screen and (max-width: 991px){
    /* ipad, tablets */
    #intro .avatar img{
        transform: translateX(200px);
    }

}

@media screen and (max-width: 767px){

    .main-body{
        font-size: 10px;
    }

    header nav a{
        margin: 10px;
    }

    #intro .avatar img{
        transform: none;
    }

    #intro .content{
        left: 20px;
    }

    #intro .content .name{
        font-size: 4em;
    }

    #intro .content i{
        position: unset;
    }

    #skill .list{
        padding: 0px;
        grid-template-columns: repeat(2, 1fr);
    }

    #skill .list .item:nth-child(odd){
        background: unset;
    }

    #skill .list .item:nth-child(2),
    #skill .list .item:nth-child(3n){
        background: #3F2525;
    }

    #project .list{
        padding: 10px;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
    }

    #project .list .item img{
        height: 100px;
    }
}

/* Transition Animation */
.tab{
    position: fixed;
    inset: 0 0 0 0;
    z-index: 1;
}

#intro{
    z-index: 2;
}

.tab.active {
  clip-path: circle(0% at v-bind('mouseX') v-bind('mouseY'));
  animation: showTab 1s ease-in-out 1 forwards;
}

@keyframes showTab {
  to {
    clip-path: circle(200% at v-bind('mouseX') v-bind('mouseY'));
  }
}
</style>
