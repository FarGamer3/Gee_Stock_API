var express = require('express');
var router = express.Router();
const api_manage_emp= require("../controllers/api_manage_emp");
const api_supplier= require("../controllers/api_supplier");



// EMP Route 
router.get('/All/Employee', api_manage_emp.select_all_emp);
router.post('/Employee/With/ID', api_manage_emp.select_emp_with_id);
router.post('/Insert/Emp', api_manage_emp.insert_employee);
router.put('/Update/Emp', api_manage_emp.update_employee)
router.delete('/Delete/Emp', api_manage_emp.delete_employee);

// Supplier Route
router.get('/All/Supplier', api_supplier.select_all_supplier);
router.post('/Supplier/With/ID', api_supplier.select_supplier_with_id);
// router.post('/Insert/Supplier', api_supplier.insert_supplier);
// router.put('/Update/Supplier', api_supplier.update_supplier);
// router.delete('/Delete/Supplier', api_supplier.delete_supplier);

module.exports = router;
