<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header>
      <div class="flex flex-row mx-auto px-4 justify-center items-center h-full bg-slate-800 shadow-md ">
        <i class="fa-solid fa-bullhorn mx-2 md:mx-4 text-3xl md:text-5xl text-slate-500"></i>
        <div class="flex flex-col ml-4">
          <h1 class="grow py-6 text-white text-left font-bold text-3xl md:text-4xl">แจ้งลา / ไม่มาขาย</h1>
          <!-- <span class="text-gray-400 text-left text-sm md:text-base pb-2 md:pb-4">แจ้งลาหรือไม่มาขาย โดยผู้แจ้งต้องมั่นใจว่าวันนี้จะไม่มาขาย เพื่อที่ตลาดจะได้เอาที่ของท่านไปให้ผู้อื่นมาใช้ในวันนั้น ๆ</span> -->
        </div>
      </div>
    </header>
    <!-- Header -->
    <!-- Body -->
    <body>
      <div class="max-w-7xl mx-auto my-10 px-2 md:px-4 py-3 md:py-6">
        <div class="flex flex-row items-center justify-center">
          <div class="bg-gray-200 w-4/5 md:w-1/2 z-0 shadow-lg rounded-md">
            <div class="flex flex-col justify-center items-center py-6 gap-2 bg-red-800 overflow-hidden rounded-t-md">
              <span class="text-2xl font-bold text-white">วันที่ {{ date.dd + "&nbsp;" + date.mm + "&nbsp;" + date.yy}}</span>
              <span class="text-white text-sm">{{ outOfTime ? 'ท่านไม่สามารถแจ้งลาได้หากเวลาเกิน 14:00 น.' : 'กรุณาแจ้งก่อนเวลา 14:00 น.'}}</span>
            </div>
            <div class="flex flex-col justify-center gap-12 items-center my-12">
              <button v-if="outOfTime == false" ref="leavebtn" @click="leave" class="px-12 py-5 text-lg font-bold hover:scale-110 rounded-md btn-confirm transition-all duration-300">
                ยืนยัน
              </button>
              <button v-else ref="leavebtn" class="cursor-not-allowed px-12 py-5 text-lg font-bold hover:scale-110 rounded-md btn-disabled transition-all duration-300">
                ยืนยัน
              </button>
              <div class="flex flex-col gap-2 justify-center items-center text-center px-4">
                <p class="text-sm md:text-base">กรุณากดปุ่มยืนยันเพื่อแจ้งไม่เข้ามาขายในวันที่ดังกล่าว</p>
                <p class="text-gray-500 text-xs md:text-sm after:content-['*'] after:ml-0.5 after:text-red-500">
                  ท่านต้องมั่นใจว่าท่านจะไม่เข้ามาขายในวันที่นั้นอย่างแน่นอน<br>
                  หากทำการยืนยันแล้วจะไม่สามารถเปลี่ยนแปลงได้
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <!-- Body -->
    <footer>
      <div class="max-w-7xl mx-auto px-2 md:px-4">
        <div class="flex flex-row items-center justify-center">
          <button @click="logout" class="px-4 py-2 text-base my-3 w-48 rounded hover:scale-110 btn-cancel transition-all duration-500">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LeaveForm',
  data(){
    return{
      //user
      phoneNum:"",
      // Date
      date:{},
      outOfTime:false,
    }
  },
  methods:{
    logout(){
      if(confirm("คุณต้องการที่จะออกจากระบบใช่หรือไม่?")){
        localStorage.removeItem('user-info')
        this.$router.push({name:'login'})
      }
    },
    getCurrentDate(){
      let date = new Date();
      return date
    },
    updateDate(){
      let dateTime = this.getCurrentDate();
      let date = dateTime.getDate();
      let month = dateTime.getMonth();
      let year = dateTime.getFullYear();
      let months = ["มกราคม", "กุมพาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
      let dmy = {
        dd: date,
        mm: months[month],
        yy: year + 543
      };
      this.date = dmy;
    },
    // ปิดปุ่มเมื่อเลยเวลา 14.00 น. ของวัน
    disbleBtn(){
      let nowDate = this.getCurrentDate();
      let Hour = nowDate.getHours();

      if(Hour >= 14){
        this.outOfTime = true;
      } else {
        this.outOfTime = false;
      }
    },
    // แจ้งลา
    leave(){
      let config = {
        method : 'post',
        url : `api/customer/leave/` + this.phoneNum,
        headers:{ }
      }
      if(confirm("คุณต้องการลาใช่หรือไม่")){
        axios(config)
        .then((response)=>{
          if(response.status == 200){
            alert('แจ้งลาเรียบร้อยแล้ว')
          }
        })
        .catch((error) =>{
          console.error(error);        
        })
      } else {
        return;
      }
    },
  },
  mounted(){
    if(!localStorage.getItem('user-info')){
      // this.$router.push({name:'login'});
    } else {
      let phone = JSON.parse(localStorage.getItem('user-info'));
      this.phoneNum = phone;
    }
    this.getCurrentDate();
    this.updateDate();
    this.disbleBtn();
  },
}
</script>
