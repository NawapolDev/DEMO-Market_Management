<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="flex flex-row items-center justify-center">
      <!-- Display on desktop -->
      <div class="hidden md:hidden lg:block w-full z-0 shadow-lg rounded-md">
        <div class="flex items-center justify-between py-3 px-2">
          <h1>จัดการตลาดและการจอง</h1>
          <div class="flex justify-center items-center space-x-6">
            <!-- <div class="flex">
              <span class="p-2 text-base text-gray-700">แสดง</span>
              <select v-model="currentEntries" class="p-2 outline-none border rounded-md" @change="paginateEntries">
                <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
              </select>
              <span class="p-2 text-base text-gray-700">รายการ</span>
            </div> -->
            <button class="btn btn-success" @click="prepareInsert">เพิ่มล็อกใหม่</button>
          </div>
        </div>
        <div class="overflow-auto rounded-lg ">
          <table class=" table-auto bg-gray-100 w-full">
            <thead class="bg-gray-50 border-gray-300">
              <th class="p-1 text-sm font-semibold tracking-wide text-center pointer-events-none"></th>
              <!-- <th class="p-1 text-sm font-semibold tracking-wide text-center pointer-events-none">ที่</th> -->
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อแผง</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">สถานะ</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">การลา</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อ</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">สินค้า</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">เบอร์โทร</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ขนาด</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ราคา<br>(วัน)</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ธุรกรรม</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">รายวัน</th>
              <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">แก้ไข</th>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(items, i) in filteredEntries" :key="i">
                <td class="p-2 text-lg text-red-700 whitespace-nowrap text-center"><i class="fa-solid fa-square-minus cursor-pointer" @click="deleteRow(i)"></i></td>
                <!-- <td class="p-0 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{i+1}}</td> -->
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center uppercase pointer-events-none">{{items.lock_name}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">
                  <span v-if="items.status == 2" class="p-2 bg-green-300 rounded-md">จ่าย</span>
                  <span v-else-if="items.status == 1" class="p-2 bg-yellow-300 rounded-md">จอง</span>
                  <span v-else class="p-2 bg-gray-300 rounded-md">ว่าง</span>
                </td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">
                  <span v-if="items.status == 2 || items.status == 1 " :class="[items.leave == 1 ? 'bg-red-200 p-2 rounded-md' : 'bg-gray-200 p-2 rounded-md']">{{items.leave == 1 ? 'ลา' : 'มาขาย'}}</span>
                </td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_name}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_typeproduct}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_tel}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.sizelock}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.pricelock}}</td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center">
                  <button v-if="items.status == 2" class="p-2 bg-green-200 rounded-md" disabled>ชำระเงินแล้ว</button>
                  <button v-else-if="items.status == 1" class="p-2 bg-gray-200 rounded-md" @click="loadPayment(i)">ชำระเงิน</button>
                </td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center">
                  <span v-if="items.custem_name" @click="showTemCus(i)" class=" cursor-pointer hover:text-indigo-500 hover:underline">{{ items.custem_name}}</span>
                  <span v-else class="cursor-pointer bg-green-300 text-green-800 rounded-full text-lg px-1.5" @click="insertCusTem(i)"><i class="fa-solid fa-plus"></i></span>
                </td>
                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                  <div v-if="items.cus_name" class="flex flex-row gap-4 justify-center text-lg">
                    <button class="text-indigo-500" @click="getLockInfo(i)"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button><i class="fa-solid fa-trash" @click="deleteCus(i)"></i></button>
                  </div>
                  <div v-else class="flex justify-center items-center">
                    <button class="text-green-600 text-lg" @click="insertNewCus(i)"><i class="fa-solid fa-user-plus"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between p-3">
          <div class="font-light whitespace-nowrap text-gray-500">แสดง {{ showInfo.from }} ถึง {{ showInfo.to }} จาก {{ showInfo.of }} รายการ</div>
          <div>
            <ul class="flex">
              <li :class="['rounded-l-md p-2 border text-base text-center hover:text-gray-500 hover:bg-gray-100', {' pointer-events-none text-gray-300': currentPage === 1}]">
                <a href="#" class="p-2" @click.prevent="currentPage = 1, paginateEntries()"><i class="fa-solid fa-angles-left"></i></a>
              </li>
              <li :class="['p-2 border text-base text-center hover:text-gray-500 hover:bg-gray-100', {'pointer-events-none text-gray-300': currentPage === 1}]">
                <a href="#" class="p-2" @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()"><i class="fa-solid fa-angle-left"></i></a>
              </li>
              <li :class="['p-2 border text-base text-center hover:text-gray-500 hover:bg-gray-100', {'text-gray-500 pointer-events-none': pagi === '...', ' border-indigo-400 text-white bg-indigo-500':pagi === currentPage }]" v-for="pagi in showPagination" :key="pagi">
                <a href="#" class="p-2" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
              </li>
              <li :class="['p-2 border text-base text-center hover:text-gray-500 hover:bg-gray-100', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                <a href="#" class="p-2" @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()"><i class="fa-solid fa-angle-right"></i></a>
              </li>
              <li :class="['rounded-r-md p-2 border text-base text-center hover:text-gray-500 hover:bg-gray-100', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                <a href="#" class="p-2" @click.prevent="currentPage = allPages, paginateEntries()"><i class="fa-solid fa-angles-right"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- End display on desktop -->

      <!-- Insert New Lock -->
      <div v-show="toggleInsertLock" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
          <div class="relative bg-gray-50 shadow-lg rounded-md">
            <div @click="prepareInsert" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <form class="flex flex-col justify-start items-center" @submit.prevent="addNewLock">
              <span class="text-2xl bg-green-500 text-white py-2 px-4 w-full">เพิ่มข้อมูลล็อกใหม่</span>
              <div class="p-4">
                <div class="flex gap-2 my-2">
                  <base-input
                    type="text"
                    title="ชื่อแผง"
                    label="ตัวอย่าง : A1"
                    v-model.trim="insertLock.lock"
                    :max="10"
                    :showMax="true"
                    required
                  />
                </div>
                <div class="flex gap-2 my-2">
                  <div class="relative flex flex-col mt-6">
                    <label class="absolute -top-6 left-0 text-sm md:text-base">ขนาด</label>
                    <select v-model="insertLock.size" class="input w-full" @change="priceDay" required>
                      <option v-for="items in locksize" :key="items">{{items}}</option>
                    </select>
                  </div>
                  <base-input 
                    title="ราคา(วัน)"
                    v-model="insertLock.price"
                    required
                  />
                </div>
                <hr/>
                <span class="mt-5">ราคาต่อเดือนที่ต้องจ่าย</span>
                <div class="space-y-2">
                  <div class="text-sm text-gray-500">ตั้งแต่วันที่ 1 ถึง {{this.LastDayOfMonth()}} เป็นจำนวน {{this.LastDayOfMonth()}} วัน</div>
                  <div class="flex justify-between">
                    <span>ยอดเงินสุทธิ {{ this.LastDayOfMonth() }} x {{this.insertLock.price}} : </span>
                    <span class="text-lg font-bold">{{ this.calculatePayByDate(this.LastDayOfMonth(), 1, this.insertLock.price) }} บาท.</span>
                  </div>
                </div>
                <div class="flex items-center justify-center gap-2 my-2">
                  <button class="btn btn-confirm">เพิ่มข้อมูล</button>
                </div>
                <span class="text-sm text-gray-500 after:content-['*'] after:text-red-500">
                  ตรวจสอบข้อมูลของท่านให้ถี่ถ้วนก่อนทำการยืนยัน
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End insert New Lock -->
      <!-- Insert Customers data -->
      <div v-show="toggleInsertCus" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
          <div class="relative bg-gray-50 shadow-lg rounded-md">
            <div @click="toggleInsertCus = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <form class="flex flex-col justify-start items-center" @submit.prevent="cfInsertCus(this.i_NewCus.id)">
              <span class="text-2xl text-white bg-green-500 py-2 px-4 w-full uppercase">ล็อก : {{this.i_NewCus.lock}}</span>
              <div class="p-4">
                <span class="text-xl underline">เพิ่มข้อมูลลูกค้าใหม่</span>
                <hr/>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="ชื่อลูกค้า"
                    label="ตัวอย่าง : ดำ"
                    v-model="insertCus_info.name"
                    :max=20
                    :showMax="true"
                    required
                  />
                </div>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="สินค้า"
                    label="ตัวอย่าง : ไก่ทอด"
                    v-model="insertCus_info.product"
                    :max=20
                    :showMax="true"
                    required
                  />
                  <base-input
                    title="เบอร์โทร"
                    label="เลข 10 หลัก"
                    v-model="insertCus_info.tel"
                    :max=10
                    :showMax="true"
                    required
                  />
                </div>
                <hr/>
                <div class="flex items-center justify-center gap-2 my-2">
                  <button class="btn btn-confirm w-1/3" type="submit">เพิ่ม</button>
                </div>
                <span class="text-sm text-gray-500 after:content-['*'] after:text-red-500">
                  ตรวจสอบข้อมูลของท่านให้ถี่ถ้วนก่อนทำการยืนยัน
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End Insert Customers data -->
      <!-- Update Customers data -->
      <div v-show="this.lockDetail.id" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
          <div class="relative bg-gray-50 shadow-lg rounded-md">
            <div @click="this.lockDetail.id=''" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <form class="flex flex-col justify-start items-center" @submit.prevent="updateCus(this.lockDetail.id)">
              <span class="text-2xl text-white bg-indigo-500 py-2 px-4 w-full uppercase">{{this.lockDetail.lock}}</span>
              <div class="p-4">
                <span class="text-xl my-2">แก้ไขข้อมูลลูกค้า</span>
                <hr/>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="ชื่อลูกค้า"
                    v-model="this.lockDetail.name"
                    :max=20
                    :showMax="true"
                    required
                  />
                </div>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="สินค้า"
                    v-model="this.lockDetail.product"
                    :max=20
                    :showMax="true"
                    required
                  />
                  <base-input
                    title="เบอร์โทร"
                    v-model="this.lockDetail.tel"
                    :max=10
                    :showMax="true"
                    required
                  />
                </div>
                <hr/>
                <div class="flex items-center justify-center gap-2 my-2">
                  <button class="btn btn-confirm" type="submit">อัพเดท</button>
                  <!-- <button class="btn btn-disabled">ยกเลิก</button> -->
                </div>
                <span class="text-sm text-gray-500 after:content-['*'] after:text-red-500">
                  ตรวจสอบข้อมูลของท่านให้ถี่ถ้วนก่อนทำการยืนยัน
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End Update Customers data -->
      <!-- Insert Temporary Customers data -->
      <div v-show="toggleInsertCusTem" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen p-4 text-center">
          <div class="relative bg-gray-50 shadow-lg rounded-md">
            <div @click="toggleInsertCusTem = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <form class="flex flex-col justify-start items-center" @submit.prevent="cfInsertCusTem(this.i_TemCus.id)">
              <span class="text-2xl text-white bg-green-500 py-2 px-4 w-full uppercase">ล็อก : {{this.i_TemCus.lock}}</span>
              <div class="p-4">
                <span class="text-xl underline">เพิ่มข้อมูลลูกค้ารายวัน</span>
                <div v-if="this.i_TemCus.name" class="text-base my-2">{{this.i_TemCus.name}} | สถานะการลา : <span :class="[this.i_TemCus.leave == 1 ? 'bg-red-200':'bg-gray-200', 'px-2 rounded-md']">{{this.i_TemCus.leave == 1 ? 'ลา' : 'มาขาย'}}</span></div>
                <div v-else class="text-base my-2">ว่าง | สถานะการลา : <span :class="[this.i_TemCus.leave == 1 ? 'bg-red-200':'bg-gray-200', 'px-2 rounded-md']">{{this.i_TemCus.leave == 1 ? 'ลา' : 'มาขาย'}}</span></div>
                <hr/>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="ชื่อลูกค้า"
                    label="ตัวอย่าง : ดำ"
                    v-model="this.i_TemCus.temname"
                    :max="20"
                    required
                  />
                </div>
                <div class="flex gap-2 my-2">
                  <base-input
                    title="สินค้า"
                    label="ตัวอย่าง : ไก่ทอด"
                    v-model="this.i_TemCus.temproduct"
                    :max="20"
                    required
                  />
                  <base-input
                    title="เบอร์โทร"
                    label="เลข 10 หลัก"
                    v-model="this.i_TemCus.temtel"
                    :max="10"
                    required
                  />
                </div>
                <hr/>
                <div class="flex w-full p-2 justify-center gap-4 font-bold text-xl">
                  <span>ราคาค่าเช่า {{this.i_TemCus.price}} บาท.</span>
                </div>
                <div class="flex items-center justify-center gap-2 my-2">
                  <button class="btn w-[100px] btn-confirm" type="submit">เพิ่ม</button>
                  <!-- <button class="btn btn-disabled">ยกเลิก</button> -->
                </div>
                <span class="text-sm text-gray-500 after:content-['*'] after:text-red-500">
                  กรุณาเก็บเงินก่อนบันทึกข้อมูลและทำการตรวจสอบข้อมูลให้ถูกต้อง
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End Insert Temporary Customers data -->
      <!-- Show Temporary Customers Data -->
      <div v-show="toggleShowTemCus" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen text-center">
          <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
            <!-- <div @click="toggleShowTemCus = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div> -->
            <div class="flex flex-col items-center justify-center">
              <span class="w-full bg-yellow-500 text-white py-2 px-4 text-2xl font-bold">ข้อมูลลูกค้ารายวัน</span>
              <div class="p-4 m-2 bg-gray-100 rounded-lg">
                  <div class="flex flex-col justify-start items-start space-y-2">
                    <span>ชื่อ : {{ this.lockDetail.custem_name }}</span>
                    <span>สินค้า : {{this.lockDetail.custem_product}}</span>
                    <span>เบอร์โทร : {{this.lockDetail.custem_tel}}</span>                    
                  </div>
              </div>
              <div class="w-full p-2">
                <hr/>
                <button class="btn btn-disabled w-1/2 mt-2" @click="toggleShowTemCus = false">ปิด</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Show Temporary Customers Data -->
      <!-- Delete Row -->
      <div v-show="toggleDelete" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen text-center">
          <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
            <div @click="toggleDelete = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <div class="flex flex-col items-center justify-center">
              <span class="w-full bg-red-500 text-white py-2 px-4 text-2xl font-bold">{{ this.d_RowData.lockname }}</span>
              <div class="flex flex-col my-4 space-y-3">
                <span class="px-4 text-lg">ท่านต้องการลบข้อมูลนี้หรือไม่ ?</span>
                <span class="px-4 text-sm text-gray-400 after:content-['*'] after:text-red-500">หากท่านกด ยืนยัน ข้อมูลทั้งหมดภายใน {{this.d_RowData.lockname}} จะหายไปทันที</span>
              </div>
              <div class="flex items-center justify-center p-2 bg-gray-100 w-full">
                <button class="btn btn-confirm" @click="cfDeleteRow(this.d_RowData.lockid)">ยืนยัน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Delete Row -->
      <!-- Delete Customers data -->
      <div v-show="toggleDeleteCus" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen text-center">
          <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
            <div @click="toggleDeleteCus = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <div class="flex flex-col items-center justify-center">
              <span class="w-full bg-gray-600 text-white py-2 px-4 text-2xl font-bold">ล็อกที่ : {{ this.d_CusData.lockname }}</span>
              <div class="flex flex-col my-4 space-y-3">
                <span class="px-4 text-lg">ท่านต้องการลบข้อมูลนี้หรือไม่ ?</span>
                <div class="flex flex-col items-start space-y-1 p-4 m-2 bg-gray-100 rounded-lg">
                  <span class="text-sm text-gray-500">ชื่อ : {{ this.d_CusData.cus_name }}</span>
                  <span class="text-sm text-gray-500">สินค้า : {{ this.d_CusData.cus_typeproduct }}</span>
                  <span class="text-sm text-gray-500">เบอร์โทร : {{ this.d_CusData.cus_tel }}</span>
                </div>
                <span class="px-4 text-sm text-gray-400 after:content-['*'] after:text-red-500">หากท่านกด ยืนยัน ข้อมูลทั้งหมดจะหายไปทันที</span>
              </div>
              <div class="flex items-center justify-center p-2 bg-gray-100 w-full">
                <button class="btn btn-confirm" @click="cfDeleteCus(this.d_CusData.lockid)">ยืนยัน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Delete Customers data -->
      <!-- Payment -->
      <div v-show="togglePayment" class="absolute top-0 left-0 z-50 overflow-x-hidden overflow-y-auto inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
        <div class="flex items-center justify-center min-h-screen text-center">
          <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
            <div @click="togglePayment = false" class="absolute -top-2 -right-1 cursor-pointer text-red-500 px-2 text-xl rounded-full bg-red-200"><i class="fa-solid fa-xmark"></i></div>
            <form class="flex flex-col items-center justify-center" @submit.prevent="cfPayment(this.paymentTask.id)">
              <span class="w-full bg-slate-700 text-white px-4 py-2 font-bold text-2xl">บันทึกการชำระเงิน</span>
              <div class="space-y-2 p-4 m-2 bg-gray-100 rounded-lg">
                <div class="flex flex-row px-4 text-xl justify-between w-full pointer-events-none">
                  <span>ล็อก</span>
                  <span>{{ paymentTask.lock }}</span>
                </div>
                <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                  <span>ชื่อ</span>
                  <span>{{paymentTask.name}}</span>
                </div>
                <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                  <span>ขนาด</span>
                  <span>{{paymentTask.size}} เมตร</span>
                </div>
                <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                  <span>ราคาต่อวัน</span>
                  <span>{{paymentTask.price}} บาท</span>
                </div>
                <div class="flex flex-row px-4 justify-between items-center w-full">
                  <span>วันที่เช่า</span>
                  <div>
                    <!-- <button type="button" id="calbtn" @click="CalMonthPrice" class="btn-success p-2 rounded-md hover:scale-105">คำนวน</button> -->
                    <input type="number" onkeydown="return false" @change="CalMonthPrice" class="px-2 py-1 w-16 text-center outline-none" v-model="today" required />
                  </div>
                </div>
                <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                  <span>จำนวนวันในเดือนนี้</span>
                  <span>{{LastDayOfMonth()}} วัน</span>
                </div>
                <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                  <span>รวมทั้งสิ้น</span>
                  <span>{{paymentTask.totalDay}} วัน</span>
                </div>
                <hr/>
                <div class="flex flex-row px-4 gap-24 justify-between w-full cursor-default hover:text-green-500">
                  <span class="font-bold text-lg">ยอดเงินสุทธิ</span>
                  <span class="font-bold text-lg">{{paymentTask.pricePerMonth}} บาท</span>
                </div>
              </div>
              <div class="p-3">
                <button class="btn btn-confirm w-full" type="submit">บันทึกการชำระเงิน</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- End Payment -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseInput from "@/components/Base-Input.vue";
import { ref } from '@vue/reactivity';
import { $array } from 'alga-js';

var qs = require('qs');
export default {
  name: "MarketView-Backup",
  data() {
    let toggleInsertLock = ref(false);
    let toggleInsertCus = ref(false);
    let toggleInsertCusTem = ref(false);
    let toggleUpdateCus = ref(false);
    let toggleDelete = ref(false);
    let toggleDeleteCus = ref(false);

    let toggleShowTemCus = ref(false);
    let togglePayment = ref(false);

    return {
      // dateCalculate
      today: 1,
      lastDay:'',
      dayinmonth:[],
      // size(m)
      locksize: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //entries
      showEntries: [5, 10, 15, 20, 25, 50],
      currentEntries: 10,
      filteredEntries:[],
      currentPage: 1,
      allPages: 1,
      // alldata
      marketInfo: [],
      // data with id
      lockDetail: {},
      //InsertLock
      insertLock: {
        lock: "",
        size: "",
        price: "",
      },
      // prepare to insert new cus
      i_NewCus: {},
      i_TemCus: {},
      // Insert cus
      insertCus_info: {
        name: "",
        product: "",
        tel: "",
      },
      // deleteRow
      d_RowData: { lockid: "", lockname: "", },
      // deleteCus
      d_CusData: { lockid: '', lockname: '', cus_name: '', cus_typeproduct: '', cus_tel: '' },
      // payment
      paymentTask: {},
      monthPrice:[],

      toggleInsertLock,
      toggleInsertCus,
      toggleInsertCusTem,
      toggleUpdateCus,
      toggleDelete,
      toggleDeleteCus,
      togglePayment,
      toggleShowTemCus,
      // process
      process: false,
      err: false,
      errMsg: '',
      message: '',
    };
  },
  async mounted() {
    if (!localStorage.getItem('admin-info')) {
      this.$router.push({ name: 'admin' })
    } 
    // this.getData();
    this.getDayInMonth()
  },
  computed:{
    showInfo(){
      return $array.show(this.marketInfo, this.currentPage, this.currentEntries);
    },
    showPagination(){
      return $array.pagination(this.allPages, this.currentPage, 2);
    }
  },
  created(){
    this.getAllData().then(res => {
      this.marketInfo = res.data
      this.filteredEntries = $array.paginate(this.marketInfo, this.currentPage, this.currentEntries)
      this.filteredEntries = $array.sort(this.filteredEntries)
      this.allPages = $array.pages(this.marketInfo, this.currentEntries)
    })
  },
  methods: {
    async getAllData(){
      const response = await axios.get('api/market');
      return response
    },
    paginateEntries() {
      this.filteredEntries = $array.paginate(this.marketInfo, this.currentPage, this.currentEntries)
      this.filteredEntries = $array.sort(this.filteredEntries)
      // this.filteredEntries.sort(function (a, b) {
      //   if (a.lock_name < b.lock_name) { return -1; }
      //   if (a.lock_name > b.lock_name) { return 1 }
      //   return 0;
      // })
    },
    paginateEvent(page){
      this.currentPage = page
      this.paginateEntries()
    },
    getLockInfo(id) {
      let data = this.marketInfo[id];
      this.lockDetail = {
        id: data.lock_id, // รหัสล็อก
        lock: data.lock_name, // ชื่อล็อก
        name: data.cus_name, // ชื่อลูกค้าประจำ
        tel: data.cus_tel, // เบอร์ลูกค้าประจำ
        product: data.cus_typeproduct, //สินค้าลูกค้าประจำ
      };
    },
    // เรียกดูข้อมูลลุกค้ารายวัน
    showTemCus(id) {
      this.toggleShowTemCus = true;
      let data = this.marketInfo[id];
      this.lockDetail = {
        custem_name: data.custem_name, //ชื่อลูกค้ารายวัน
        custem_tel: data.custem_tel, // เบอร์ลูกค้ารายวัน
        custem_product: data.custem_typeproduct, //สินค้าลูกค้ารายวัน
      }
    },
    // หาจำนวณวันทั้งหมดของเดือน
    LastDayOfMonth() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let finalDay = 0;
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      for (let i = 0; i < lastDayOfMonth + 1; i++) {
        finalDay = i;
      }
      this.lastDay = finalDay;
      return finalDay;
    },
    // วันที่ปัจจุบัน
    getDateOnly() {
      let date = new Date();
      let day = date.getDate();
      return day;
    },
    getDayInMonth() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate();
      for (let i = 1; i < lastDay + 1; i++) {
        this.dayinmonth.push({ i })
      }
    },
    // กดปุ่มเพิ่มล็อก
    prepareInsert() {
      this.toggleInsertLock = !this.toggleInsertLock;
      this.insertLock.lock = ''
      this.insertLock.size = ''
      this.insertLock.price = ''
    },
    // เพิ่มล็อกใหม่
    addNewLock() {
      this.process = true;

      let data = qs.stringify({
        'lock_name': this.insertLock.lock.toUpperCase(),
        'sizelock': this.insertLock.size,
        'pricelock': this.insertLock.price
      });
      let config = {
        method: 'post',
        url: 'api/market',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }

      axios(config)
        .then(async function (response) {
          if (response.status == 200) {
            alert('เพิ่มล็อกใหม่เรียบร้อยแล้ว');
            location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        })
    },
    // เพิ่มลูกค้าใหม่
    insertNewCus(id) {
      this.toggleInsertCus = true;
      let data = this.marketInfo[id]
      this.i_NewCus = {
        id: data.lock_id,
        lock: data.lock_name,
        name: data.cus_name,
        product: data.cus_typeproduct,
        tel: data.cus_tel,
      }
    },
    cfInsertCus(id) {
      let data = qs.stringify({
        'cus_name': this.insertCus_info.name,
        'cus_tel': this.insertCus_info.tel,
        'cus_typeproduct': this.insertCus_info.product
      })
      let config = {
        method: 'post',
        url: 'api/customer/insertcusrent/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          if (response.status == 200) {
            alert('เพิ่มข้อมูลลูกค้าประจำเรียบร้อยแล้ว')
            this.insertCus_info = { name: '', tel: '', product: '' }
            this.toggleInsertCus = false;
            location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
          this.toggleInsertCus = false;
        })
    },
    // เพิ่มลูกค้ารายวัน
    insertCusTem(id) {
      this.toggleInsertCusTem = true;
      console.log(id);
      let data = this.marketInfo[id]
      this.i_TemCus = {
        id: data.lock_id,
        lock: data.lock_name,
        name: data.cus_name,
        leave: data.leave,
        temname: '',
        temproduct: '',
        temtel: '',
        price: data.pricelock
      }
    },
    cfInsertCusTem(id) {
      let data = qs.stringify({
        'custem_name': this.i_TemCus.temname,
        'custem_tel': this.i_TemCus.temtel,
        'custem_typeproduct': this.i_TemCus.temproduct,
        'lockname': this.i_TemCus.lock,
        'totalmoney': this.i_TemCus.price,
      });
      let config = {
        method: 'post',
        url: `api/customer/insertcustemrent/` + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          if (response.status == 200) {
            alert('เพิ่มลูกค้ารายวันเรียบร้อยแล้ว');
            this.i_TemCus = {}
            location.reload();
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
      this.toggleInsertCusTem = false;
    },
    // อัพเดทข้อมูลลูกค้าประจำ
    updateCus(id) {
      let data = qs.stringify({
        'cus_name': this.lockDetail.name,
        'cus_tel': this.lockDetail.tel,
        'cus_typeproduct': this.lockDetail.product
      })
      let config = {
        method: 'post',
        url: `api/customer/insertcusrent/` + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios(config)
        .then((response) => {
          if (response.status == 200) {
            alert('แก้ไขข้อมูลลูกค้าขาประจำเรียบร้อยแล้ว')
            location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        })
      this.lockDetail.id = '';
    },
    // เปิดหน้าต่างลบแถว
    deleteRow(id) {
      this.toggleDelete = true;
      let data = this.marketInfo[id]
      this.d_RowData = {
        lockid: data.lock_id,
        lockname: data.lock_name
      }
    },
    // ลบแถวด้วย id
    cfDeleteRow(id) {
      this.process = true;

      let config = {
        method: 'delete',
        url: `/api/market/` + id,
        headers: {}
      };
      let indexOfArrayItem = this.marketInfo.findIndex(i => i.lock_id === id)

      axios(config)
        .then((response) => {
          if (response.status == 200) {
            alert('ลบแถวเรียบร้อยแล้ว')
            this.marketInfo.splice(indexOfArrayItem, 1)
            this.toggleDelete = false;
          }
        })
        .catch((error) => {
          console.error(error)
          this.toggleDelete = false;
        })
    },
    // ลบผู้เช่าขาประจำ
    deleteCus(id) {
      this.toggleDeleteCus = true;
      let data = this.marketInfo[id]
      this.d_CusData = {
        lockid: data.lock_id,
        lockname: data.lock_name,
        cus_name: data.cus_name,
        cus_typeproduct: data.cus_typeproduct,
        cus_tel: data.cus_tel
      }
    },
    cfDeleteCus(id) {
      this.process = true;
      let config = {
        method: 'delete',
        url: 'api/customer/deletecusrent/' + id,
        headers: {}
      }

      axios(config)
        .then((response) => {
          if (response.status = 200) {
            alert('ลบข้อมูลเรียบร้อยแล้ว');
            this.toggleDeleteCus = false;
            this.process = false;
            location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        })
    },
    loadPayment(id) {
      this.togglePayment = true;
      this.today = 1;

      let total = this.lastDay - this.today + 1;
      let data = this.marketInfo[id];

      this.paymentTask = {
        id: data.lock_id,
        lock: data.lock_name,
        name: data.cus_name,
        size: data.sizelock,
        price: data.pricelock,
        pricePerMonth: data.pricelock * total,
        totalDay: total,
      }


      // this.paymentTask.pricePerMonth = this.paymentTask.price * total;
      // this.paymentTask.totalDay = total
    },
    cfPayment(id) {
      if (confirm('ยืนยันการชำระเงินของ ' + this.paymentTask.name + 'ใช่หรือไม่?')) {
        let data = qs.stringify({
          'cus_name': this.paymentTask.name,
          'totalmoney': this.paymentTask.pricePerMonth,
          'lockname': this.paymentTask.lock
        });
        let config = {
          method: 'post',
          url: `api/receipt/insert/` + id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        }

        axios(config)
          .then((response) => {
            if (response.status == 200) {
              alert('ชำระเงินเรียบร้อยแล้ว')
              this.today = 1;
              location.reload();
            }
          })
          .catch((error) => {
            console.error(error);
          })
        this.togglePayment = false;
      } else {
        return;
      }
    },
    priceDay() {
      this.insertLock.price = this.insertLock.size * 30
    },
    calculatePayByDate(allday, today, price) {
      let day = (allday - today) + 1;
      let sum = day * price;
      return sum;
    },
    CalMonthPrice() {
      if (this.today == 0) {
        alert('ใส่ข้อมูลวันที่เช่าก่อน');
        return
      }
      let total = this.lastDay - this.today + 1;
      this.paymentTask.pricePerMonth = this.paymentTask.price * total;
      this.paymentTask.totalDay = total;
    },
  },
watch:{
  today(value){
    if(value < 1){
      value = 1
      this.today = value
    }
    if(value > this.lastDay){
      value = this.lastDay
      this.today = value
    }
  }
},
components: { BaseInput, BaseInput }
}
</script>
