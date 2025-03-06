const mysql = require('mysql');
require("dotenv").config();
// const bcrypt = require("bcrypt");
const connection_final= require("../components/connection_final");

exports.select_all_supplier = (req, res, next) => {
        try {
            connection_final.query(
                'SELECT * FROM supplier',
                [],
                (err, results, fields) => {
                    if (err) {
                        console.log("Error select data from the database", err);
                        return res.status(400).send();
                    } else {
                        let _allUser = results
                        res.status(200).json({
                            "result_code": "200",
                            "result": "Success",
                            "user_info": _allUser,
                        });
                    }
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }


exports.select_supplier_with_id = (req, res, next) => {
    let _data = req.body;
    let _sup_name = _data.sup_name;
    
if (typeof _sup_name!= 'undefined') {
    try {
        connection_final.query(
            'SELECT * FROM supplier where sup_name = ?',
            [_sup_name],
            (err, results, fields) => {
                if (err) {
                    console.log("Error select data from the database", err);
                    return res.status(400).send();
                } else {
                    let _userInfo = results
                    res.status(200).json({
                        "result_code": "200",
                        "result": "Success",
                        "user_info": _userInfo,
                    });
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
} else {
    res.status(404).json({ "result": "Incorrect Parameter" });
}}