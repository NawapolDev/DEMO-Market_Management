<template>
    <div class="w-full min-h-screen flex items-center justify-center bg-gray-300">
      <div class="w-[320px] md:w-[420px] h-1/3 overflow-hidden shadow-lg rounded-md">
        <div class="flex flex-col text-center justify-center bg-white">
          <div
            class="flex flex-row px-4 md:px-8 justify-between items-center text-white bg-slate-700"
          >
            <h1 class="grow-1 text-lg md:text-3xl font-bold my-6">ระบบจัดการตลาดนัด</h1>
            <span class="items-center justify-center">(Admin)</span>
          </div>
          <form @submit="login">
            <div class="relative flex flex-row px-4 my-4 items-center justify-center">
              <div class="text-base md:text-2xl"><i class="fa-solid fa-user"></i></div>
              <div class="flex ml-4">
                <BaseInput
                  type="text"
                  label="ชื่อผู้ใช้"
                  title="ชื่อผู้ใช้"
                  v-model="username"
                  :max="userMax"
                  :showMax="true"
                />
              </div>
            </div>
            <div class="relative flex flex-row items-center justify-center">
              <div class="text-base md:text-2xl"><i class="fa-solid fa-lock"></i></div>
              <div class="flex ml-4">
                  <BaseInput
                    type="password"
                    label="รหัสผ่าน"
                    title="รหัสผ่าน"
                    v-model="password"
                    :max="passMax"
                    :showMax="true"
                  />
              </div>
            </div>
            <div class="flex flex-row mt-5 py-4 justify-center items-center bg-gray-200">
              <button class="btn btn-confirm" @click.prevent="login">เข้าสู่ระบบ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script>
import BaseInput from '../components/Base-Input.vue'
import axios from "axios"
import router from '@/router';
  
export default {
  name: "Admin",
  components: { BaseInput },
  data() {
    return {
      //Data
      username: "",
      userMax: 20,
      password: "",
      passMax: 20,
      // response
      progress: false,
      err: false,
      errMsg: "",
      errUser: false,
      errMsgUser: "",
      errPass: false,
      errMsgPass: "",
    };
  },
  methods: {
    async login() {
      this.progress = true;
      this.err = false
      this.errMsg = ""
      this.errUser = false
      this.errMsgUser = ""
      this.errPass = false
      this.errMsgPass = ""

      if (!this.username || !this.password) {
        alert('กรอกข้อมูลให้ครบถ้วน')
        this.progress = false;
        this.err = true;
        if (!this.username) {
          this.errUser = true;
          this.errMsgUser = 'กรุณากรอกชื่อผู้ใช้'
        } else {
          this.errUser = false;
          this.errMsgUser = "";
        }
        if (!this.password) {
          this.errPass = true;
          this.errMsgPass = "กรุณากรอกรหัสผ่าน";
        } else {
          this.errPass = false;
          this.errMsgPass = "";
        }
      } else {
        this.progress = true;
        let data = new FormData();
        data.append('username', this.username);
        data.append('password', this.password);

        await axios
          .get(`/api/admin/`)
          .then(async (response) => {
            await response.data.forEach(function (items) {
              if(items.admin_username == data.get('username') && items.admin_password == data.get('password')){
                localStorage.setItem('admin-info', JSON.stringify(response.data[0]));
              }
            });
            if(localStorage.getItem('admin-info')){
              this.$router.push({name: 'main'});
            } else {
              console.log('ไม่พบข้อมูลผู้ใช้');
              alert('ไม่พบข้อมูลผู้ใช้');
            }
          })
          .catch((error) => {
            alert('ไม่พบข้อมูลผู้ใช้')
            console.log(error)
          })
      }
    }
  },
  mounted() {
    let user = localStorage.getItem('admin-info');
    if(user){
      this.$router.push({name:'main'})
    }
  }
};
</script>
  