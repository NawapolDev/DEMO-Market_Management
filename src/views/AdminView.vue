<template>
  <div class="max-w-7xl mx-auto my-10 sm:px-6 lg:px-8">
    <div class="flex flex-row items-center justify-center">
      <div class="w-full z-0 shadow-lg rounded-md">
        <h1 class="flex md:hidden justify-center items-center w-full">ข้อมูลพนักงาน</h1>
        <div class="flex items-center justify-between py-3 px-2">
          <h1 class="hidden md:flex">ข้อมูลพนักงาน</h1>
          <!-- <div class="flex items-center justify-center space-x-2">
            <label>ค้นหา</label>
            <input class="p-2 outline-none border rounded-md hover:border-gray-500 focus:border-indigo-500" v-model="searchById" placeholder="ค้นหาจากรหัส" @keydown.enter="toggle_s_admin"/>
            <button v-if="toggleSearch == false" @click="toggle_s_admin"><i class="fa-sharp fa-solid fa-magnifying-glass text-lg bg-gray-200 px-2 py-1.5 hover:bg-indigo-500 hover:text-white rounded-md"></i></button>
            <button v-else @click="toggle_s_admin"><i class="fa-solid fa-arrow-rotate-right text-lg bg-gray-200 px-2 py-1.5 hover:bg-indigo-500 hover:text-white rounded-md"></i></button>
          </div> -->
          <div class="flex gap-4">
            <div class="flex items-center justify-center space-x-2">
              <input type="text" class="p-2 outline-none border rounded-md hover:border-gray-500 focus:border-indigo-500" v-model="searchInput" placeholder="ค้นหา . . ." @keyup="searchEvent"/>
            </div>
            <button class="btn btn-success" @click="toggle_i_admin">เพิ่มข้อมูล</button>
          </div>
        </div>
        <div class="overflow-auto rounded-lg ">
          <table class="table-auto bg-gray-100 w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-300">
              <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">#</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">รหัส</th>
              <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อผู้ใช้</th>
              <!-- <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">รหัสผ่าน</th> -->
              <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">แก้ไข</th>
            </thead> 
            <tbody class="divide-y divide-gray-200">
              <tr v-for="items in filteredEntries" :key="items.id">
                <td class="p-3 text-sm text-center pointer-events-none">{{items.id+1}}</td>
                <td class="p-3 text-sm text-center pointer-events-none">{{items.admin_id}}</td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.admin_username}}</td>
                <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.admin_password}}</td> -->
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <div class="flex flex-row gap-4 justify-center text-base">
                    <button @click="UpdateAdmin(items.id)"><i class="fa-solid fa-pen-to-square text-indigo-600"></i></button>
                    <button @click="deleteAdmin(items.id)"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between p-3 overflow-auto">
          <div class="font-light whitespace-nowrap text-gray-500">แสดง {{ showInfo.from }} ถึง {{ showInfo.to }} จาก {{ showInfo.of }} รายการ</div>
          <div>
            <ul class="flex">
              <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {' pointer-events-none text-gray-300': currentPage === 1}]">
                <a href="#" class="p-2" @click.prevent="currentPage = 1, paginateEntries()"><i class="fa-solid fa-angles-left"></i></a>
              </li>
              <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === 1}]">
                <a href="#" class="p-2" @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()"><i class="fa-solid fa-angle-left"></i></a>
              </li>
              <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'text-gray-500 pointer-events-none': pagi === '...', ' border-indigo-400 text-white bg-indigo-500':pagi === currentPage }]" v-for="pagi in showPagination" :key="pagi">
                <a href="#" class="p-2" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
              </li>
              <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                <a href="#" class="p-2" @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()"><i class="fa-solid fa-angle-right"></i></a>
              </li>
              <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                <a href="#" class="p-2" @click.prevent="currentPage = allPages, paginateEntries()"><i class="fa-solid fa-angles-right"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Insert New Admin -->
      <div v-show="toggleInsertAdmin" class="modal">
        <div class="flex flex-col justify-start items-center">
          <span class="flex text-xl justify-center text-white w-full bg-green-500 p-4 rounded-t-md">เพิ่มพนักงาน</span>
          <form @submit.prevent="cfInsertAdmin" class="flex flex-col w-full justify-center items-center p-2 md:p-4 bg-gray-50 rounded-b-md">
            <div class="flex flex-col items-center gap-2 p-4">
              <base-input 
                type="text"
                title="ชื่อผู้ใช้"
                v-model="this.i_admin.username"
                :max="20"
                :showMax="true"
                required
              />
              <base-input 
                type="password"
                title="รหัสผ่าน"
                v-model="this.i_admin.password"
                :max="20"
                :showMax="true"
                required
              />
              <base-input 
                type="password"
                title="ยืนยันรหัสผ่าน"
                v-model="this.i_admin.cfpassword"
                :max="20"
                :showMax="true"
                required
              />
              <span v-if="errInsertMsg" class="text-sm text-red-500 my-2">{{errInsertMsg}}</span>
              <span v-else class="text-sm text-gray-500 my-2 require">โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านให้ถี่ถ้วน</span>
            </div>
            <div class="flex flex-row gap-2 w-full text-base px-4 py-2">
              <button class="btn btn-success w-2/3" type="submit">บันทึก</button>
              <button class="btn btn-disabled w-1/3" type="button" @click="this.toggleInsertAdmin=false">ยกเลิก</button>
            </div>
          </form>
        </div>
      </div>
      <!-- End Insert New Admin -->
      <!-- Update Admin Data -->
      <div v-show="toggleUpdateAdmin" class="modal">
        <div class="relative flex flex-col justify-start items-center">
          <span class="flex text-xl justify-center text-white w-full bg-indigo-500 p-4 rounded-t-md">แก้ไขข้อมูล</span>
          <form @submit.prevent="cfUpdateAdmin(this.temp.id)" class="flex flex-col w-full justify-center items-center bg-gray-50 rounded-b-md">
            <div @click="toggleUpdateAdmin = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <div class="flex flex-col items-center gap-2 p-4">
              <base-input 
                type="text"
                title="ชื่อผู้ใช้"
                v-model="this.temp.username"
                :max="20"
                :showMax="true"
                disabled
                required
              />
              <base-input 
                type="password"
                title="รหัสผ่านใหม่"
                v-model="this.temp.password"
                :max="20"
                :showMax="true"
                required
              />
              <span v-if="errUpdateMsg" class="text-sm text-red-500 my-2">{{errUpdateMsg}}</span>
              <span v-else class="text-sm text-gray-500 my-2 require">โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านให้ถี่ถ้วน</span>
            </div>
            <div class="flex flex-row gap-2 w-full text-base px-4 py-2">
              <button class="btn btn-confirm w-2/3">อัพเดท</button>
              <button class="btn btn-disabled w-1/3" type="button" @click="this.toggleUpdateAdmin=false">ยกเลิก</button>
            </div>
          </form>
        </div>
      </div>
      <!-- End Update Admin data -->
    </div>
  </div>
  <on-load :open="progress" />
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { $array } from 'alga-js';
import BaseInput from '@/components/Base-Input.vue';
import onLoad from "@/components/on-Load.vue";

var qs = require('qs');

export default {
  name: 'AdminView',
  components: { BaseInput, onLoad },
  data(){
    let toggleInsertAdmin = ref(false);
    let toggleUpdateAdmin = ref(false);
    let toggleSearch = ref(false);

    const toggle_i_admin = () => {
      this.toggleInsertAdmin = !this.toggleInsertAdmin;
      this.toggleUpdateAdmin = false;
    };
    // const toggle_s_admin = () => {
    //   this.toggleSearch = !this.toggleSearch
    //   if(this.toggleSearch == true){
    //     this.searchAdmin();
    //   } else {
    //     this.getData();
    //     this.searchById = '';
    //   }
    // }
    // async function getData() {
    //   const res = await axios.get("api/admin/")
    //   return res.data;
    // };

    return{
      //toggle
      toggleInsertAdmin,
      toggleUpdateAdmin,
      toggleSearch,
      //function
      toggle_i_admin,
      //pagination
      currentEntries: 10,
      filteredEntries:[],
      currentPage: 1,
      allPages: 1,
      searchInput:'',
      searchEntries:[],
      //data
      i_admin:{ username:'', password:'', cfpassword:'' },
      adminDetail: [],
      temp:[],
      searchById:'',
      searchInput:'',
      searchEntries:[],
      //response
      errInsertMsg:'',
      errUpdateMsg:'',
      //progressing
      progress: false,
    }
  },
  async mounted() {
    if (!localStorage.getItem('admin-info')) {
      this.$router.push({ name: 'admin' })
    } 
    // this.adminDetail = await this.getData();
    this.progress = true;
    await this.getData();
    this.progress = false;
  },
  computed:{
    showInfo(){      
      return $array.show(this.getCurrentEntries(), this.currentPage, this.currentEntries)
    },
    showPagination(){
      return $array.pagination(this.allPages, this.currentPage, 2)
    }
  },
  methods:{
    // ดึงข้อมูล
    async getData() {
      await axios.get("/api/admin")
        .then((response) => {
          this.adminDetail = [];
          this.adminDetail = response.data;
          this.adminDetail.forEach((v,i)=>{
            v.id = i
          })
          this.paginateData(this.adminDetail)
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async reloadPage(){
      this.progress = true;
      await this.getData();
      await this.paginateEntries();
      this.progress = false;
    },
    paginateEntries(){
      if(this.searchInput.length >= 2){
        this.searchEntries = $array.search(this.adminDetail, this.searchInput);
        this.paginateData(this.searchEntries);
      } else {
        this.searchEntries = [];
        this.paginateData(this.adminDetail);
      }
    },
    paginateEvent(page){
      this.currentPage = page;
      this.paginateEntries();
    },
    paginateData(data){
      this.filteredEntries = $array.paginate(data, this.currentPage, this.currentEntries)
      this.allPages = $array.pages(data, this.currentEntries)
    },
    searchEvent(){
      this.currentPage = 1;
      this.paginateEntries();
    },
    getCurrentEntries(){
      return (this.searchEntries.length <= 0) ? this.adminDetail : this.searchEntries;
    },
    // search
    // searchAdmin(){
    //   if(isNaN(this.searchById)) return
    //   axios.get(`api/admin/${this.searchById}`)
    //   .then((response)=>{
    //     this.adminDetail = [];
    //     this.adminDetail = response.data;
    //     this.filteredEntries = $array.paginate(this.adminDetail, this.currentPage, this.currentEntries)
    //     this.allPages = $array.pages(this.adminDetail, this.currentEntries)
    //   })
    //   .catch((error)=>{
    //     console.error(error);
    //   })
    // },
    // เพิ่มข้อมูลพนักงาน
    cfInsertAdmin(){
      let data = qs.stringify({
        'admin_username' : this.i_admin.username,
        'admin_password' : this.i_admin.password
      })
      let config = {
        method: 'post',
        url: 'http://localhost:8001/api/admin/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
      let dv;
      for (let index = 0; index < this.adminDetail.length; index++) {
        if(this.adminDetail[index].admin_username == this.i_admin.username){
          dv = 1;
          console.log(dv)
        }
      }
      if(dv == 1 || this.i_admin.password !== this.i_admin.cfpassword){
        if(dv == 1){ alert("มีชื่อผู้ใช้นี้แล้ว!") }
        if (this.i_admin.password !== this.i_admin.cfpassword) {this.errInsertMsg = 'กรอกรหัสผ่านไม่ตรงกัน โปรดตรวจสอบอีกครั้ง'}
      } else {
        axios(config)
        .then((response)=>{
          if(response.status == 200){
            alert('เพิ่มข้อมูลพนักงานเรียบร้อยแล้ว')
            this.errInsertMsg = '';
            this.i_admin = { username:'', password:'', cfpassword:'' };
            location.reload();
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
    },
    // อัพเดทข้อมูล
    UpdateAdmin(id){
      this.toggleUpdateAdmin = true;
      this.toggleInsertAdmin = false;
      let data = this.getCurrentEntries()[id];
      this.temp = {
        id : data.admin_id,
        username : data.admin_username,
        password : data.admin_password
      }
    },
    cfUpdateAdmin(id){
      let data = qs.stringify({
        'admin_username': this.temp.username,
        'admin_password': this.temp.password
      })
      let config = {
        method : 'post',
        url : 'http://localhost:8001/api/admin/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }

      axios(config).then((response)=>{
        if(response.status == 200){
          alert('อัพเดทข้อมูลเรียบร้อยแล้ว')
          location.reload();
          this.temp = {}
        }
      })
      .catch((error)=>{
        console.error(error);
      })
    },
    //ลบข้อมูล
    deleteAdmin(id) {
      this.process = true;
      let temp = this.getCurrentEntries()[id];

      let config = {
        method: 'delete',
        url: `/api/admin/` + temp.admin_id,
        headers: {}
      };
      let indexOfArrayItem = this.adminDetail.findIndex(i => i.admin_id === temp.admin_id)

      if (confirm('ต้องการลบข้อมูล ' + temp.admin_username + ' ใช่หรือไม่')) {
        axios(config)
          .then((response) => {
            if (response.status == 200) {
              alert('ลบแถวเรียบร้อยแล้ว')
              this.adminDetail.splice(indexOfArrayItem, 1)
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  },
}
</script>
