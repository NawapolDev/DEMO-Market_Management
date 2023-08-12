<template>
  <div class="max-w-full">
    <div class="max-w-7xl mx-auto sm:px-2 lg:p-8">
      <div class="flex flex-row items-center justify-center">
        <!-- Display on desktop -->
        <div class="block lg:block w-full z-0 shadow-lg rounded-md">
          <div class="flex items-center justify-between gap-4 py-3 px-2">
            <div class="flex justify-center items-center space-x-2 md:space-x-6">
              <h1 class="hidden md:flex">จัดการตลาดและการจอง</h1>
              <div class="flex justify-center items-center space-x-2">
                <button class="px-3 py-2 text-base rounded-md hover:scale-110 transition-all duration-150 btn-disabled" @click="openQRscanner"><i class="fa-solid fa-qrcode text-xl"></i></button>
                <span class="hidden md:flex text-sm font-light tracking-wide text-gray-500">แสกน QR Code ชำระเงิน</span>
              </div>
            </div>
            <div class="flex justify-center items-center space-x-2 md:space-x-6">
              <div class="flex">
                <input type="text" id="searchAll" v-model="searchInput" class="p-2 w-[150px] outline-none border rounded-md" placeholder="ค้นหา . . ." @keyup="searchEvent" />
              </div>
              <button class="btn btn-success" @click="prepareInsert">เพิ่มล็อกใหม่<i class="fa-solid fa-square-plus ml-2"></i></button>
            </div>
          </div>
          <div class="overflow-auto rounded-lg ">
            <table class=" table-auto bg-gray-100 w-full">
              <thead class="bg-gray-50 border-gray-300">
                <tr>
                  <th class="p-1 text-sm font-semibold tracking-wide text-center pointer-events-none"></th>
                  <th class="p-1 text-sm font-semibold tracking-wide text-center pointer-events-none">ที่</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อแผง</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">สถานะ</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">วันนัดจ่าย</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">การลา</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อ</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">สินค้า</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">เบอร์โทร</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">QRcode</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ขนาด</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ราคา(วัน)</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">ธุรกรรม</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">รายวัน</th>
                  <th class="p-2 text-sm font-semibold tracking-wide text-center pointer-events-none">แก้ไข</th>
                </tr>
                <tr class="items-center justify-center">
                  <th class="pb-2 text-sm font-thin"></th>
                  <th class="pb-2 text-sm font-thin"></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="ชื่อแผง" v-model="col.lock_name" @keyup="filteredByColumn" class="p-2 w-20 outline-none border rounded-md" /></th>
                  <th class="pb-2 text-sm font-thin">
                    <select v-model="col.status" @change="filteredByColumn" class="p-2 w-18 text-gray-400 outline-none border rounded-md">
                      <option value="">สถานะ</option>
                      <option v-for="cd in uniqColumnData('status')" :key="cd" :value="cd">{{ cd == 3 ? 'ถูกลบ' : cd == 2 ? 'จ่าย' : cd == 1 ? 'จอง' : 'ว่าง'}}</option>
                    </select>
                  </th>
                  <th class="pb-2 text-sm font-thin"><input type="date" :min="minDateSearch()" :max="maxDateSearch()" class="p-2 w-32 text-gray-400 outline-none border rounded-md" v-model="col.paydate" @change="filteredByColumn"></th>
                  <th class="pb-2 text-sm font-thin">
                    <select v-model="col.leave" @change="filteredByColumn" class="p-2 w-18 text-gray-400 outline-none border rounded-md">
                      <option value="">การลา</option>
                      <option v-for="cd in uniqColumnData('leave')" :key="cd" :value="cd">{{ cd == 1 ? 'ลา' : 'มาขาย' }}</option>
                    </select>
                  </th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="ชื่อ" class="p-2 w-24 outline-none border rounded-md" v-model="col.cus_name" @keyup="filteredByColumn"/></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="สินค้า" class="p-2 w-32 outline-none border rounded-md" v-model="col.cus_typeproduct" @keyup="filteredByColumn"/></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="เบอร์โทร" class="p-2 w-28 outline-none border rounded-md" v-model="col.cus_tel" @keyup="filteredByColumn" maxlength="10"/></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="QR Code" class="p-2 w-20 outline-none border rounded-md" v-model="col.qrnumber" @keyup="filteredByColumn" maxlength="5"/></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="ม." class="p-2 text-center w-10 outline-none border rounded-md" v-model="col.sizelock" @keyup="filteredByColumn" maxlength="2"/></th>
                  <th class="pb-2 text-sm font-thin"><input type="text" placeholder="บาท" class="p-2 text-center w-12 outline-none border rounded-md" v-model="col.pricelock" @keyup="filteredByColumn" maxlength="3"/></th>
                  <th class="pb-2 text-sm font-thin"></th>
                  <th class="pb-2 text-sm font-thin"></th>
                  <th class="pb-2 text-sm font-thin"></th>
                </tr>
              </thead>
              <tbody v-if="filteredEntries.length >= 1" class="divide-y divide-gray-200">
                <tr v-for="items in filteredEntries" :key="items.id">
                  <td class="text-sm whitespace-nowrap text-center">
                    <button @click="editRow(items.id)" class="text-orange-500 bg-orange-100 rounded-full px-2 py-1"><i class="fa-solid fa-pen"></i></button>
                  </td>
                  <td class="p-0 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.id+1 }}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center uppercase pointer-events-none">{{items.lock_name}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">
                    <span v-if="items.status == 3" class="p-2 bg-red-300 rounded-md">ถูกลบ</span>
                    <span v-else-if="items.status == 2" class="p-2 bg-green-300 rounded-md">จ่าย</span>
                    <span v-else-if="items.status == 1" class="p-2 bg-yellow-300 rounded-md">จอง</span>
                    <span v-else class="p-2 bg-gray-300 rounded-md">ว่าง</span>
                  </td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center">
                    <span v-if="(items.status == 0 || items.status == 2 || items.status == 3)"></span>
                    <span v-else class="p-2 cursor-pointer bg-indigo-200 rounded-md hover:text-white hover:bg-indigo-500" @click="showPaydate(items.id)">{{formatDate(items.paydate)}}</span>
                  </td>
                  <td class="p-2 text-sm whitespace-nowrap text-center pointer-events-none flex items-center justify-center">
                    <div class="w-2/3" :class="[items.leave == 1 ? 'bg-red-200 text-red-700 py-2 rounded-md' : 'bg-gray-200 text-gray-700 py-2 rounded-md']"><span>{{items.leave == 1 ? 'ลา' : 'มาขาย'}}</span></div>
                  </td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_name}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_typeproduct}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.cus_tel}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.qrnumber}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.sizelock}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{items.pricelock}}</td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center">
                    <button v-if="items.status == 2" class="p-2 bg-green-200 rounded-md" disabled>ชำระเงินแล้ว</button>
                    <button v-else-if="items.status == 1" class="p-2 bg-gray-200 rounded-md" @click="loadPayment(items.id)">ชำระเงิน</button>
                  </td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap text-center">
                    <span v-if="items.custem_name" @click="showTemCus(items.id)" class="py-2 px-3 rounded-md bg-cyan-50 cursor-pointer hover:text-indigo-500 hover:underline">{{ items.custem_name}}</span>
                    <span v-else class="cursor-pointer bg-green-300 text-green-800 rounded-full text-lg px-1.5" @click="insertCusTem(items.id)"><i class="fa-solid fa-plus"></i></span>
                  </td>
                  <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                    <div v-if="items.cus_name" class="flex flex-row gap-2 justify-center text-lg">
                      <button class="text-indigo-500" @click="getLockInfo(items.id)"><i class="fa-solid fa-user-pen"></i></button>
                      <button><i class="fa-solid fa-trash" @click="deleteCus(items.id)"></i></button>
                    </div>
                    <div v-else class="flex justify-center items-center">
                      <button class="text-green-600 text-lg" @click="insertNewCus(items.id)"><i class="fa-solid fa-user-plus"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else class="divide-y divide-gray-200">
                <tr>
                  <td colspan="14" class="p-2 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">
                    ไม่พบข้อมูลที่ค้นหา
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
        <!-- End display on desktop -->
        <!-- Loading screen -->
        <on-load :open="progress" />
        <!-- End loading screen -->
        <!-- Insert New Lock -->
        <div v-show="toggleInsertLock" class="modal">
          <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="relative bg-gray-50 shadow-lg rounded-md">
              <div @click="toggleInsertLock = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col justify-start items-center" @submit.prevent="addNewLock">
                <span class="text-2xl bg-green-500 text-white py-2 px-4 w-full rounded-t-md">เพิ่มข้อมูลล็อกใหม่</span>
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
        <div v-show="toggleInsertCus" class="modal">
          <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="relative bg-gray-50 shadow-lg rounded-md">
              <div @click="toggleInsertCus = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col justify-start items-center" @submit.prevent="cfInsertCus(this.i_NewCus.id)">
                <span class="text-2xl text-white bg-green-500 py-2 px-4 w-full uppercase">ล็อก : {{this.i_NewCus.lock}}</span>
                <div class="p-4">
                  <span class="text-xl underline">เพิ่มข้อมูลลูกค้าใหม่</span>
                  <hr/>
                  <div class="flex gap-2 my-2">
                    <base-input
                      title="ชื่อลูกค้า"
                      label="ตัวอย่าง : ดำ"
                      v-model="this.insertCus_info.name"
                      :max=20
                      :showMax="true"
                      required
                    />
                    <base-input
                      title="สินค้า"
                      label="ตัวอย่าง : ไก่ทอด"
                      v-model="this.insertCus_info.product"
                      :max=20
                      :showMax="true"
                      required
                    />
                  </div>
                  <div class="flex gap-2 my-2">
                    <base-input
                      title="เบอร์โทร"
                      label="เลข 10 หลัก"
                      v-model="this.insertCus_info.tel"
                      :max=10
                      :showMax="true"
                    />
                    <base-input
                      title="เลข QRcode"
                      label="เลข 5 หลัก"
                      v-model="this.insertCus_info.qrnumber"
                      :max=5
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
        <div v-show="this.lockDetail.id" class="modal">
          <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="relative bg-gray-50 shadow-lg rounded-md">
              <div @click="this.lockDetail.id=''" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col justify-start items-center" @submit.prevent="updateCus(this.lockDetail.id)">
                <span class="text-2xl text-white bg-indigo-500 py-2 px-4 w-full uppercase rounded-t-md">{{this.lockDetail.lock}}</span>
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
                    <base-input
                      title="สินค้า"
                      v-model="this.lockDetail.product"
                      :max=20
                      :showMax="true"
                      required
                    />
                  </div>
                  <div class="flex gap-2 my-2">
                    <base-input
                      title="เบอร์โทร"
                      v-model="this.lockDetail.tel"
                      :max=10
                      :showMax="true"
                    />
                    <base-input
                      title="QR code"
                      v-model="this.lockDetail.qrnumber"
                      :max=5
                      :showMax="true"
                      disabled
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
        <div v-show="toggleInsertCusTem" class="modal">
          <div class="flex items-center justify-center min-h-screen p-4 text-center">
            <div class="relative bg-gray-50 shadow-lg rounded-md">
              <div @click="toggleInsertCusTem = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col justify-start items-center" @submit.prevent="cfInsertCusTem(this.i_TemCus.id)">
                <span class="text-2xl text-white bg-green-500 py-2 px-4 w-full uppercase rounded-t-md">ล็อก : {{this.i_TemCus.lock}}</span>
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
        <div v-show="toggleShowTemCus" class="modal">
          <div class="flex items-center justify-center min-h-screen text-center">
            <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
              <!-- <div @click="toggleShowTemCus = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div> -->
              <div class="flex flex-col items-center justify-center">
                <span class="w-full bg-cyan-500 text-white py-2 px-4 text-2xl font-bold rounded-t-md">ข้อมูลลูกค้ารายวัน <i class="fa-solid fa-clock ml-2"></i></span>
                <div class="p-4 m-2 bg-gray-100 rounded-lg">
                    <div class="flex flex-col justify-start items-start space-y-2">
                      <span>ชื่อ : {{ this.lockDetail.custem_name }}</span>
                      <span>สินค้า : {{this.lockDetail.custem_product}}</span>
                      <span>เบอร์โทร : {{this.lockDetail.custem_tel}}</span>
                    </div>
                </div>
                <div class="w-full p-2 rounded-b-md">
                  <hr/>
                  <button class="btn btn-disabled w-1/2 mt-2" @click="toggleShowTemCus = false">ปิด</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Show Temporary Customers Data -->
        <!-- Edit Row -->
        <div v-show="toggleEdit" class="modal">
          <div class="flex items-center justify-center min-h-screen text-center">
            <div class="relative bg-gray-50 shadow-lg h-full duration-200 rounded-md transition-all">
              <div @click="toggleEdit = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col items-center justify-center" @submit.prevent="updateRow(this.edit_RowData.lockid)">
                <span class="w-full bg-yellow-500 text-white py-2 px-4 text-2xl font-bold rounded-t-md">รหัสล็อก {{ this.edit_RowData.lockid }}</span>
                <div class=" items-center justify-center p-4">
                  <span class="text-xl">แก้ไข / ลบ ข้อมูลล็อก</span>
                  <hr/>
                  <div class="flex justify-evenly gap-2 my-2">
                    <base-input
                      title="ชื่อแผง"
                      v-model="edit_RowData.lockname"
                      :max=15
                      :showMax="true"
                      required
                    />
                  </div>
                  <div class="flex justify-evenly gap-2 my-2">
                    <div class="relative flex flex-col mt-6">
                      <label class="absolute -top-6 left-0 text-sm md:text-base">ขนาด</label>
                      <select v-model="edit_RowData.locksize" class="input w-full" @change="updatePriceday" required>
                        <option v-for="items in locksize" :key="items">{{items}}</option>
                      </select>
                    </div>
                    <base-input
                      title="ราคา(วัน)"
                      v-model="edit_RowData.lockprice"
                      required
                    />
                  </div>
                  <span class="px-4 text-sm text-gray-400 after:content-['*'] after:text-red-500">หากท่านกด <span class="text-red-400 underline">ลบแถว</span> ข้อมูลทั้งหมดภายในแผงรหัส {{this.edit_RowData.lockid}} จะหายไปทันที</span>
                </div>
                <div class="flex justify-center p-3 gap-4 bg-gray-100 w-full rounded-b-md">
                  <button class="grow btn btn-confirm" type="submit">อัพเดท<i class="fa-solid fa-pen ml-2"></i></button>
                  <button class="grow-0 btn btn-cancel" type="button" @click="cfDeleteRow(this.edit_RowData.lockid)"><i class="fa-solid fa-trash"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- End edit Row -->
        <!-- Delete Customers data -->
        <div v-show="toggleDeleteCus" class="modal">
          <div class="flex items-center justify-center min-h-screen text-center">
            <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
              <div @click="toggleDeleteCus = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <div class="flex flex-col items-center justify-center">
                <span class="w-full bg-gray-600 text-white py-2 px-4 text-2xl font-bold rounded-t-md">ล็อกที่ : {{ this.d_CusData.lockname }}</span>
                <div class="flex flex-col my-4 space-y-3">
                  <span class="px-4 text-lg">ท่านต้องการลบข้อมูลนี้หรือไม่ ?</span>
                  <div class="flex flex-col items-start space-y-1 p-4 m-2 bg-gray-100 rounded-lg">
                    <span class="text-sm text-gray-500">ชื่อ : {{ this.d_CusData.cus_name }}</span>
                    <span class="text-sm text-gray-500">สินค้า : {{ this.d_CusData.cus_typeproduct }}</span>
                    <span class="text-sm text-gray-500">เบอร์โทร : {{ this.d_CusData.cus_tel }}</span>
                    <span class="text-sm text-gray-500">QR Code : {{ this.d_CusData.qrnumber }}</span>
                  </div>
                  <span class="px-4 text-sm text-gray-400 after:content-['*'] after:text-red-500">หากท่านกด ยืนยัน ข้อมูลทั้งหมดจะหายไปทันที</span>
                </div>
                <div class="flex items-center justify-center p-2 bg-gray-100 w-full rounded-b-md">
                  <button class="btn btn-confirm" @click="cfDeleteCus(this.d_CusData.lockid)">ยืนยัน</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Delete Customers data -->
        <!-- Payment -->
        <div v-show="togglePayment" class="modal">
          <div class="flex items-center justify-center min-h-screen text-center">
            <div class="relative bg-gray-50 shadow-lg h-full rounded-md">
              <div @click="togglePayment = false" class="absolute -top-2 -right-1.5 cursor-pointer text-red-500 px-2 text-2xl rounded-full bg-red-100"><i class="fa-solid fa-xmark"></i></div>
              <form class="flex flex-col items-center justify-center" @submit.prevent="cfPayment()">
                <span class="w-full bg-slate-700 text-white px-4 py-2 font-bold text-2xl rounded-t-md"><i class="fa-solid fa-money-check-dollar mr-2"></i>บันทึกการชำระเงิน</span>
                <div class="space-y-2 p-4 m-2 bg-gray-100 rounded-lg">
                  <div class="flex flex-row px-4 text-xl justify-between w-full pointer-events-none">
                    <div>ล็อก</div>
                    <!-- <span>{{ paymentTask.lock }}</span> -->
                    <div>
                      <span v-for="items, i in receipt" :key="i" class="gap-2">{{ items.lock + ',' }}</span>
                    </div>
                  </div>
                  <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                    <span>QR Code</span>
                    <span>{{paymentTask.qrnumber}}</span>
                  </div>
                  <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                    <span>ชื่อ</span>
                    <span>{{paymentTask.name}}</span>
                  </div>
                  <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                    <span>ขนาด</span>
                    <div>
                      <span v-for="items, i in receipt" :key="i">{{items.size+','}}</span>
                      <span class="ml-2">เมตร</span>
                    </div>
                  </div>
                  <div class="flex flex-row px-4 justify-between w-full pointer-events-none">
                    <span>ราคาต่อวัน</span>
                    <div>
                      <span v-for="items, i in receipt" :key="i">{{items.pricelock+','}}</span>
                      <span class="ml-2">บาท</span>
                    </div>
                  </div>
                  <div class="flex flex-row px-4 justify-between items-center w-full">
                    <span>วันที่เช่า</span>
                    <div class="space-x-1">
                      <button type="button" class="px-2 rounded-md bg-slate-200" @click="minusToday(), CalMonthPrice()"><i class="fa-solid fa-caret-down"></i></button>
                      <input type="text" onkeydown="return false" class="px-2 py-1 rounded-md w-10 text-center outline-none" v-model="today" required readonly/>
                      <button type="button" class="px-2 rounded-md bg-slate-200" @click="plusToday(), CalMonthPrice()"><i class="fa-solid fa-caret-up"></i></button>
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
                  <!-- <div v-for="items,i in receipt" :key="i" class="flex flex-row px-4 gap-24 justify-between w-full cursor-default">
                    <span class="font-base">{{ items.lock }}</span>
                    <span class="font-base">{{receiptCalMonthPrice(items.pricePerLock, items.pricelock)}} บาท</span>
                  </div> -->
                  <div v-for="items,i in receipt" :key="i" class="flex flex-row px-4 gap-24 justify-between w-full cursor-default hover:text-green-500">
                    <span class="font-bold text-lg">ยอดเงินสุทธิ</span>
                    <span class="font-bold text-lg">{{ receiptCalMonthPrice(items.pricePerLock, items.pricelock) }} บาท</span>
                    <!-- <span class="font-bold text-lg">{{ paymentTotalPrice }} บาท</span> -->
                  </div>
                </div>
                <div class="p-3">
                  <button v-if="this.paymentTask.status == 1" class="btn btn-confirm w-full" type="submit">บันทึกการชำระเงิน</button>
                  <button v-else class="btn btn-disabled w-full cursor-not-allowed" disabled type="button">บันทึกการชำระเงิน</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- End Payment -->
        <!-- Paydate -->
        <div v-show="togglePaydate" class="modal">
          <div class="flex items-center justify-center min-h-screen text-center">
            <div class="relative bg-gray-50 shadow-lg h-full duration-200 rounded-md transition-all">
              <form @submit.prevent="changePaydate(this.paydateTask.id)">
                <div class="w-full bg-gray-500 text-white py-2 px-4 text-2xl font-bold rounded-t-md">เลื่อนวันชำระเงิน<i class="fa-solid fa-calendar-days ml-2"></i></div>
                <div class="p-4 m-2 bg-gray-100 rounded-lg">
                  <div class="pb-2 text-base">
                    แผง <span class="font-bold text-green-500">{{ paydateTask.lock }}</span> | คุณ <span class="font-bold text-orange-500">{{ paydateTask.name }}</span>
                  </div>
                  <div class="flex flex-col justify-center items-center space-y-2">
                    <div class="justify-between text-sm text-gray-700 space-x-2">
                      <span>วันที่ปัจจุบัน :</span>
                      <input type="text" v-model="paydateTask.nowdate" class="p-2 w-36 border rounded-md text-sm outline-none pointer-events-none" readonly/>
                    </div>
                    <div class="justify-beteen text-sm text-gray-700 space-x-2">
                      <span>วันที่เลื่อน : </span>
                      <input type="date" :min="minDatePick()" :max="maxDatePick()" v-model="paydateTask.newdate" class="p-2 w-36 border rounded-md text-sm outline-none" required/>
                      <!-- <input type="date" min="2023-01-01" max="2023-01-30" v-model="paydateTask.newdate" class="p-2 w-36 border rounded-md text-sm outline-none" required/> -->
                    </div>
                  </div>
                </div>
                <div class="w-full p-2 rounded-b-md space-x-2">
                  <hr />
                  <button class="grow btn btn-confirm w-2/4 mt-2" type="submit">บันทึก</button>
                  <button class="grow-0 btn btn-disabled w-1/4 mt-2" type="button" @click="togglePaydate = false">ปิด</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End paydate -->
      <!-- Print receipt -->
      <div v-show="togglePrint" class="modal">
        <div class="flex flex-col items-center justify-center min-h-screen text-center">
          <div id="receipt" class="w-[220px] bg-white grid p-2">
            <div class="space-y-1">
              <table class="table-auto w-full">
                <tr>
                  <td class="text-[10px] text-left font-bold whitespace-nowrap">{{ period() }}</td>
                </tr>
                <tr>
                  <td class="text-[16px] text-center font-bold whitespace-nowrap">ตลาดแก่งเสี้ยน Market</td>
                </tr>
                <tr>
                  <td class="text-[12px] text-center font-bold whitespace-nowrap">แยกแก่งเสี้ยน ต.แก่งเสี้ยน</td>
                </tr>
                <tr>
                  <td class="text-[12px] text-center font-bold whitespace-nowrap">อ.เมืองฯ จ.กาญจนบุรี 71000</td>
                </tr>
                <tr>
                  <td class="text-[10px] text-center whitespace-nowrap">โทร. 099 451 9879</td>
                </tr>
                <tr>
                  <td class="text-[10px] text-center whitespace-nowrap">kangsian.market@gmail.com</td>
                </tr>
                <tr>
                  <td class="text-[10px] text-center font-bold whitespace-nowrap">*************************************************</td>
                </tr>
                <tr>
                  <td class="text-[12px] text-center font-bold whitespace-nowrap">ใบเสร็จรับเงิน</td>
                </tr>
                <tr>
                  <td class="text-[10px] text-left whitespace-nowrap flex flex-row justify-between items-center">
                    <div class="w-1/2">
                      <span>เลขที่ใบเสร็จ : </span>
                      <span>{{ this.receiptNumber }}</span>
                      <!-- <span v-for="items, i in ReceiptNumber" :key="i">{{ items }}</span> -->
                    </div>
                    <div class="w-1/2">
                      <span>QR Code : </span>
                      <span v-for="(items,i) in receipt" :key="i">{{ items.qrnumber }}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-[10px] text-left whitespace-nowrap">
                    วันที่ : {{ nowDate() + ' ' + getTime()}}
                  </td>
                </tr>
                <tr>
                  <td class="text-[10px] text-center font-bold whitespace-nowrap">__________________________________</td>
                </tr>
              </table>
            </div>
            <div>
              <table class="table-auto w-full">
                <thead>
                  <tr>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">#</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">แผง</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">ผู้เช่า</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">ราคา</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">วัน</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">จำนวณเงิน</td>
                  </tr>
                </thead>
                <tbody v-for="(items,i) in receipt" :key="i">
                  <tr class="border-b">
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ i+1 }}</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ items.lock }}</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ items.name }}</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ items.pricelock }}</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ paymentTask.totalDay }}</td>
                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ receiptCalMonthPrice(items.pricePerLock, items.pricelock) + ' บ.' }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="6" class="text-[10px] text-center font-bold whitespace-nowrap">
                      __________________________________</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-[10px] text-right font-light whitespace-nowrap">รวมทั้งสิ้น</td>
                    <td colspan="1" class="text-[10px] text-center font-light whitespace-nowrap">{{ receiptTotalPrice() + ' บ.' }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-[10px] text-right font-bold whitespace-nowrap">=======</td>
                    <td colspan="1" class="text-[10px] text-center font-bold whitespace-nowrap">==========</td>
                  </tr>
                  <tr class="my-5">
                    <td colspan="6" class="text-[10px] text-left font-light whitespace-nowrap">
                      พนักงาน : {{ adminInfo.admin_username }}
                    </td>
                  </tr>
                  <tr class="my-5">
                    <td colspan="6" class="text-[10px] text-center font-bold whitespace-nowrap">
                      *************************************************
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="flex mt-5 justify-center p-1 gap-2 rounded-md bg-gray-100 w-[220px] rounded-b-md">
            <div class="grow">
              <button class="btn btn-confirm w-full" @click="print">พิมพ์ใบเสร็จ</button>
            </div>
            <div class="grow-0 margin-0">
              <button class="btn btn-disabled" @click="togglePrint = false"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
        </div>
      </div>
      <!-- End print receipt -->
      <!-- QR Scanner -->
      <div v-show="toggleQRscreen" class="modal">
        <div class="min-h-screen flex justify-center items-center">
          <div class="relative bg-gray-50 shadow-lg h-full w-fit duration-200 rounded-md transition-all">
            <div class="flex flex-col p-2 justify-center items-center space-y-2">
              <div class="justify-center items-center">
                <div id="reader" width="900px"></div>
              </div>
              <div class="flex flex-row p-2 items-center justify-center space-x-2">
                <div >ผลลัพธ์ : </div>
                <label v-if="QRerror" class="p-2 text-sm font-light tracking-wide text-gray-700 bg-red-400 rounded-md truncate">{{ QRerror }}</label>
                <label v-else class="p-2 text-sm font-light tracking-wide text-gray-700 bg-green-400 rounded-md truncate">{{ QRsuccess }}</label>
              </div>
              <button class="btn btn-disabled" @click="(toggleQRscreen = false)">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End QR Scanner -->
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import BaseInput from "@/components/Base-Input.vue";
import onLoad from "@/components/on-Load.vue"
import { ref } from '@vue/reactivity';
import { $array, $object } from 'alga-js';
import moment from 'moment';
import {Html5Qrcode, Html5QrcodeScanner} from "html5-qrcode";

var qs = require('qs');
export default {
  name: "MarketView",
  data() {
    let toggleInsertLock = ref(false);
    let toggleInsertCus = ref(false);
    let toggleInsertCusTem = ref(false);
    let toggleUpdateCus = ref(false);
    let toggleEdit = ref(false);
    let toggleDeleteCus = ref(false);
    let toggleShowTemCus = ref(false);
    let togglePayment = ref(false);
    let togglePaydate = ref(false);
    let togglePrint = ref(false);
    let toggleQRscreen = ref(false);

    let paymentTotalPrice = 0;

    return {
      //admin
      adminInfo:{},
      // dateCalculate
      today: 1,
      lastDay:'',
      dayinmonth:[],
      // size(m)
      locksize: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //entries
      indexRow:0,
      showEntries: [5, 10, 15, 20, 25, 50],
      currentEntries: 50,
      filteredEntries:[],
      currentPage: 1,
      allPages: 1,
      searchInput: '',
      searchEntries:[],
      col : {
        lock_id:'',
        lock_name: '',
        cus_name: '',
        cus_tel: '',
        cus_typeproduct: '',
        custem_name: '',
        custem_tel: '',
        custem_typeproduct: '',
        status: '',
        sizelock: '',
        pricelock: '',
        leave: '',
        paydate:'',
      },
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
        qrnumber: "",
      },
      // EditRow
      edit_RowData: {},
      // deleteCus
      d_CusData: { lockid: '', lockname: '', cus_name: '', cus_typeproduct: '', cus_tel: '' },
      // payment
      paymentTask: {},
      monthPrice:[],
      receipt:[],
      // ReceiptNumber: [],
      receiptNumber:'',
      paymentTotalPrice,
      // pay date
      paydateTask:{},
      // toggle screen
      toggleInsertLock,
      toggleInsertCus,
      toggleInsertCusTem,
      toggleUpdateCus,
      toggleEdit,
      toggleDeleteCus,
      togglePayment,
      toggleShowTemCus,
      togglePaydate,
      togglePrint,
      toggleQRscreen,
      // progress
      progress: false,
      err: false,
      errMsg: '',
      message: '',
      //QRCode
      QRsuccess:'',
      QRerror:'',
    };
  },
  async mounted() {
    // if (!localStorage.getItem('admin-info')) {
    //   this.$router.push({ name: 'admin' })
    // } 
    this.getDayInMonth();
    this.adminInfo = JSON.parse(window.localStorage.getItem('admin-info'));
  },
  computed:{
    showInfo(){
      return $array.pageInfo(this.getCurrentEntries(), this.currentPage, this.currentEntries);
    },
    showPagination(){
      return $array.pagination(this.allPages, this.currentPage, 2);
    },
  },
  created(){
    this.reloadPage();
    // this.getAllData().then(res => {
    //   this.marketInfo = res.data
    //   this.marketInfo.forEach((v,i)=>{
    //     v.id = i
    //   })
    //   this.paginateData(this.marketInfo);
    // })
  },
  methods: {
    async getAllData(){
      const response = await axios.get('api/market');
      return response;
    },
    // รีเฟรช table
    async reloadPage(){
      this.progress = true;
      await this.getAllData().then(res => {
        this.marketInfo = res.data
        this.marketInfo.forEach((v, i, a) => {
          v.id = i;
          if(v.paydate){
            v.paydate = this.ConvertPaydate(v.paydate);
          }
        })
        this.paginateData(this.marketInfo);
      })
      this.paginateEntries();
      this.progress = false;
    },
    //แปลงวันที่ ปั เดือน วัน
    ConvertPaydate(date){
      return moment(date).format('YYYY-MM-DD');
    },
    // กำหนดฟอแมตวันที่แสดงบน table
    formatDate(date){
      return moment(date).format('DD/MM/YYYY')
    },
    // งวดชำระมุมบนขวาใบเสร็จ
    period() {
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
      return dmy.mm + '/' + dmy.yy
    },
    //เรียงข้อมูล
    // sortData(arr){
    //   const sorted = arr.sort((a,b) => a.name.localeCompare(
    //     b.name,
    //     undefined,
    //     { numeric: true }
    //   ))
    //   return sorted
    // },
    paginateEntries() {
      if(this.searchInput.length >= 1) {
        this.searchEntries = $array.search(this.marketInfo, this.searchInput)
        this.paginateData(this.searchEntries)
      } else {
        this.searchEntries = [];
        this.paginateData(this.marketInfo)
        this.col = {
          lock_id: '',
          lock_name: '',
          cus_name: '',
          cus_tel: '',
          cus_typeproduct: '',
          custem_name: '',
          custem_tel: '',
          custem_typeproduct: '',
          status: '',
          sizelock: '',
          pricelock: '',
          leave: '',
        }
      }
    },
    paginateEvent(page){
      this.currentPage = page
      this.paginateEntries()
    },
    paginateData(data){
      this.filteredEntries = $array.paginate(data, this.currentPage, this.currentEntries);
      this.allPages = $array.pages(data, this.currentEntries)
    },
    searchEvent(){
      this.currentPage = 1;
      this.paginateEntries();
    },
    uniqColumnData(column){
      return $array.unique(this.getCurrentEntries(), column)
    },
    getCurrentEntries(){
      return (this.searchEntries.length <= 0) ? this.marketInfo : this.searchEntries;
    },
    filteredByColumn(){
      const filterCol = $object.removeBy(this.col, '');
      let filterData = this.getCurrentEntries();
      if(Object.entries(filterCol).length >= 1) {
        filterData = $array.filter(this.getCurrentEntries(), filterCol)
      }
      this.paginateData(filterData)
    },
    getLockInfo(id) {
      let data = this.getCurrentEntries()[id];
      this.lockDetail = {
        id: data.lock_id, // รหัสล็อก
        lock: data.lock_name, // ชื่อล็อก
        name: data.cus_name, // ชื่อลูกค้าประจำ
        qrnumber: data.qrnumber, // QR code
        tel: data.cus_tel, // เบอร์ลูกค้าประจำ
        product: data.cus_typeproduct, //สินค้าลูกค้าประจำ
      };
    },
    // เรียกดูข้อมูลลุกค้ารายวัน
    showTemCus(id) {
      this.toggleShowTemCus = true;
      let data = this.getCurrentEntries()[id];
      this.lockDetail = {
        custem_name: data.custem_name, //ชื่อลูกค้ารายวัน
        custem_tel: data.custem_tel, // เบอร์ลูกค้ารายวัน
        custem_product: data.custem_typeproduct, //สินค้าลูกค้ารายวัน
      }
    },
    //แสดง modal วันที่นัดชำระเงิน
    showPaydate(id){
      this.togglePaydate = true;
      let data = this.getCurrentEntries()[id];
      this.paydateTask = {
        id : data.lock_id,
        lock : data.lock_name,
        name : data.cus_name,
        nowdate : this.formatDate(data.paydate),
        newdate : '',
      };
    },
    //เปลี่ยนวันที่นัดชำระเงิน
    changePaydate(id){
      this.progress = true;
      var data = qs.stringify({
        'paydate': this.paydateTask.newdate
      });
      var config = {
        method: 'post',
        url: 'api/customer/postpone/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      axios(config)
      .then((response) => {
        if(response.data.status == true){
          this.togglePaydate = false;
          this.progress = false;
          this.paydateTask = {};
        }
        this.reloadPage();
      })
      .catch((error) => {
        console.error(error);
        this.progress = false;
      })
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
    //เวลาปัจจบัน
    getTime(){
      let date = new Date();
      return moment(date).format("hh:mm");
    },
    // วันที่น้อยสุดที่สามารถเปลี่ยนได้ คือวันที่ปัจจุบัน
    minDatePick(){
      let date = new Date();
      return moment(date).format("YYYY-MM-DD")
    },
    // วันที่มากที่สุดที่สามารถเลือกได้ วันที่ 7 ของทุกเดือน
    maxDatePick(){
      let date = new Date();
      return moment(date).format("YYYY-MM-07");
    },
    // วันที่น้อยสุดที่สามารถค้นหาได้ วันที่ 1 ของเดือน
    minDateSearch(){
      let date = new Date();
      // let d = '01';
      // let m = date.getMonth() + 1;
      // let y = date.getFullYear();
      // let dmy = y + '-' + m + '-' + d;
      return moment(date).format("YYYY-MM-01");
    },
    // วันที่มากสุดที่สามารถค้นหาได้ วันที่ 7 ของเดือน
    maxDateSearch(){
      let date = new Date();
      // let d = '07';
      // let m = date.getMonth() + 1;
      // let y = date.getFullYear();
      // let dmy = y + '-' + m + '-' + d;
      return moment(date).format("YYYY-MM-07");
    },
    //เรียกแสดงวันที่ทั้งหมดของเดือน
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
      this.toggleInsertLock = true;
      this.insertLock = {
        lock : "",
        size : "",
        price : "",
      }
    },
    // เพิ่มล็อกใหม่
    addNewLock() {
      this.progress = true;
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
      let dv;
      for (let index = 0; index < this.marketInfo.length; index++) {
        if(this.marketInfo[index].lock_name.toUpperCase() == this.insertLock.lock.toUpperCase()){
          dv = 1;
        }
      }
      if(dv == 1){
        alert("ชื่อแผงถูกใช้งานไปแล้ว กรุณาตั้งชื่อใหม่");
        this.progress = false;
        return;
      } else {
        axios(config)
          .then((response) => {
            if(response.data.status == true){
              console.log("Add new lock complete.");  
            }
            this.reloadPage();
          })
          .catch((error) => {
            console.error(error);
          })
        this.toggleInsertLock = false;
        this.progress = false;
      }
    },
    // เพิ่มลูกค้าใหม่
    insertNewCus(id) {
      this.toggleInsertCus = true;
      let data = this.getCurrentEntries()[id]
      this.i_NewCus = {
        id: data.lock_id,
        lock: data.lock_name,
        name: data.cus_name,
        product: data.cus_typeproduct,
        qrnumber: data.qrnumber,
        tel: data.cus_tel,
      }
    },
    cfInsertCus(id) {
      this.progress = true;
      let data = qs.stringify({
        'cus_name': this.insertCus_info.name,
        'cus_typeproduct': this.insertCus_info.product,
        'cus_tel': this.insertCus_info.tel,
        'qrnumber': this.insertCus_info.qrnumber
      })
      let config = {
        method: 'post',
        url: 'api/customer/insertcusrent/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
      let dv;
      for (let index = 0; index < this.marketInfo.length; index++) {
        // if(this.marketInfo[index].cus_name != this.insertCus_info.name && this.marketInfo[index].cus_tel == this.insertCus_info.tel){
        //   dv = 1; // เมื่อชื่อไม่ตรงกันแต่เบอร์โทรตรงกัน
        // }
        
        if(this.marketInfo[index].qrnumber == this.insertCus_info.qrnumber){
          dv = 1; //เมื่อเลข QR code ซ้ำกัน
        }
      }
      if(dv == 1 || this.insertCus_info.qrnumber.length < 5){
        this.progress = false;
        if(dv == 1){
          alert("เลข QR Code ซ้ำ");
          return;
        }
        if(this.insertCus_info.qrnumber.length < 5){
          alert("โปรดกรอก QR Code ให้ครบถ้วน");
          return;
        }
      } else {
        axios(config)
          .then((response) => {
            if (response.data.status == true) {
              this.insertCus_info = { name: '', tel: '', product: '', qrnumber: '' };
              this.toggleInsertCus = false;
              this.progress = false;
            }
            this.reloadPage();
          })
          .catch((error) => {
            console.error(error);
            this.toggleInsertCus = false;
            this.progress = false;
          })
      }
    },
    // เพิ่มลูกค้ารายวัน
    insertCusTem(id) {
      this.toggleInsertCusTem = true;
      let data = this.getCurrentEntries()[id]
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
      this.progress = true;
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
          if (response.data.status == true) {
            this.toggleInsertCusTem = false;
            this.i_TemCus = {};
            this.progress = false;
          }
          this.reloadPage()
        })
        .catch((error) => {
          console.error(error);
          this.progress = false;
        })
      this.toggleInsertCusTem = false;
    },
    // อัพเดทข้อมูลลูกค้าประจำ
    updateCus(id) {
      this.progress = true;
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
      let dv;
      for (let index = 0; index < this.marketInfo.length; index++) {
        // if(this.marketInfo[index].lock_id != this.lockDetail.id && this.marketInfo[index].cus_name != this.lockDetail.name && this.marketInfo[index].cus_tel == this.lockDetail.tel){
        //   dv = 1;
        // }
        if(this.marketInfo[index].cus_tel == this.lockDetail.tel){
          dv = 1;
        }
      }
      if(dv == 1 || this.lockDetail.tel.length != 10){
        this.progress = false;
        if(dv==1){
          alert("เลข QR Code ซ้ำ!");
          return;
        }
        if(this.lockDetail.tel.length != 10){
          alert("โปรดกรอกเบอร์โทรให้ครบถ้วน");
          return;
        }
        return;
      } else {
        axios(config)
          .then((response) => {
            if(response.data.status == true){
              this.lockDetail.id = '';
              this.progress = false;
            }
            this.reloadPage();
          })
          .catch((error) => {
            console.error(error);
            this.progress = false;
          })
      }
    },
    // เปิดหน้าต่างแก้ไขแถว
    editRow(id) {
      this.toggleEdit = true;
      // let data = this.marketInfo[id]
      let data = this.getCurrentEntries()[id]
      this.edit_RowData = {
        lockid: data.lock_id,
        lockname: data.lock_name,
        locksize: data.sizelock,
        lockprice: data.pricelock
      }
    },
    updateRow(id){
      this.progress = true;
      let data = qs.stringify({
        'lock_name': this.edit_RowData.lockname,
        'sizelock': this.edit_RowData.locksize,
        'pricelock': this.edit_RowData.lockprice 
      })
      let config = {
        method: 'post',
        url: 'api/market/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      let dv;
      for (let index = 0; index < this.marketInfo.length; index++) {
        if(this.marketInfo[index].lock_id != this.edit_RowData.lockid && this.marketInfo[index].lock_name == this.edit_RowData.lockname){
          dv = 1;
        }
      }
      if(dv == 1){
        this.progress = false;
        alert("ชื่อแผงถูกใช้งานแล้ว โปรดตรวจสอบอีกครั้ง");
        return;
      } else {
        axios(config)
          .then((response) => {
            if(response.data.status == true){
              this.toggleEdit = false;
              this.progress = false;
            }
            this.reloadPage();
          })
          .catch((error)=>{
            console.error(error);
            this.progress = false;
          })
      }
    },
    // ลบแถวด้วย id
    cfDeleteRow(id) {
      this.progress = true;

      let config = {
        method: 'delete',
        url: `/api/market/` + id,
        headers: {}
      };
      let indexOfArrayItem = this.getCurrentEntries().findIndex(i => i.lock_id === id)

      if(confirm("คุณต้องการลบ "+ this.edit_RowData.lockname +" ใช่หรือไม่?")){
        axios(config)
          .then((response) => {
            if (response.data.status == true) {
              alert('ลบแถวเรียบร้อยแล้ว')
              this.getCurrentEntries().splice(indexOfArrayItem, 1)
              this.paginateEntries()
              this.toggleEdit = false;
              this.progress = false;
            }
          })
          .catch((error) => {
            console.error(error)
            this.toggleEdit = false;
            this.progress = false;
          })
      }
    },
    // ลบผู้เช่าขาประจำ
    deleteCus(id) {
      this.toggleDeleteCus = true;
      let data = this.getCurrentEntries()[id]
      this.d_CusData = {
        lockid: data.lock_id,
        lockname: data.lock_name,
        cus_name: data.cus_name,
        cus_typeproduct: data.cus_typeproduct,
        cus_tel: data.cus_tel,
        qrnumber: data.qrnumber
      }
    },
    //ยืนยันการลบผู้เช่า
    cfDeleteCus(id) {
      this.progress = true;
      let config = {
        method: 'delete',
        url: 'api/customer/deletecusrent/' + id,
        headers: {}
      }
      axios(config)
        .then((response) => {
          if (response.data.status == true) {
            this.toggleDeleteCus = false;
            this.progress = false;
          }
          this.reloadPage();
        })
        .catch((error) => {
          console.error(error);
          this.progress = false;
        })
    },
    // แสดงหน้าจอการบันทึกชำระเงิน
    loadPayment(id) {
      this.togglePayment = true;
      this.today = 1;

      let total = this.lastDay - this.today + 1;
      let data = this.getCurrentEntries()[id];
      let cusData = [];

      this.paymentTask = {
        id: data.lock_id,
        lock: data.lock_name,
        name: data.cus_name,
        qrnumber: data.qrnumber,
        tel: data.cus_tel,
        size: data.sizelock,
        price: data.pricelock,
        status: data.status,
        totalDay: total,
      }
      this.TotalLockPrice();
      this.marketInfo.forEach(async (v) => {
        if(v.qrnumber == this.paymentTask.qrnumber && v.cus_name == this.paymentTask.name && v.status == 1){
          cusData.push({ id:v.lock_id, name:v.cus_name, lock: v.lock_name , size: v.sizelock ,pricelock: v.pricelock , tel: v.cus_tel, qrnumber: v.qrnumber, pricePerLock: (v.pricelock * (this.lastDay - this.today + 1)) });
        }
        if(v.qrnumber == this.paymentTask.qrnumber && v.cus_name == this.paymentTask.name && v.status == 3){
          cusData.push({ id:v.lock_id, name:v.cus_name, lock: v.lock_name , size: v.sizelock ,pricelock: v.pricelock , tel: v.cus_tel, qrnumber: v.qrnumber, pricePerLock: (v.pricelock * (this.lastDay - this.today + 1)) });
        }
      });
      this.receipt = cusData;
    },
    //คำนวณราคาค่าเช่า
    TotalLockPrice(){
      let sum = 0;
      this.marketInfo.forEach((v) => {
        if(v.qrnumber == this.paymentTask.qrnumber && v.status == 1){
          sum += (v.pricelock * (this.lastDay - this.today + 1));
        }
        if(v.qrnumber == this.paymentTask.qrnumber && v.status == 3){
          sum += (v.pricelock * (this.lastDay - this.today + 1));
        }
      });
      this.paymentTotalPrice = sum;
    },
    //คำนวณราคาใบเสร็จ
    receiptTotalPrice(){
      let sum = 0;
      this.receipt.forEach((v) => {
        sum += v.pricelock * this.paymentTask.totalDay;
      });
      return sum;
    },
    //ยืนยันการชำระเงิน
    async cfPayment() {
      this.progress = true;

      for (let i = 0; i < this.receipt.length; i++) {
        let data = qs.stringify({
          'cus_name': this.receipt[i].name,
          // 'totalmoney': this.receipt[i].pricePerLock,
          'totalmoney': this.receipt[i].pricelock * this.paymentTask.totalDay,
          'lockname': this.receipt[i].lock,
          'qrnumber' : this.receipt[i].qrnumber
        });
        let config = {
          method: 'post',
          url: `http://localhost:8001/api/receipt/insert/` + this.receipt[i].id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        }
        await axios(config)
        .then(async (response) => {
          if (response.data.status == true) {
            this.togglePayment = false;
            this.receiptNumber = response.data.receiptrow;
            // this.ReceiptNumber.push(response.data.receiptrow);    
            this.today = 1;
            this.progress = false;
            await this.totalReceipt();
            this.togglePrint = true;
          }
          this.reloadPage();
        })
        .catch((error) => {
          console.error(error);
          this.togglePayment = false;
          this.progress = false;
        })
      }
    },
    //คำนวณราคาทั้งหมดในใบเสร็จ
    totalReceipt(){
      const arr = [];
      this.receipt.forEach((v) => {
        arr.push( v.pricePerLock )
      })
      const initialValue = 0;
      const sumWithInitial = arr.reduce((acc, val) => acc + val, initialValue);
      return sumWithInitial;
    },
    //ราคาต่อวันในล็อก
    priceDay() {
      this.insertLock.price = this.insertLock.size * 30;
    },
    //อัพเดทราคาล็อก
    updatePriceday(){
      this.edit_RowData.lockprice = this.edit_RowData.locksize * 30;
    },
    //คำนวณราคาต่อเดือน
    calculatePayByDate(allday, today, price) {
      let day = (allday - today) + 1;
      let sum = day * price;
      return sum;
    },
    CalMonthPrice() {
      if (this.today == 0) {
        return
      }
      let total = this.lastDay - this.today + 1;
      this.paymentTask.pricePerMonth = this.paymentTask.price * total;
      this.paymentTask.totalDay = total;
    },
    receiptCalMonthPrice(value, price){
      if (this.today == 0) {
        return
      }
      value = price * this.paymentTask.totalDay;
      return value
    },
    plusToday(){
      if(this.today == this.lastDay){
        this.today = 1;
        return;
      }
      this.today++;
    },
    minusToday(){
      if(this.today == 1){
        this.today = this.lastDay;
        return;
      }
      this.today--;
    },
    //ปริ้นท์ใบเสร็จ
    print(){
      const prtHtml = document.getElementById('receipt').innerHTML;
      let stylesHtml = '';
      for(const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]){
        stylesHtml += node.outerHTML;
      }

      const WinPrint = window.open('','', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>
      `);
      // WinPrint.document.close();
      // WinPrint.focus();
      WinPrint.print();
      // WinPrint.close();
      this.togglePrint = false;
    },
    //วันที่ปัจจุบัน
    nowDate(){
      let date = new Date();
      return moment(date).format("DD/MM/YYYY")
    },
    // แสกน QRCode
    openQRscanner(){
      this.toggleQRscreen = true;
      let scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 20,
      });

      scanner.render(async(suc) => {
        console.log(suc);
        // document.getElementById('result').innerHTML = `<span class="p-2 text-sm font-light tracking-wide text-gray-700 bg-green-400 rounded-md truncate">` + suc +`</span>`;
        
        //process
        this.beforeScan(suc);
        // await this.afterScan(suc);

        // close scanner
        scanner.clear();
      },
      (err)=>{
        console.error(err);
      });
    },
    //ก่อนแสกน QR code
    beforeScan(qrnumber) {
      //เช็คว่าจ่ายแล้วหรือยัง
      // let paid = false;
      // let check = [];
      // await this.marketInfo.forEach((v)=>{
      //   if(v.qrnumber == qrnumber && v.status == 2){
      //     console.log(v.cus_tel);
      //     console.log(qrnumber);
      //     check.push({status: v.status})
      //   }
      // });
      // แจ้งเตือนว่าจ่ายแล้วหลังแสกน
      // for (let index = 0; index < check.length; index++) {
      //   console.log(check[index].status);
      //   if(check[index].status == 2){
      //     paid = true;
      //     break;
      //   }
      // }
      // if(paid){
      //   console.log('paid');
      //   this.QRsuccess = 'ลูกค้าท่านนี้ทำการชำระเงินเรียบร้อยแล้ว';
      //   return;
      // } else {
      //   console.log('unpaid');
      //   this.afterScan(phonenum);
      //   this.toggleQRscreen = false;
      // }

      this.afterScan(qrnumber);
      this.toggleQRscreen = false;
    },
    //หลังจากแสกน
    afterScan(value) {
      this.togglePayment = true;
      this.today = 1;
      let cusData = [];
      let total = this.lastDay - this.today + 1;
      this.paymentTask.totalDay = total;
      this.marketInfo.forEach(async (v) => {
        if (v.qrnumber == value && (v.status == 1 || v.status == 2 || v.status == 3)) {
          cusData.push({ id: v.lock_id, name: v.cus_name, lock: v.lock_name, size: v.sizelock, pricelock: v.pricelock, qrnumber: v.qrnumber , tel: v.cus_tel, pricePerLock: (v.pricelock * (this.lastDay - this.today + 1)), status: v.status });
          this.paymentTask.name = v.cus_name;
          this.paymentTask.status = v.status;
        }
        // if (v.qrnumber == value && v.status == 3) {
        //   cusData.push({ id: v.lock_id, name: v.cus_name, lock: v.lock_name, size: v.sizelock, pricelock: v.pricelock,qrnumber: v.qrnumber , tel: v.cus_tel, pricePerLock: (v.pricelock * (this.lastDay - this.today + 1)), status: v.status });
        //   this.paymentTask.name = v.cus_name;
        //   this.paymentTask.status = v.status;
        // }
      });
      this.receipt = cusData;
      
      let sum = 0;
      this.receipt.forEach((v) => {
        sum += (v.pricelock * (this.lastDay - this.today + 1));
        // this.paymentTotalPrice += (v.pricelock * (this.lastDay - this.today + 1));
        // if(v.status == 1){
        //   sum += (v.pricelock * (this.lastDay - this.today + 1));
        // }
        // if(v.status == 3){
        //   sum += (v.pricelock * (this.lastDay - this.today + 1));
        // }
      });
      this.paymentTotalPrice = sum;
    }
  },
watch:{

},
components: { BaseInput, onLoad }
}
</script>
