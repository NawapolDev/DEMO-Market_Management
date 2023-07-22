<template>
    <div v-show="open" class="absolute top-0 left-0 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 z-0 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="flex flex-col justify-center w-[500px] h-[250px] bg-white shadow rounded-xl overflow-hidden">
                <div class="py-4 bg-indigo-500 text-white text-2xl font-bold">แจ้งเตือน</div>
                <div class="grow flex items-center justify-center ">ท่านต้องการออกจากระบบหรือไม่</div>
                <div class="flex justify-end px-4 py-2 gap-6 bg-gray-200">
                    <button class="btn btn-confirm">ตกลง</button>
                    <button class="btn">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'form-confirm',
    props:{
        open:{
            type: Boolean,
            require: true
        },
        Msg:{
            type: String,
            default: ''
        },
        Detail:{
            type: String,
            default: ''
        },

    }
}
</script>