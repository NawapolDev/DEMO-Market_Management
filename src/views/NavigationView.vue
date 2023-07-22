<template>
  <header>
    <nav class="md:min-h-full bg-gray-300 shadow-sm shadow-gray-100/50 overflow-auto">
      <div class="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-between px-2 gap-1 lg:gap-4">
            <div class="flex-shrink-0 text-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9">
                <path
                  d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                <path fill-rule="evenodd"
                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div class="hidden md:block">
              <span
                class="flex md:flex-shrink-0 font-bold text-start text-base lg:text-xl pointer-events-none truncate">
                โปรแกรมบริหารจัดการตลาดนัด
              </span>
            </div>
          </div>
          <div class="flex items-center justify-around mx-2 lg:mx-6 px-2 gap-1 lg:gap-4">
            <div class="w-1/6">
              <router-link to="/main" active-class="border-b-4 text-indigo-700 bg-gray-300"
                :class="'flex items-center justify-center gap-2 p-4  w-[110px] border-indigo-400 hover:border-b-4 hover:bg-gray-300 transition-all duration-100'">
                <i class="fa-solid fa-chart-simple"></i>
                <span class="md:text-base sm:text-sm">หน้าหลัก</span>
              </router-link>
            </div>
            <div class="w-1/6">
              <router-link to="/market" active-class="border-b-4 border-indigo-400 text-indigo-700 bg-gray-300"
                :class="'flex items-center justify-center gap-2 p-4 w-[110px] hover:border-b-4 hover:border-indigo-400 hover:bg-gray-300 transition-all duration-100'">
                <i class="fa-solid fa-store"></i>
                <span class="md:text-base sm:text-sm">ตลาด</span>
              </router-link>
            </div>
            <div class="w-1/6">
              <router-link to="/qrcode" active-class="border-b-4 border-indigo-400 text-indigo-700 bg-gray-300"
                :class="'flex items-center justify-center gap-2 p-4 w-[110px] hover:border-b-4 hover:border-indigo-400 hover:bg-gray-300 transition-all duration-100'">
                <i class="fa-sharp fa-solid fa-qrcode"></i>
                <span class="md:text-base sm:text-sm">QRcode</span>
              </router-link>
            </div>
            <div class="w-1/6">
              <router-link to="/employee" active-class="border-b-4 text-indigo-700 bg-gray-300"
                :class="'flex items-center justify-center gap-2 p-4 w-[110px] border-indigo-400 hover:border-b-4 hover:bg-gray-300 transition-all duration-100'">
                <i class="fa-solid fa-user-group"></i>
                <span class="md:text-base sm:text-sm">พนักงาน</span>
              </router-link>
            </div>
            <div class="w-1/6">
              <router-link to="/receipt" active-class="border-b-4 text-indigo-700 bg-gray-300"
                :class="'flex items-center justify-center gap-2 p-4 w-[110px] border-indigo-400 hover:border-b-4 hover:bg-gray-300 transition-all duration-100'">
                <i class="fa-solid fa-file-invoice-dollar"></i>
                <span class="md:text-base sm:text-sm">ใบเสร็จ</span>
              </router-link>
            </div>
            <div class="w-1/6">
              <button class="btn btn-cancel w-[100px] lg:w-[120px] text-sm" @click="logout">ออกจากระบบ</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- <nav class="flex flex-col md:hidden w-full">
      <details>
        <div class="bg-gray-800 inline-flex items-center justify-between p-2 text-gray-400;">
          <div>
            aaaaaaaaaaa
          </div>
          <summary class="p-2 text-gray-500 text-lg">
            <i class="fa-solid fa-bars"></i>
          </summary>
        </div>
        <div class="bg-gray-300 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" :to="item.to"
            active-class="bg-gray-400 text-indigo-700"
            :class="'block px-2 py-2 lg:px-4 lg:py-3 rounded-md text-sm font-medium'">
            {{ item.name }}
          </router-link>
        </div>
      </details>
    </nav> -->
  </header>
  <body>
    <router-view></router-view>
  </body>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    const navigation = [
      { name: "หน้าหลัก", to: { name: "main" } },
      { name: "ตลาด", to: { name: "market" } },
      { name: "QR Code", to: { name: "qrcode" } },
      { name: "พนักงาน", to: { name: "employee" } },
      { name: "ใบเสร็จ", to: { name: "receipt" } },
    ]
    return {
      navigation,
    }
  },
  methods: {
    logout() {
      if (confirm("คุณต้องการที่จะออกจากระบบใช่หรือไม่?")) {
        localStorage.removeItem('admin-info')
        this.$router.push({ name: 'admin' })
      }
    },
  }
};
</script>
