
const express=require('express')
const router = express.Router()
let marketController = require(`../../controller/marketController.js`);


router.get("/", async (req, res) => { 
    let rusult = await marketController.getmarket(req)
    res.json(rusult);
});


router.get("/:id", async (req, res) => {
    let rusult = await  marketController.getmarketbyid(req.params.id)
    res.json(rusult);
});





router.post("/", async (req, res) => { 
    res.status(200);
    let rusult = await marketController.insertmarket(req.body)
    res.json(rusult);
});



router.post("/:id", async (req, res) => {
    res.status(200);
    let rusult = await marketController.updatemarket(req.params.id,req.body)
    res.json(rusult);
});







router.delete("/:id", async (req, res) => {  
	res.status(200);
	let result = await marketController.deletemarket(req.params.id);
	res.json(result);
  });










module.exports =  router