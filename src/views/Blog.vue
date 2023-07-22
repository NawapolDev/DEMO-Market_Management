<template>
    <div class="max-w-full bg-slate-800 h-screen w-screen">
        <header>
            <div class="bg-slate-900 w-full border-b-4 border-solid border-orange-500">
                <div class="max-w-7xl mx-auto flex flex-row px-2 md:px-8 py-2 h-fit justify-between items-center">
                    <div class="flex flex-row justify-center items-center md:space-x-4">
                        <img class="hidden md:block" src="../assets/image/KlogoMain.png" alt="" width="75" height="50">
                        <img class="md:hidden block" src="../assets/image/KlogoMain.png" alt="" width="50" height="25">
                        <div class="hidden md:block text-xl md:text-2xl font-bold whitespace-nowrap space-x-2">
                            <span class="text-white">ตลาดแก่งเสี้ยน</span>
                            <span class=" text-orange-500">Market</span>
                        </div>
                    </div>
                    <div class="flex md:hidden flex-row justify-center items-center text-xl font-bold whitespace-nowrap space-x-2">
                        <span class="text-white tracking-tight md:tracking-wide">ตลาดแก่งเสี่ยน</span>
                        <span class=" text-orange-500 tracking-tight md:tracking-wide">Market</span>
                    </div>
                    <div class="flex justify-center items-center text-blue-900 bg-white px-3 py-2 md:p-2 h-1/2 rounded hover:scale-105 transition-all duration-75">
                        <a class="space-x-2 flex justify-center items-center" href="https://www.facebook.com/profile.php?id=100054816548065" target="_blank">
                            <i class="fa-brands fa-facebook text-2xl md:text-xl no-underline"></i>
                            <span class="hidden md:block font-bold">Facebook</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="relative w-full">
                <div name="container" class="flex justify-center">
                    <div name="inner" class="relative h-[30vh] md:h-[50vh] w-full overflow-hidden">
                        <div name="items" class="relative top-0 left-0 right-0 bottom-0 w-full h-full" v-show="currentSlide === i"
                            v-for="(slide,i) in slides" :key="`item-${i}`">
                            <img class="w-full h-full object-cover" :src="slide.image">
                        </div>
                    </div>
                </div>
                <div class="absolute flex top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2">
                    <button v-for="(item,i) in slides.length" :key="i" class="p-2 md:p-4 rounded-full bg-white" :class="[ currentSlide === i ? 'opacity-100' : 'opacity-50']"></button>
                </div>
                <div class="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full md:w-[65%] px-5">
                    <div class="m-auto w-full flex justify-between">
                        <button @click="prev" class="px-4 py-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-90 text-gray-700">
                            <i class="fa-solid fa-chevron-left text-base md:text-2xl"></i>
                        </button>
                        <button @click="next" class="px-4 py-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-90 text-gray-700">
                            <i class="fa-solid fa-chevron-right text-base md:text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- ข้อมูลตลาดเพิ่มใหม่ได้ -->
            <!-- <div class="bg-slate-600">
                <div class="max-w-7xl mx-auto space-y-4 p-2 sm:px-6 lg:p-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 my-2">
                        <div class="flex flex-col md:flex-row rounded-md overflow-hidden bg-white bg-opacity-50 shadow-md">
                            <div class="w-full md:w-1/3"><img class="w-full h-full object-cover" src="../assets/image/chart.jpg" alt=""></div>
                            <div class="w-full md:w-2/3 p-2 bg-gray-100">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic cum incidunt quia odit ex. Fugiat rerum a hic, dolore non sunt culpa quo similique accusantium nulla delectus quibusdam assumenda totam.</div>
                        </div>
                        <div class="flex flex-col md:flex-row rounded-md overflow-hidden bg-white bg-opacity-50 shadow-md">
                            <div class="w-full md:w-1/3">image</div>
                            <div class="w-full md:w-2/3 p-2 bg-gray-100">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic cum incidunt quia odit ex. Fugiat rerum a hic, dolore non sunt culpa quo similique accusantium nulla delectus quibusdam assumenda totam.</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 w-full">
                        <div class="flex flex-col rounded-md overflow-hidden shadow-md">
                            <div class="w-full">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="bg-slate-700">
                <div class="max-w-7xl mx-auto p-2 sm:px-6 lg:p-8">
                    <div class="flex flex-col md:flex-row w-full rounded-md overflow-hidden bg-opacity-50 shadow-md">
                        <div class="flex flex-col md:flex-row w-full justify-center items-center overflow-hidden">
                            <div class="w-full md:flex md:w-1/3 h-full bg-gray-200 flex-col justify-center items-center">
                                <span class="grow-0 w-full text-lg md:text-2xl font-bold px-2 py-4 flex justify-center items-center bg-slate-800 text-white"><i class="fa-solid fa-video mr-2"></i>ภาพบรรยากาศตลาดนัดแก่งเสี้ยน</span>
                                <span class="hidden md:flex grow w-full p-2 justify-start items-start"></span>
                            </div>
                            <div class="w-full md:w-2/3 overflow-hidden">
                                <video class="w-full h-full object-cover" muted loop autoplay controls src="../assets/Video/KangsianVideo_1.mp4"></video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-600">
                <div class="max-w-7xl mx-auto p-2 sm:px-6 lg:p-8">
                    <div class="flex flex-col md:flex-row w-full rounded-md overflow-hidden bg-opacity-50 shadow-md bg-white">
                        <div class="w-full md:w-1/2 flex flex-col space-y-1 md:space-y-2 bg-white p-4">
                            <span class="text-lg md:text-2xl font-bold"><i class="fa-solid fa-location-dot text-red-600 mr-2"></i>แผนที่ตลาดนัดแก่งเสี้ยนMarket</span>
                            <div></div>
                        </div>
                        <div class="flex w-full justify-center items-center md:w-1/2 overflow-hidden">
                            <iframe class="block md:hidden w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7740.582393786096!2d99.49472512799335!3d14.059974275639009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e3754b684cad97%3A0x79786d688db044eb!2z4LmB4LiB4LmI4LiH4LmA4Liq4Li14LmJ4Lii4LiZIE1hcmtldA!5e0!3m2!1sen!2sth!4v1672388097627!5m2!1sen!2sth" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            <iframe class="hidden md:block w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7740.582393786096!2d99.49472512799335!3d14.059974275639009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e3754b684cad97%3A0x79786d688db044eb!2z4LmB4LiB4LmI4LiH4LmA4Liq4Li14LmJ4Lii4LiZIE1hcmtldA!5e0!3m2!1sen!2sth!4v1672388097627!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="flex justify-center">
            <hr class="border-orange-600 border-solid border-2 w-full">
        </div>
        <footer>
            <div class="text-xs md:text-sm w-full text-white py-1 bg-slate-900">
                <div class="max-w-7xl mx-auto flex flex-col justify-center items-center ">
                    <span>แยกแก่งเสี้ยน ต.แก่งเสี้ยน อ.เมือง ฯ จ.กาญจนบุรี</span>
                    <span><i class="fa-solid fa-envelope"></i> kangsian.market@gmail.com   <i class="fa-solid fa-phone"></i> 099 451 9879</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>


export default ({
    name: "Blog",
    data() {
        return {
            slides:[
                {image: require('@/assets/image/bg1.jpg')},
                {image: require('@/assets/image/bg2.jpg')},
                {image: require('@/assets/image/bg3.jpg')},
            ],
            currentSlide:0,
            slideInterval:null,
        }
    },
    computed: {
        
        
    },
    mounted(){
        this.startSlideTimer();
    },
    beforeUnmount(){
        this.stopSlideTimer();
    },
    methods:{
        setCurrentSlide(index){
            this.currentSlide = index;
        },
        prev(){
            const index = this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1;
            this.setCurrentSlide(index);
            this.startSlideTimer();
        },
        _next(){
            const index = this.currentSlide < this.slides.length -1 ? this.currentSlide + 1 : 0;
            this.setCurrentSlide(index);
        },
        next(){
            this._next();
            this.startSlideTimer();
        },
        startSlideTimer() {
            this.stopSlideTimer();
            this.slideInterval = setInterval(() => {
                this._next();
            }, 5000);
        },
        stopSlideTimer(){
            clearInterval(this.slideInterval);
        }
    }
})
</script>
