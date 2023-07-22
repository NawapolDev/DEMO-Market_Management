
const express=require('express')
const router = express.Router()
let receiptController = require(`../../controller/receiptController.js`);

//เชียนเป็นmvc
router.get("/", async (req, res) => { 
    let rusult = await receiptController.getreceipt(req)
    res.json(rusult);
});






router.post("/insert/:id", async (req, res) => { 
    res.status(200);
    let rusult = await receiptController.insertreceipt(req.body,req.params.id)
    res.json(rusult);
});






router.delete("/deletebyid/:id", async (req, res) => {  
  res.status(200);
  let result = await receiptController.deletereceiptbyid(req.params.id);
  res.json(result);
  });

//ลบทั้งหมด
router.delete("/deleteall", async (req, res) => {
	res.status(200);
	let result = await receiptController.deletereceiptall(req);
	res.json(result);
  });


 










module.exports =  router