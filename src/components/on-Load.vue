<template>
    <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <!-- vue-modal class -->
        <div v-show="open" class="modal">
            <!-- inner class -->
            <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-show="open" class="flex items-center justify-center min-h-screen p-4 text-center">
                    <!-- content -->
                    <div class="text-white">
                        <!-- <div class="flex item-center justify-center text-xl font-semibold">
                            Loading...
                        </div> -->
                        <div class="flex items-center justify-center my-6">
                            <svg class="w-10 h-10 animate-spin left-1/2 -ml-0" fill="none" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    fill="currentColor">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default ({
    name : "onLoad",
    props: {
        open:{
            type: Boolean,
            require: true
        }
    }
})
</script>