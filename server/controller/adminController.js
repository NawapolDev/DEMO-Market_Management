const knex = require(`../db`);
const db = knex.db;




async function getadmin(req){
      return await db('tb_admin').select('*')
}

async function getadminbyid(id){  
    return await db('tb_admin')
    .select('*')
    .where("admin_id","=",id)
}

async function getadminlogin(req){  
  result= await db('tb_admin')
  .select('*')
  .where("admin_username","=",req.admin_username)
  .where("admin_password","=",req.admin_password)
  if (result.length>0) {
    return {status:true,message:'รหัสผ่านผ่านถูกต้องloginได้'}
  }else{
    return {status:false,message:'รหัสผ่านผิด'}
  }
}

async function insertadmin(req) {
    return await db(`tb_admin`)
     .insert({

        admin_username: req.admin_username,
        admin_password: req.admin_password,
     })
     .then(function(response){ console.log(`INSERT SUCCESS ADMIN ${response}`); return {status:true,responseID:response}; }
     )
     .catch((error) => {
       console.log(`THIS IS TROWE ERROR  : ${error}`);
     });
 }


 async function updateadmin(id,req) {
    return await db(`tb_admin`)
      .where('admin_id','=',id)
      .update({     
        admin_username: req.admin_username,
        admin_password: req.admin_password,
        
      })
      .then(function(response){ console.log(`UPDATE SUCCESS ADMIN ${response}`); return {'status':true,'message':'UPDATE ADMIN SUCCESS'} }
      )
      .catch((error) => {
        console.log(`POST ERROR PTTYPE  : ${error}`);
      });
  }

  async function deleteadmin(id) {
 
     return await db(`tb_admin`)
     .where('admin_id', '=', id)
     .del()
    .then((response)=>{return {status:true,message:'DELETE ADMIN SUCCRESS',response:response} })
    .catch((error) => {console.log(`ERROR LOGS : ${error}`);});

     }
     
 


module.exports={
    getadmin,getadminbyid,insertadmin,updateadmin,deleteadmin,getadminlogin
};