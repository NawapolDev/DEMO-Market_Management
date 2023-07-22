const knex = require(`../db`);
const db = knex.db;




async function getmarket(req){
  return await db('tb_market as mk')
  .select(
    // 'lock_id',
    // 'lock_name',
    // 'cm.cus_id',
    // 'cm.cus_name',
    // 'cm.cus_typeproduct',
    // 'cus_type',
    // 'sizelock',
    // 'pricelock',
    // 'status',
    '*'
    )
  // .leftJoin('tb_customer as cm',function(){
  //   this.on('cm.cus_id', '=', 'mk.cus_id')
      
  // })
}

async function getmarketbyid(id){  
  return await db('tb_market as mk')
  .select(
    // 'lock_id',
    // 'lock_name',
    // 'cm.cus_id',
    // 'cm.cus_name',
    // 'cm.cus_typeproduct',
    // 'cus_type',
    // 'sizelock',
    // 'pricelock',
    // 'status',
    '*'
    )
  // .leftJoin('tb_customer as cm',function(){
  //   this.on('cm.cus_id', '=', 'mk.cus_id')   
  // })
    .where("lock_id","=",id)
}



async function insertmarket(req) {
  //เขียนเช็คการมีอยู่ของ cus_id
    return await db(`tb_market`)
     .insert({

      lock_name: req.lock_name,
      sizelock: req.sizelock,
      pricelock: req.pricelock
     })
     .then(function(response){ console.log(`INSERT SUCCESS LOCK ${response}`); return {status:true,responseID:response}; }
     )
     .catch((error) => {
       console.log(`THIS IS TROWE ERROR  : ${error}`);
     });
 }


 async function updatemarket(id,req) {
      // if (req.cus_name==''|| req.cus_name==null) {
      //   var Cstatus=0
      // }else{
      //   var Cstatus=1
      // }
    return await db(`tb_market`)
      .where('lock_id','=',id)
      .update({     
        lock_name: req.lock_name,
        sizelock: req.sizelock,
        pricelock: req.pricelock,
        // cus_name:req.cus_name,
        // cus_tel: req.cus_tel,
        // cus_typeproduct: req.cus_typeproduct,
        // status: Cstatus,
        
        
      })
      .then(function(response){ console.log(`UPDATE SUCCESS LOCK ${response}`); return {'status':true,'message':'UPDATE LOCK SUCCESS'} }
      )
      .catch((error) => {
        console.log(`POST ERROR PTTYPE  : ${error}`);
      });
  }

  

  
  // async function insertcustemrent(id,req) {
  //   return await db(`tb_market`)
  //     .where('lock_id','=',id)
  //     .update({     
  //       custem_name: req.custem_name,
  //       custem_tel: req.custem_tel,
  //       custem_typeproduct: req.custem_typeproduct
        
  //     })
  //     .then(function(response){ console.log(`UPDATE SUCCESS CUSTENRENT ${response}`); return {'status':true,'message':'UPDATE CUTEMNRENT SUCCESS'} }
  //     )
  //     .catch((error) => {
  //       console.log(`POST ERROR PTTYPE  : ${error}`);
  //     });
  // }
  //leave




  async function deletemarket(id) {
 
     return await db(`tb_market`)
     .where('lock_id', '=', id)
     .del()
    .then((response)=>{return {status:true,message:'DELETE LOCK SUCCRESS',response:response} })
    .catch((error) => {console.log(`ERROR LOGS : ${error}`);});

     }
     
 


module.exports={
  getmarket,getmarketbyid,insertmarket,updatemarket,deletemarket
};