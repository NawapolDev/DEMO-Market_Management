<template>
    <div class="max-w-full">
        <div class="max-w-7xl mx-auto my-4 space-y-4 sm:px-6 lg:p-8">
            <div class="bg-white p-2">
                <div class="flex items-between justify-center border-b-2 border-gray-200 pb-2">
                    <div class="grow flex flex-row justify-center items-center gap-4">
                        <i class="font-bold text-2xl fa-sharp fa-solid fa-qrcode"></i>
                        <span class="font-bold text-xl ">สร้าง QR Code</span>
                    </div>
                    <div class="grow-0 flex justify-center items-end">
                        <button @click="printAllQR" class="btn btn-success">พิมพ์ QRcode ทั้งหมด</button>
                    </div>
                </div>
                <div id="Allqrcode">
                    <div class="grid grid-cols-4 p-1 md:p-4 gap-2 md:gap-4">
                        <div @click="getQR(item.qrnumber, item.lock_name)" v-for="item,i in this.marketData" :key="i" class="cursor-pointer flex flex-col justify-center items-center space-y-2 p-2 border rounded-md">
                            <!-- <div id="qrcode" class="overflow-hidden"></div> -->
                            <qrcode-vue class="block object-cover" v-if="item.qrnumber" :value="item.qrnumber" :size="150" level="H" render-as="svg"/>
                            <div class="hidden md:block">_____________________</div>
                            <div class="block text-base">{{ item.lock_name }}</div>
                            <div class="block text-base">{{ item.qrnumber }}</div>
                            <input type="text" id="text" :value="item.qrnumber" class="hidden text-center cursor-pointer" disabled>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Print one QR -->
        <div v-show="toggleprint" class="modal">
            <div class="flex flex-col items-center justify-center min-h-screen text-center">
                <div id="printqrcode" class="w-[250px] h-[300px] bg-white grid p-2">
                    <div class="space-y-1">
                        <table class="table-auto w-full">
                            <tr>
                                <td class="flex justify-center items-center"><qrcode-vue v-if="this.QRvalue" :value="this.QRvalue" :size="200" level="H" render-as="svg"/></td>
                            </tr>
                            <tr>
                                <td class="text-[10px] text-center font-bold whitespace-nowrap">______________________________________</td>
                            </tr>
                            <tr>
                                <td class="text-[20px] text-center font-bold whitespace-nowrap">{{ this.lockname }}</td>
                            </tr>
                            <tr>
                                <td class="text-[20px] text-center font-bold whitespace-nowrap">{{ this.QRvalue }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="flex mt-5 justify-center p-1 gap-2 rounded-md bg-gray-100 w-[250px] rounded-b-md">
                    <div class="grow">
                        <button class="block btn btn-confirm w-full" @click="printQR">พิมพ์ QR Code</button>
                    </div>
                    <div class="grow-0 margin-0">
                        <button class="btn btn-disabled" @click="toggleprint = false"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End print one QR -->
    </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from 'qrcode.vue'

export default {
    name: "QRcodeView",
    components: { QrcodeVue },
    data() {
        return {
            marketData:[],
            qrdata:[],
            progress : false,
            toggleprint:false,
            QRvalue:"",
            lockname:"",
        }
    },
    async mounted() {
        this.progress = true;
        await this.getMarketData();
        this.progress = false;
    },
    methods: {
        async getMarketData() {
            // this.progress = true;
            await axios.get('/api/market')
                .then((response) => {
                    this.marketData = response.data
                })
                .catch(function (error) {
                    console.error(error);
                })
        },
        getQR(value,name){
            this.toggleprint = true;
            this.QRvalue = value;
            this.lockname = name;
        },
        generateQR(){

        },
        printQR(){
            const prtQR = document.getElementById("printqrcode").innerHTML;
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
                ${prtQR}
                </body>
            </html>
            `);
            // WinPrint.document.close();
            WinPrint.focus();
            setTimeout(() => {
                WinPrint.print();
            }, 500);
        },
        printAllQR(){
            const prtQR = document.getElementById("Allqrcode").innerHTML;
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
                ${prtQR}
                </body>
            </html>
            `);
            // WinPrint.document.close();
            WinPrint.focus();
            setTimeout(() => {
                WinPrint.print();
            }, 500);
        },
        check(id){
            console.log(id);
        }
    },
}
</script>