const mysql = require('mysql');
require("dotenv").config();
const connection_final= require("../components/connection_final");



//*************************************** Province **********************************************
exports.select_all_province = (req, res, next) => {
        try {
            connection_final.query(
                'SELECT * FROM province',
                [],
                (err, results, fields) => {
                    if (err) {
                        console.log("Error select data from the database", err);
                        return res.status(400).send();
                    } else {
                        let _allProvince = results
                        res.status(200).json({
                            "result_code": "200",
                            "result": "Success",
                            "user_info": _allProvince,
                        });
                    }
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }

exports.select_province_with_id = (req, res, next) => {
        let _data = req.body;
        let _province_name = _data.province_name;

    if (typeof _province_name != 'undefined') {
        try {
            connection_final.query(
               'SELECT * FROM province where province_name = ?',
                [_province_name],
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
    }
    }

    //*************************************** district **********************************************

    exports.select_all_district = (req, res, next) => {
        try {
            connection_final.query(
                'SELECT * FROM district',
                [],
                (err, results, fields) => {
                    if (err) {
                        console.log("Error select data from the database", err);
                        return res.status(400).send();
                    } else {
                        let _alldistrict = results
                        res.status(200).json({
                            "result_code": "200",
                            "result": "Success",
                            "user_info": _alldistrict,
                        });
                    }
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }

    exports.select_district_with_id = (req, res, next) => {
        let _district_name = req.body.district_name || req.query.district_name;
    
        if (_district_name) {
            try {
                connection_final.query(
                    'SELECT district_name FROM district WHERE district_name LIKE ?',
                    [`%${_district_name}%`], // ใช้ LIKE เพื่อค้นหาชื่อที่คล้ายกัน
                    (err, results) => {
                        if (err) {
                            console.log("Error select data from the database", err);
                            return res.status(400).json({ "result": "Database Error" });
                        } else if (results.length === 0) {
                            return res.status(404).json({ "result": "No Data Found" });
                        } else {
                            res.status(200).json({
                                "result_code": "200",
                                "result": "Success",
                                "user_info": results,
                            });
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                return res.status(500).json({ "result": "Server Error" });
            }
        } else {
            res.status(400).json({ "result": "Incorrect Parameter" });
        }
    };
    
    //*************************************** Village **********************************************
    
    exports.select_all_village = (req, res, next) => {
        try {
            connection_final.query(
                'SELECT * FROM village',
                [],
                (err, results, fields) => {
                    if (err) {
                        console.log("Error select data from the database", err);
                        return res.status(400).send();
                    } else {
                        let _allVillage = results
                        res.status(200).json({
                            "result_code": "200",
                            "result": "Success",
                            "user_info": _allVillage,
                        });
                    }
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }


    exports.select_village_with_id = (req, res, next) => {
        let _village_name = req.body.village_name || req.query.village_name;
    
        if (_village_name) {
            try {
                connection_final.query(
                    'SELECT * FROM village WHERE village_name LIKE ?',
                    [`%${_village_name}%`], // ใช้ LIKE เพื่อค้นหาชื่อที่คล้ายกัน
                    (err, results) => {
                        if (err) {
                            console.log("Error select data from the database", err);
                            return res.status(400).json({ "result": "Database Error" });
                        } else if (results.length === 0) {
                            return res.status(404).json({ "result": "No Data Found" });
                        } else {
                            res.status(200).json({
                                "result_code": "200",
                                "result": "Success",
                                "user_info": results,
                            });
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                return res.status(500).json({ "result": "Server Error" });
            }
        } else {
            res.status(400).json({ "result": "Incorrect Parameter" });
        }
    };


    exports.insert_village = (req, res, next) => {
        let { village_name, district_name } = req.body;
    
        if (!village_name || !district_name) {
            return res.status(400).json({ "result": "Missing required parameters" });
        }
    
        console.log("Received district_name:", district_name); // ตรวจสอบค่าที่รับมา
    
        try {
            connection_final.query(
                'SELECT district_id FROM district WHERE district_name LIKE ?',
                [`%${district_name}%`], // ใช้ LIKE เพื่อค้นหาแบบยืดหยุ่น
                (err, results) => {
                    if (err) {
                        console.log("Error selecting district_id", err);
                        return res.status(400).json({ "result": "Database Error" });
                    }
                    if (results.length === 0) {
                        return res.status(404).json({ "result": "District Not Found" });
                    }
    
                    let district_id = results[0].district_id;
    
                    connection_final.query(
                        'INSERT INTO village (village_name, district_id) VALUES (?, ?)',
                        [village_name, district_id],
                        (err, insertResults) => {
                            if (err) {
                                console.log("Error inserting village", err);
                                return res.status(400).json({ "result": "Database Error" });
                            }
    
                            res.status(201).json({
                                "result_code": "201",
                                "result": "Insert Village Success",
                                "inserted_id": insertResults.insertId,
                            });
                        }
                    );
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ "result": "Server Error" });
        }
    };

    

    exports.update_village = (req, res, next) => {
        let { village_name, district_name, village_id } = req.body;  // Get data from request body
    
        if (!village_name || !district_name || !village_id) {
            return res.status(400).json({ "result": "Missing required parameters" });
        }
    
        console.log("Received data:", village_name, district_name, village_id); // Debug log
    
        try {
            // Step 1: Find district_id based on district_name
            connection_final.query(
                'SELECT district_id FROM district WHERE district_name LIKE ?',
                [`%${district_name}%`], // Using LIKE for flexible search
                (err, results) => {
                    if (err) {
                        console.log("Error finding district_id", err);
                        return res.status(400).json({ "result": "Database Error" });
                    }
                    if (results.length === 0) {
                        return res.status(404).json({ "result": "District Not Found" });
                    }
    
                    let district_id = results[0].district_id;
    
                    // Step 2: Update the village with new name and district_id
                    connection_final.query(
                        'UPDATE village SET village_name = ?, district_id = ? WHERE village_id = ?',
                        [village_name, district_id, village_id],
                        (err, updateResults) => {
                            if (err) {
                                console.log("Error updating village", err);
                                return res.status(400).json({ "result": "Database Error" });
                            }
    
                            if (updateResults.affectedRows === 0) {
                                return res.status(404).json({ "result": "Village Not Found" });
                            }
    
                            res.status(200).json({
                                "result_code": "200",
                                "result": "Edit Village Success",
                                "affected_rows": updateResults.affectedRows,
                            });
                        }
                    );
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ "result": "Server Error" });
        }
    };
    

    exports.delete_village = (req, res, next) => {
        let { village_id } = req.body;  // Get the village_id from the request body
    
        if (!village_id) {
            return res.status(400).json({ "result": "Missing village_id parameter" });
        }
    
        console.log("Received village_id:", village_id); // Debug log to check received village_id
    
        try {
            // Step 1: Delete the village based on village_id
            connection_final.query(
                'DELETE FROM village WHERE village_id = ?',
                [village_id],
                (err, results) => {
                    if (err) {
                        console.log("Error deleting village", err);
                        return res.status(400).json({ "result": "Database Error" });
                    }
    
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ "result": "Village Not Found" });
                    }
    
                    res.status(200).json({
                        "result_code": "200",
                        "result": "Delete Success",
                        "affected_rows": results.affectedRows,
                    });
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ "result": "Server Error" });
        }
    };
    
    