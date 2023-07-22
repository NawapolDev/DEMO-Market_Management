<template>
    <div class="max-w-7xl mx-auto sm:px-6 lg:p-8">
        <div class="flex flex-row items-center justify-center my-2 rounded-md border-2 border-gray-500 border-solid">
            <div class="w-full z-0 shadow-lg rounded-md">
                <div class="flex md:hidden justify-center items-center w-full">
                    <h1>รายการชำระเงิน</h1>
                </div>
                <div class="flex items-center justify-between py-3 px-2">
                    <h1 class="hidden md:block">รายการชำระเงิน</h1>
                    <div class="flex items-center justify-center space-x-2">
                        <label>ค้นหา</label>
                        <input type="month" class="p-2 outline-none border rounded-md hover:border-gray-500 focus:border-indigo-500"
                            v-model="searchByMonth" />
                        <button v-if="toggleSearch == false" @click="toggle_s_receipt"><i
                                class="fa-sharp fa-solid fa-magnifying-glass text-lg bg-gray-200 px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-md"></i>
                            </button>
                        <button v-else @click="toggle_s_receipt"><i
                                class="fa-solid fa-arrow-rotate-right text-lg bg-gray-200 px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-md"></i>
                        </button>
                        <button class="btn btn-cancel" @click="deleteAll">
                            ลบทั้งหมด
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-between px-4 ">
                    <div class="overflow-auto rounded-lg w-full border-2 border-gray-300 border-solid">
                        <table class="table-auto w-full">
                            <thead class="bg-gray-100 border-b-2 border-gray-300">
                                <!-- <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">#</th> -->
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">เลขที่ใบเสร็จ</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">QR Code</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อ</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ชื่อล็อก</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">วันที่</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">เวลา</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">จำนวนเงิน</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ประเภทลูกค้า</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ใบเสร็จ</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-center pointer-events-none">ลบ</th>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="(items, id) in filteredEntries" :key="id">
                                    <!-- <td class="p-3 text-sm text-indigo-600 whitespace-nowrap text-center ">{{ id + 1 }}</td> -->
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.receipt_id }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.qrnumber }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.cusalltyp }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.lockname }}</td>
                                    <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.paydate.substring(0,10) }}</td> -->
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ formatDate(items.paydate) }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ formatTime(items.paydate) }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">{{ items.totalmoney }}</td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center pointer-events-none">
                                        <span v-if="items.custype == 0" class="p-2 rounded-lg bg-green-200">ลูกค้ารายเดือน</span>
                                        <span v-else class="p-2 rounded-lg bg-yellow-200">ลูกค้ารายวัน</span>
                                    </td>
                                    <td class="p-3 text-base text-gray-700 whitespace-nowrap text-center">
                                        <button class="cursor-pointer" @click="getReceiptDetail(items.receipt_id)"><i class="fa-solid fa-print"></i></button>
                                    </td>
                                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                        <button @click="deleteReceipt(items.receipt_id)"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex items-center justify-between p-3 overflow-auto">
                    <div class="font-light whitespace-nowrap text-gray-500">แสดง {{ showInfo.from }} ถึง {{ showInfo.to }} จาก {{ showInfo.of }} รายการ</div>
                    <div>
                        <ul class="flex">
                            <li
                                :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {' pointer-events-none text-gray-300': currentPage === 1}]">
                                <a href="#" class="p-2" @click.prevent="currentPage = 1, paginateEntries()"><i
                                        class="fa-solid fa-angles-left"></i></a>
                            </li>
                            <li
                                :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === 1}]">
                                <a href="#" class="p-2"
                                    @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()"><i
                                        class="fa-solid fa-angle-left"></i></a>
                            </li>
                            <li :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'text-gray-500 pointer-events-none': pagi === '...', ' border-indigo-400 text-white bg-indigo-500':pagi === currentPage }]"
                                v-for="pagi in showPagination" :key="pagi">
                                <a href="#" class="p-2" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
                            </li>
                            <li
                                :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                                <a href="#" class="p-2"
                                    @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()"><i
                                        class="fa-solid fa-angle-right"></i></a>
                            </li>
                            <li
                                :class="['rounded-md p-2 text-base text-center hover:text-gray-700 hover:bg-gray-200', {'pointer-events-none text-gray-300': currentPage === allPages}]">
                                <a href="#" class="p-2" @click.prevent="currentPage = allPages, paginateEntries()"><i
                                        class="fa-solid fa-angles-right"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Print receipt -->
        <div v-show="togglePrint" class="modal">
            <div class="flex flex-col items-center justify-center min-h-screen text-center">
                <div id="receipt" class="w-[220px] bg-white grid p-2">
                    <div class="space-y-1">
                        <table class="table-auto w-full">
                            <tr>
                                <td class="text-[10px] text-left font-bold whitespace-nowrap">{{ period(printReceiptData.paydate) }}</td>
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
                                <td class="text-[10px] text-left whitespace-nowrap flex flex-row">
                                    <div class="w-1/2">
                                        <span>เลขที่ใบเสร็จ : </span>
                                        <span>{{ printReceiptData.receipt_id }}</span>
                                    </div>
                                    <div class="w-1/2">
                                        <span>QR Code : </span>
                                        <span>{{ printReceiptData.qrnumber }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-[10px] text-left whitespace-nowrap">
                                    วันที่ : {{ formatDate(printReceiptData.paydate) + ' ' + formatTime(printReceiptData.paydate) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-[10px] text-center font-bold whitespace-nowrap">
                                    __________________________________</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table class="table-auto w-full">
                            <thead>
                                <tr>
                                    <th class="text-[10px] text-center font-light whitespace-nowrap">แผง</th>
                                    <th class="text-[10px] text-center font-light whitespace-nowrap">ผู้เช่า</th>
                                    <th class="text-[10px] text-center font-light whitespace-nowrap">จำนวณเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ printReceiptData.lockname }}</td>
                                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ printReceiptData.cusalltyp }}</td>
                                    <td class="text-[10px] text-center font-light whitespace-nowrap">{{ printReceiptData.totalmoney + ' บ.'}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="text-[10px] text-center font-bold whitespace-nowrap">
                                        __________________________________</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-[10px] text-right font-light whitespace-nowrap">รวมทั้งสิ้น</td>
                                    <td colspan="1" class="text-[10px] text-center font-light whitespace-nowrap">{{ printReceiptData.totalmoney + ' บ.' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-[10px] text-right font-bold whitespace-nowrap">=======</td>
                                    <td colspan="1" class="text-[10px] text-center font-bold whitespace-nowrap">==========</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-[10px] text-left font-light whitespace-nowrap">
                                        พนักงาน : {{ adminInfo.admin_username }}
                                    </td>
                                </tr>
                                <tr class="my-5">
                                    <td colspan="3" class="text-[10px] text-center font-bold whitespace-nowrap">
                                        *************************************************
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="flex mt-5 justify-center p-1 gap-2 rounded-md bg-gray-100 w-[220px] rounded-b-md">
                    <div class="grow">
                        <button class="hidden md:block btn btn-confirm w-full" @click="print">พิมพ์ใบเสร็จ</button>
                        <button class="md:hidden block btn btn-cancel w-full" @click="print">พิมพ์ใบเสร็จ</button>
                    </div>
                    <div class="grow-0 margin-0">
                        <button class="btn btn-disabled" @click="togglePrint = false"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End print receipt -->
    </div>
    <on-load :open="progress" />
</template>
<script>
import { ref } from 'vue'
import { $array } from 'alga-js';
import axios from 'axios'
import onLoad from '@/components/on-Load.vue';
import moment from 'moment';

export default {
    name : 'receipt',
    components : { onLoad },
    data(){
        let toggleSearch = ref(false);
        let togglePrint = ref(false);

        const toggle_s_receipt = () => {
            this.toggleSearch = !this.toggleSearch;
            if(this.toggleSearch == true){
                this.searchMonth();
            } else {
                this.reloadPage();
                this.searchByMonth = '';
            }
        }
        return{
            //admin
            adminInfo:{},
            //pagination
            currentEntries: 30,
            filteredEntries:[],
            currentPage: 1,
            allPages: 1,
            // toggle
            toggle_s_receipt,
            toggleSearch,
            // search
            searchByMonth:'',
            // data
            receiptDetail:[],
            //progressing 
            progress: false,
            //PrintReceipt
            togglePrint,
            printReceiptData: {},
        }
    },
    mounted() {
        if (!localStorage.getItem('admin-info')) {
            this.$router.push({ name: 'admin' })
        }
        this.getReceiptData();
        this.adminInfo = JSON.parse(window.localStorage.getItem('admin-info'));
    },
    computed:{
        showInfo() {
            return $array.show(this.receiptDetail, this.currentPage, this.currentEntries)
        },
        showPagination() {
            return $array.pagination(this.allPages, this.currentPage, 2)
        }
    },
    methods: {
        // เรียกข้อมูล
        async getReceiptData(){
            this.progress = true;
            await axios.get('api/receipt')
                .then(async(response)=>{
                    this.receiptDetail = [];
                    this.receiptDetail = response.data
                    await this.receiptDetail.sort(function(a,b) { return b.receipt_id - a.receipt_id }); // เรียงลำดับจากเลขที่ใบเสร็จ ใหม่ล่าสุด
                    this.filteredEntries = $array.paginate(this.receiptDetail, this.currentPage, this.currentEntries)
                    this.allPages = $array.pages(this.receiptDetail, this.currentEntries)
                    this.progress = false;
                })
                .catch((error)=>{
                    console.error(error);
                    this.progress = false;
                })
        },
        async reloadPage(){
            this.progress = true;
            await this.getReceiptData();
            await this.paginateEntries();
            this.progress = false;
        },
        paginateEntries() {
            this.filteredEntries = $array.paginate(this.receiptDetail, this.currentPage, this.currentEntries)
        },
        paginateEvent(page) {
            this.currentPage = page
            this.paginateEntries()
        },
        //format วันที่
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY')
        },
        formatTime(date){
            return moment(date).format('HH:MM')
        },
        // ค้นหา
        searchMonth(){
            let temp = [];
            this.receiptDetail.forEach((items, index, arr)=>{
                if(items.paydate.substring(0,7) == this.searchByMonth){
                    temp.push( this.receiptDetail[index] );
                }
            })
            this.receiptDetail = temp;
            this.filteredEntries = $array.paginate(this.receiptDetail, this.currentPage, this.currentEntries);
            this.allPages = $array.pages(this.receiptDetail, this.currentEntries);
        },
        deleteReceipt(id){
            this.progress = true;
            let config = {
                method : 'delete',
                url : `api/receipt/deletebyid/` + id,
                headers : { }
            }
            let indexOfArrayItem = this.receiptDetail.findIndex(i => i.receipt_id === id)
            if(confirm('ต้องการลบใบเสร็จเลขที่ ' + id + " ใช่หรือไม่?")){
                axios(config)
                    .then((response)=>{
                        if(response.status == 200){
                            this.progress = false;
                            this.receiptDetail.splice(indexOfArrayItem, 1);
                        }
                        this.reloadPage();
                    })
                    .catch((error)=>{
                        console.error(error);
                        this.progress = false;
                        this.reloadPage();
                    })
            }
            this.progress = false;
        },
        deleteAll(){
            this.progress = true;
            let config = {
                method : 'delete',
                url : 'api/receipt/deleteall',
                headers : { }
            }
            if(confirm('คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่')){
                axios(config)
                    .then((response)=>{
                        if(response.status == 200){
                            this.progress = false;
                        }
                        this.reloadPage();
                    })
                    .catch((error)=>{
                        console.error(error);
                        this.progress = false;
                        this.reloadPage();
                    })
            }
        },
        //ข้อมูลใบเสร็จ
        getReceiptDetail(id){
            let receiptData = {};
            this.togglePrint = true;
            this.receiptDetail.forEach((v,i) => {
                if(v.receipt_id == id){
                    receiptData = this.receiptDetail[i]
                }
            })
            this.printReceiptData = receiptData;
        },
        print() {
            const prtHtml = document.getElementById('receipt').innerHTML;
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }

            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

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
        printOnMobile(){
            window.print();
        },
        //วันที่ปัจจุบัน
        nowDate() {
            let date = new Date();
            return moment(date).format("DD/MM/YYYY")
        },
        //เวลาปัจจบัน
        getTime() {
            let date = new Date();
            return moment(date).format("hh:mm");
        },
        period(value) {
            let periodMM = moment(value).format("MM");
            let periodYYYY = moment(value).format("YYYY");
            let months = ["มกราคม", "กุมพาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            let my = {
                mm: months[periodMM - 1],
                yy: Number(periodYYYY) + 543
            };
            return my.mm + '/' + my.yy;
        }
    },
}
</script>