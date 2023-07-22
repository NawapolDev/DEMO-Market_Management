const knex = require(`../db`);
const db = knex.db;
var moment = require('moment');




async function getreceipt(req){
      return await db('tb_receipt').select('*')
}





// async function getadminlogin(req){  
//   return await db('tb_admin')
//   .select('*')
//   .where("admin_username","=",req.admin_username)
//   .where("admin_password","=",req.admin_password)
// }

async function insertreceipt(req, id, ) {
  // console.log('suc')
  //   console.log(custem_name)
  //  return {message:`success recipt`}
   await db(`tb_receipt`)
     .insert({

      cusalltyp: req.cus_name,

        totalmoney: req.totalmoney,
        lockname: req.lockname,
        qrnumber: req.qrnumber,
        paydate:moment().format("YYYY-MM-DD hh:mm:ss"),
        custype:'0'
        
     })
     .then(function(response){ console.log(`INSERT SUCCESS RECEIPT ${response}`); return {status:true,responseID:response}; }
    
     )
     .catch((error) => {
       console.log(`THIS IS TROWE ERROR  : ${error}`);
     });


   await  db(`tb_market`)
   
    // .select('*') 
    .where('lock_id','=',id)
    .update({
      status: "2",
     
     

    })
    .then(function (response) { console.log(`UPDATE STATUS  DID PAY ${response}`); return { 'status': true, 'message': 'UPDATE STATUS  DID PAY SUCCESS' } }
    )
    .catch((error) => {
      console.log(`POST ERROR PTTYPE  : ${error}`);
    });



    let receipt_id = await db('tb_receipt')
    .select('*')
    .orderBy('receipt_id', 'desc')
    .first()
    
    return  {status:true,receiptrow:receipt_id.receipt_id} 
 }

//  async function updatestatuspayment(req) {

//     return await db(`tb_market`).update({

//         sta
//     }).where('id=')



//  }



async function deletereceiptbyid(id) {
 
    return await db(`tb_receipt`)
    .where('receipt_id',id)
    .del()
    
   .then((response)=>{return {status:true,message:'DELETE ADMIN SUCCRESS',response:response} })
   .catch((error) => {console.log(`ERROR LOGS : ${error}`);});

    }


  async function deletereceiptall(id) {
 
     return await db(`tb_receipt`)
    
     .del()
     
     
    .then((response)=>{return {status:true,message:'DELETE ADMIN SUCCRESS',response:response} })
    .catch((error) => {console.log(`ERROR LOGS : ${error}`);});

     }
     
 

    //  updatestatuspayment
module.exports={
    getreceipt,insertreceipt,deletereceiptall,deletereceiptbyid
};