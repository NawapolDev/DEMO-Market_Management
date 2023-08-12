<template>
  <div class="max-w-full bg-gray-100">
    <div class="max-w-7xl mx-auto space-y-4 sm:px-6 lg:px-8 py-2">
      <div class="grid grid-cols-1 gap-4 rounded-lg overflow-hidden">
        <div class="flex flex-row bg-white rounded-lg shadow">
          <!-- <img :src="img1" class="w-[300px]"> -->
          <div class="flex flex-col w-full justify-center items-center bg-slate-900">
            <span class="py-2 text-3xl font-medium tracking-widest text-white">แผนผังตลาดนัดแก่งเสี้ยน</span>
            <img src="../assets/image/chart.jpg">
          </div>
          <!-- <img :src="img2" class="w-[300px]"> -->
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
          <span class="text-xl font-bold tracking-wider py-2 text-green-600">ข้อมูลตลาด</span>
          <div class="flex items-center space-x-2 text-sm">
            <div class="text-base font-semibold tracking-wide text-indigo-500">มีผู้เช่าประจำอยู่ทั้งหมด {{ length_mkt }}
              คน</div>
            <div class="text-gray-500">ณ วันที่ {{ date.dd }} {{date.mm}} {{date.yy}}</div>
          </div>
          <div class="space-x-2">
            <span class="p-1.5 text-sm font-medium tracking-wider text-green-800 bg-green-200 rounded-lg">จ่าย {{
              mkt_status2 }} คน</span>
            <span class="p-1.5 text-sm font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lg">จอง {{
              mkt_status1 }} คน</span>
            <span class="p-1.5 text-sm font-medium tracking-wider text-red-800 bg-red-200 rounded-lg">ลา {{ mkt_cusleave
              }} คน</span>
            <span class="p-1.5 text-sm font-medium tracking-wider text-gray-800 bg-gray-200 rounded-lg">ว่าง {{
              mkt_status0 }} ล็อก</span>
          </div>
          <div class="text-base font-medium tracking-wider text-gray-800">ลุกค้ารายวันในวันนี้ {{ mkt_custem }} คน</div>
          <div class="flex justify-end">
            <router-link to="/market" class="text-indigo-500 underline">ดูข้อมูลเพิ่มเติม</router-link>
          </div>
        </div>
        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
          <span class="text-xl font-bold tracking-wider py-2 text-indigo-600">ข้อมูลพนักงาน</span>
          <div class="flex items-center space-x-2 text-sm">
            <div class="text-sm font-medium tracking-wider text-gray-500">พนักงานทั้งหมดที่สามารถเข้าใช้ระบบได้</div>
          </div>
          <div class=" tracking-wider">พนักงานจำนวน</div>
          <div class="font-bold text-base">{{ employeeDetail.length }} คน</div>
          <div class="flex justify-end">
            <router-link to="/employee" class="text-indigo-500 underline">ดูข้อมูลเพิ่มเติม</router-link>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
          <span class="text-xl font-bold py-2 text-yellow-600">ข้อมูลการชำระเงิน</span>
          <div class="flex items-center space-x-2 text-sm">
            <div class="text-sm tracking-wider font-medium">แบ่งเป็น</div>
            <div class="p-1.5 text-sm tracking-wider font-medium text-green-800 bg-green-200 rounded-lg">รายเดือน {{
              rcp_type0 }}</div>
            <div class="p-1.5 text-sm tracking-wider font-medium text-yellow-800 bg-yellow-200 rounded-lg">รายวัน {{
              rcp_type1 }}</div>
          </div>
          <div class="text-sm text-gray-700">รวมทั้งหมด {{ receiptDetail.length }} รายการ</div>
          <div class="text-base font-bold text-black">รวมรายรับทั้งสิ้น {{ totalIncome }} บาท.</div>
          <div class="flex justify-end">
            <router-link to="/receipt" class="text-indigo-500 underline">ดูข้อมูลเพิ่มเติม</router-link>
          </div>
        </div>
      </div>
    </div>
    <on-load :open="progress" />
  </div>
</template>

<script>
import axios from "axios";
import onLoad from "@/components/on-Load.vue";

export default {
  name: 'MainView',
  data(){
    return{
      // image
      img1:'https://cdn.pixabay.com/photo/2019/09/24/09/58/marrakech-4500910_960_720.jpg',
      img2:'https://img.freepik.com/free-photo/large-variety-delicious-grilled-seafood-asian-market_651396-417.jpg?w=1380&t=st=1665176749~exp=1665177349~hmac=a41f4a62b765eb6405593ea563d33a54969bfeb779110ef8c66c8fa11fec7139',
      // Date
      date:{},
      //data
      marketDetail:[],
      employeeDetail:[],
      receiptDetail:[],
      // countItemInArray
      length_mkt:'',
      length_emp:'',
      length_rcp:'',
      // countInData
      mkt_status0:0,
      mkt_status1:0,
      mkt_status2:0,
      mkt_custem:0,
      mkt_cusleave:0,
      // receipt
      rcp_type0:0,
      rcp_type1:0,
      totalIncome:0,
      // progressing
      progress: true,
    }
  },
  async mounted() {
    // if(!localStorage.getItem('admin-info')){
    //   this.$router.push({name:'admin'})
    // }
    this.progress = true;
    await this.getMarketData();
    await this.getEmployeeData();
    await this.getreceiptData();
    this.progress = false;
    
    this.toDay();
    this.countStatusInMarket();
    this.countCusTemInMarket();
    this.countLeaveInMarket();
    this.countTypeInReceipt();
    this.calReceiptTotalIncome();
  },
  methods:{
    async getMarketData() {
      // this.progress = true;
      await axios.get('/api/market')
        .then((response) => {
          for (let key in response.data) {
            this.marketDetail.push({ ...response.data[key], id: key })
          }
          this.length_mkt = this.marketDetail.length
        })
        .catch(function (error) {
          console.error(error);
        })
    },
    async getEmployeeData(){
      await axios.get('api/admin')
      .then((response)=>{
        this.employeeDetail = response.data;
        this.length_emp = this.employeeDetail.length
      })
      .catch((error)=>{
        console.error(error);
      })
    },
    async getreceiptData(){
      await axios.get('api/receipt')
      .then((response)=>{
        this.receiptDetail = response.data;
        this.length_rcp = this.receiptDetail.length
        // this.progress = false;
      })
      .catch((error)=>{
        console.error(error);
        // this.progress = false;
      })
    },
    toDay(){
      let date = new Date();
      let d = date.getDate();
      let m = date.getMonth();
      let y = date.getFullYear();
      let months = ["มกราคม", "กุมพาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
      let dmy = {
        dd: d,
        mm: months[m],
        yy: y + 543
      };
      this.date = dmy;
    },
    // หาข้อมูลของสถานะ
    countStatusInMarket(){
      let paid = 0;
      let rent = 0;
      let blank = 0;
      this.marketDetail.forEach((item, index, arr) => {
        if(item.status == 2){
          return paid += 1;
        }
        if(item.status == 1){
          return rent += 1;
        }
        if(item.status == 0){ 
          return blank += 1;
        }
      })
      this.mkt_status2 = paid;
      this.mkt_status1 = rent;
      this.mkt_status0 = blank; 
    },
    // count temporary customers
    countCusTemInMarket(){
      let ct = 0;
      this.marketDetail.forEach((item, index, arr)=>{
        if(item.custem_name){
          return ct += 1;
        }
      })
      this.mkt_custem = ct;
    },
    // count customer leave
    countLeaveInMarket(){
      let cl = 0;
      this.marketDetail.forEach((item, index, arr)=>{
        if(item.leave == 1){
          return cl += 1;
        }
      })
      this.mkt_cusleave = cl;
    },
    // type of customers in receipt
    countTypeInReceipt(){
      let cus_type_m = 0;
      let cus_type_d = 0;
      this.receiptDetail.forEach((items, index, arr)=>{
        if(items.custype == 0){
          return cus_type_m += 1;
        }
        if(items.custype == 1){
          return cus_type_d += 1;
        }
      })
      this.rcp_type0 = cus_type_m;
      this.rcp_type1 = cus_type_d;
    },
    calReceiptTotalIncome(){
      let sum = 0;
      this.receiptDetail.forEach((items, index, arr)=>{
        return sum += items.totalmoney
      })
      this.totalIncome = sum;
    },
  },
  components : {
    onLoad,
  },
}
</script>
