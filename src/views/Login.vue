<template>
    <div class="w-full min-h-screen flex items-center justify-center bg-gray-300">
      <div class="w-[320px] md:w-[420px] h-1/3 overflow-hidden shadow-lg rounded-md">
        <div class="flex flex-col text-center justify-center bg-white">
          <div class="flex flex-row px-4 md:px-8 justify-center items-center text-white bg-slate-700">
            <h1 class="grow-1 text-lg md:text-3xl font-bold my-6">ระบบจัดการตลาดนัด</h1>
          </div>
          <form>
            <div class="relative flex flex-row p-4 items-center justify-center">
              <div class="text-base md:text-2xl"><i class="fa-solid fa-phone"></i></div>
              <div class="flex ml-4">
                  <BaseInput
                    type="text"
                    title="เบอร์โทรศัพท์"
                    label="เบอร์โทรศัพท์"
                    v-model="phoneNum"
                    :max="Max"
                    :showMax="true"
                  />
              </div>
            </div>
            <div class="flex justify-center items-center py-2 text-red-500">{{ errMsg }}</div>
            <div class="flex flex-row py-4 justify-center items-center bg-gray-200">
              <button class="btn btn-confirm" @click.prevent="login">เข้าสู่ระบบ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script>
import BaseInput from '../components/Base-Input.vue';
import axios from "axios";

var qs = require('qs');
export default {
  name: 'Login',
  components: { BaseInput },
  data() {

      return {
        // login
        phoneNum:"",
        Max:10,
        // data

        //Response
        errMsg:"",
      };
  },
  methods:{
    async login(){
      if(!this.phoneNum || this.phoneNum.length < this.Max){
        alert('กรอกข้อมูลเบอร์โทรศัพท์ให้ครบถ้วน')
        return;
      } else {
        let data = qs.stringify({
          'cus_tel' : this.phoneNum
        });
        let config = {
          method: 'post',
          url: `api/customer/loginbytel`,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        };
        // User : Seller
        await axios(config)
          .then(async (response) => {
            let status = response.data.status;
            if (status == true) {
              localStorage.setItem("user-info", JSON.stringify(this.phoneNum));
              await this.$router.push({ name: 'leaveform' });
            } else {
              alert('ไม่พบข้อมูลผู้ใช้นี้ โปรดตรวจสอบเบอร์โทรของท่าน.')
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
    },
  },
  mounted(){
    let user = localStorage.getItem('user-info');
    if(user){
      this.$router.push({name:'leaveform'})
    }
  },
};
</script>
  