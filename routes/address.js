var express = require('express');
var router = express.Router();
const connection_final= require("../components/connection_final");
const api_address= require("../controllers/api_address");



// Province Route 
router.get('/All/Province', api_address.select_all_province);
router.post('/With/ID/Province', api_address.select_province_with_id);

// District Route
router.get('/All/District', api_address.select_all_district);
router.post('/With/ID/District', api_address.select_district_with_id);

// Village Route
router.get('/All/Village', api_address.select_all_village);
router.post('/With/ID/Village', api_address.select_village_with_id);
router.post('/Insert/Village', api_address.insert_village);
router.put('/Update/Village', api_address.update_village);
router.delete('/Delete/Village', api_address.delete_village);




module.exports = router;