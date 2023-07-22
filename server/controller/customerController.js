const knex = require(`../db`);
const db = knex.db;
var receipt = require('./receiptController')
const moment = require('moment');


async function insertcusrent(id, req) {
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
  return await db(`tb_market`)
    .where('lock_id', '=', id)
    .update({
      cus_name: req.cus_name,
      cus_tel: req.cus_tel,
      cus_typeproduct: req.cus_typeproduct,
      qrnumber: req.qrnumber,
      status:  '1',
      paydate: startOfMonth,

    })
    .then(function (response) { console.log(`INSERT SUCCESS CUSRENT ${response}`); return { 'status': true, 'message': 'INSERT CUSNRENT SUCCESS' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}


async function updatecusrent(id, req) {
  return await db(`tb_market`)
    .where('lock_id', '=', id)
    .update({
      cus_name: req.cus_name,
      cus_tel: req.cus_tel,
      cus_typeproduct: req.cus_typeproduct,
     
     

    })
    .then(function (response) { console.log(`INSERT SUCCESS CUSRENT ${response}`); return { 'status': true, 'message': 'INSERT CUSNRENT SUCCESS' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}


//เพิ่มขาจร
async function insertcustemrent(id, req) {
  // let  xxx =await receipt.insertreceipt(req.custem_name)
    db(`tb_market`)
    .where('lock_id', '=', id)
    .update({
      custem_name: req.custem_name,
      custem_tel: req.custem_tel,
      custem_typeproduct: req.custem_typeproduct,
   

    })
    .then(function (response) { console.log(`INSERT SUCCESS CUSTEMRENT ${response}`); return { 'status': true, 'message': 'INSERT CUTEMNRENT SUCCESS' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });

    db(`tb_receipt`)
     .insert({

        
        totalmoney: req.totalmoney,
        cusalltyp: req.custem_name,
        lockname: req.lockname,
        paydate:moment().format("YYYY-MM-DD hh:mm:ss"),
        custype:'1'
        
     })
     .then(function(response){ console.log(`INSERT SUCCESS RECEIPT ${response}`); return {status:true,responseID:response}; }
    
     )
     .catch((error) => {
       console.log(`THIS IS TROWE ERROR  : ${error}`);
     });
    
    return  {message:`success insert custem and pay recipt`}

}


//เที่ยงคืนจะลบเอง ขาจร
async function deletcustemrent(id, req) {
    console.log('form deletcustemrent')
    
  return await db(`tb_market`)
      
      .update({
        custem_name: '',
        custem_tel: '',
        custem_typeproduct: '',
      })    
}

//loginbytel
async function loginbytel(req){  
   result=await db('tb_market as mk')
  .select('*')

    .where("cus_tel","=",req.cus_tel)
  // console.log(result.length)
    if (result.length>0) {
      return {message:"เบอร์โทรถูกต้องเข้าสู่ระบบได้",status:true}
    }else{
      return {message:"คุณไม่ได้กรอกเบอร์โทรที่ลงทะเบียนไว้",status:false}
    }
    
}



async function cusleave(id,req) {
  return await db(`tb_market`)
    .where('cus_tel','=',id)
    .update({          
    leave: 1,

      
    })
    .then(function(response){ console.log(`UPDATE SUCCESS CUSTENRENT LEAVE ${response}`); return {'status':true,'message':'UPDATE LEAVE CUTEMNRENT SUCCESS'} }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}

//เที่ยงคืน รีเซ็ท ลาไม่มา
async function resetleave(id, req) {
return await db(`tb_market`)
    
    .update({
      leave: '0',
    })    
}


//ลบผู้เช่า
async function deletecusrent(id,req) {
  return await db(`tb_market`)
    .where('lock_id','=',id)
    .update({     
      cus_name: '',
      cus_tel: '',
      cus_typeproduct: '',
      qrnumber: '',
      status:'0',
      leave: '0'
      
    })
    .then(function(response){ console.log(`DELETE SUCCESS CUSRENT ${response}`); return {'status':true,'message':'DELETE CUNRENT SUCCESS'} }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}


async function payrent(){
 
  let today = moment().format('DD');
  if (today=='01') {
    return await db(`tb_market`)
    .where('status','=','2')
    .update({
      status:'1'
    }).then(function(response){ console.log(`RESET PAYRENT SUCCESS ${response}`); return {'status':true,'message':'RESET PAYRENT SUCCESS'} }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
  }else{
    return
  }
  
}

async function deletecustomerlate(){
  let today = moment().format('DD');
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
  if (today!='01'||today!='02'||today!='03'||today!='04'||today!='05'||today!='06'||today!='07'||today!='08'||today!='09'||today!='10') {
    return await db(`tb_market`)
  .where('status','=','3')
  .update({
    cus_name:'',
    cus_tel:'',
    cus_typeproduct: '',
    status:'0',
    paydate:startOfMonth,

  }).then(function(response){ console.log(`DELETE PAY LAYE SUCCESS ${response}`); return {'status':true,'message':'DELETE PAY LATE SUCCESS'} }
  )
  .catch((error) => {
    console.log(`POST ERROR PTTYPE  : ${error}`);
  });
  }else{
    return
  }
  
}



//apiทุกวันที่1ยิงไปเอาวันแรกของเดือน
async function firstdaypay(id, req) {
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
  return await db(`tb_market`)
    .update({
      paydate: startOfMonth,

    })
    .then(function (response) { console.log(` SUCCESS RESET FIRST DATE ${response}`); return { 'status': true, 'message': 'SUCCESS RESET FIRST DATE' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}





//เลื่อนนัด
async function paydate(id, req) {
  return await db(`tb_market`)
    .where('lock_id', '=', id)
    .update({
      paydate: req.paydate,
 
     
     

    })
    .then(function (response) { console.log(` SUCCESS POSEPONE ${response}`); return { 'status': true, 'message': 'SUCCESS POSEPONE' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}

async function paylate(req) {
  return await db(`tb_market`)
    .where('status', '=', '1')
    .update({
      status: '3',


    })
    .then(function (response) { console.log(` SUCCESS CHANGE STATUS ${response}`); return { 'status': true, 'message': 'SUCCESS CHANGE STATUS' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });
}







module.exports = {
  insertcustemrent,deletcustemrent,resetleave,deletecusrent,loginbytel,insertcusrent,cusleave
  ,updatecusrent,payrent,deletecustomerlate,paydate,firstdaypay,paylate
}