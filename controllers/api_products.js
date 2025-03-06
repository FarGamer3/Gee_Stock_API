const mysql = require('mysql');
require("dotenv").config();
const connection_final= require("../components/connection_final");


//************************************************** Category ************************************************************
exports.select_all_category = (req, res, next) => {
    try {
        connection_final.query(
            'SELECT * FROM category',
            [],
            (err, results, fields) => {
                if (err) {
                    console.log("Error select data from the database", err);
                    return res.status(400).send();
                } else {
                    let _allCategory = results
                    res.status(200).json({
                        "result_code": "200",
                        "result": "Success",
                        "user_info": _allCategory,
                    });
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.select_category_with_id = (req, res, next) => {
    let _data = req.body;
    let _category = _data.category;

if (typeof _category != 'undefined') {
    try {
        connection_final.query(
           'SELECT * FROM category where category = ?',
            [_category],
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


exports.insert_category = (req, res, next) => {
    let { category } = req.body;

    if (!category) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    try {
                connection_final.query(
                    'INSERT INTO category (category) VALUES (?)',
                    [category],
                    (err, insertResults) => {
                        if (err) {
                            console.log("Error inserting category", err);
                            return res.status(400).json({ "result": "Database Error" });
                        }

                        res.status(201).json({
                            "result_code": "201",
                            "result": "Insert Success",
                            "inserted_id": insertResults.insertId,
                        });
                    }
                );
            }
        catch (err) {
            console.log(err);
            return res.status(500).json({ "result": "Server Error" });
    }
};

exports.update_category = (req, res, next) => {
    let { category, cat_id } = req.body;  // Get data from request body

    if (!category || !cat_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    console.log("Received data:", category, cat_id); // Debug log

    try {
                
                connection_final.query(
                    'UPDATE category SET category = ? WHERE cat_id = ?',
                    [category, cat_id],
                    (err, updateResults) => {
                        if (err) {
                            console.log("Error updating category", err);
                            return res.status(400).json({ "result": "Database Error" });
                        }

                        if (updateResults.affectedRows === 0) {
                            return res.status(404).json({ "result": "category Not Found" });
                        }

                        res.status(200).json({
                            "result_code": "200",
                            "result": "Update Success",
                            "affected_rows": updateResults.affectedRows,
                        });
                    }
                );
            }
        
    catch (err) {
        console.log(err);
        return res.status(500).json({ "result": "Server Error" });
    }
};


exports.delete_category = (req, res, next) => {
    let { cat_id } = req.body;  // Get data from request body

    if (!cat_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    console.log("Received data:", cat_id); // Debug log

    try {
                
                connection_final.query(
                    ' DELETE FROM category WHERE cat_id = ?',
                    [cat_id],
                    (err, updateResults) => {
                        if (err) {
                            console.log("Error updating category", err);
                            return res.status(400).json({ "result": "Database Error" });
                        }

                        if (updateResults.affectedRows === 0) {
                            return res.status(404).json({ "result": "category Not Found" });
                        }

                        res.status(200).json({
                            "result_code": "200",
                            "result": "Delete Success",
                            "affected_rows": updateResults.affectedRows,
                        });
                    }
                );
            }
        
    catch (err) {
        console.log(err);
        return res.status(500).json({ "result": "Server Error" });
    }
};

//************************************************** Brand ************************************************************


exports.select_all_brand = (req, res, next) => {
    try {
        connection_final.query(
            'SELECT * FROM brand',
            [],
            (err, results, fields) => {
                if (err) {
                    console.log("Error select data from the database", err);
                    return res.status(400).send();
                } else {
                    let _allBrand = results
                    res.status(200).json({
                        "result_code": "200",
                        "result": "Success",
                        "user_info": _allBrand,
                    });
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.select_brand_with_id = (req, res, next) => {
    let _data = req.body;
    let _brand = _data.brand;
    
if (typeof _brand != 'undefined') {
    try {
        connection_final.query(
            'SELECT * FROM brand where brand = ?',
            [_brand],
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

exports.insert_brand = (req, res, next) => {
    let { brand } = req.body;
    
    if (!brand) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    try {
        connection_final.query(
            'INSERT INTO brand (brand) VALUES (?)',
            [brand],
            (err, insertResults) => {
                if (err) {
                    console.log("Error inserting brand", err);
                    return res.status(400).json({ "result": "Database Error" });
                }

                res.status(201).json({
                    "result_code": "201",
                    "result": "Insert Success",
                    "inserted_id": insertResults.insertId,
                });
            }
        );
    }
catch (err) {
    console.log(err);
    return res.status(500).json({ "result": "Server Error" });
}
};

exports.update_brand = (req, res, next) => {
    let { brand, brand_id } = req.body;  // Get data from request body
    
    if (!brand ||!brand_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }
    
    console.log("Received data:", brand, brand_id); // Debug log

    try {
                
                connection_final.query(
                    'UPDATE brand SET brand = ? WHERE brand_id = ?',
                    [brand, brand_id],
                    (err, updateResults) => {
                        if (err) {
                            console.log("Error updating brand", err);
                            return res.status(400).json({ "result": "Database Error" });
                        }

                        if (updateResults.affectedRows === 0) {
                            return res.status(404).json({ "result": "brand Not Found" });
                        }

                        res.status(200).json({
                            "result_code": "200",
                            "result": "Update Success",
                            "affected_rows": updateResults.affectedRows,
                        });
                    }
                );
            }
        
    catch (err) {
        console.log(err);
        return res.status(500).json({ "result": "Server Error" });
    }
};

exports.delete_brand = (req, res, next) => {
    let { brand_id } = req.body;  // Get data from request body
    
    if (!brand_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }
    
    console.log("Received data:", brand_id); // Debug log

    try {
                
        connection_final.query(
            ' DELETE FROM brand WHERE brand_id = ?',
            [brand_id],
            (err, updateResults) => {
                if (err) {
                    console.log("Error updating brand", err);
                    return res.status(400).json({ "result": "Database Error" });
                }

                if (updateResults.affectedRows === 0) {
                    return res.status(404).json({ "result": "brand Not Found" });
                }

                res.status(200).json({
                    "result_code": "200",
                    "result": "Delete Success",
                    "affected_rows": updateResults.affectedRows,
                });
            }
        );
    }

catch (err) {
console.log(err);
return res.status(500).json({ "result": "Server Error" });
}
};

//************************************************** Zone ************************************************************


exports.select_all_zone = (req, res, next) => {
    try {
        connection_final.query(
            'SELECT * FROM zone',
            [],
            (err, results, fields) => {
                if (err) {
                    console.log("Error select data from the database", err);
                    return res.status(400).send();
                } else {
                    let _allZone = results
                    res.status(200).json({
                        "result_code": "200",
                        "result": "Success",
                        "user_info": _allZone,
                    });
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

 exports.select_zone_with_id = (req, res, next) => {
    let _data = req.body;
    let _zone = _data.zone;
    
if (typeof _zone!= 'undefined') {
    try {
        connection_final.query(
            'SELECT * FROM zone where zone = ?',
            [_zone],
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

exports.insert_zone = (req, res, next) => {
    let { zone, zone_detail } = req.body;
    
    if (!zone ||!zone_detail) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    try {
        connection_final.query(
            'INSERT INTO zone (zone, zone_detail) VALUES (?,?)',
            [zone,zone_detail],
            (err, insertResults) => {
                if (err) {
                    console.log("Error inserting zone", err);
                    return res.status(400).json({ "result": "Database Error" });
                }

                res.status(201).json({
                    "result_code": "201",
                    "result": "Insert Success",
                    "inserted_id": insertResults.insertId,
                });
            }
        );
    }
catch (err) {
    console.log(err);
    return res.status(500).json({ "result": "Server Error" });
}
};

exports.update_zone = (req, res, next) => {
    let { zone, zone_detail, zone_id } = req.body;  // Get data from request body
    
    if (!zone || !zone_detail || !zone_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }

    try {
                
        connection_final.query(
            'UPDATE zone SET zone = ?, zone_detail=? WHERE zone_id = ?',
            [zone, zone_detail, zone_id],
            (err, updateResults) => {
                if (err) {
                    console.log("Error updating zone", err);
                    return res.status(400).json({ "result": "Database Error" });
                }

                if (updateResults.affectedRows === 0) {
                    return res.status(404).json({ "result": "zone Not Found" });
                }

                res.status(200).json({
                    "result_code": "200",
                    "result": "Update Success",
                    "affected_rows": updateResults.affectedRows,
                });
            }
        );
    }

catch (err) {
console.log(err);
return res.status(500).json({ "result": "Server Error" });
}
};

exports.delete_zone = (req, res, next) => {
    let { zone_id } = req.body;  // Get data from request body
    
    if (!zone_id) {
        return res.status(400).json({ "result": "Missing required parameters" });
    }
    
    console.log("Received data:", zone_id); // Debug log

    try {
                
        connection_final.query(
            'DELETE FROM zone WHERE zone_id = ?',
            [zone_id],
            (err, updateResults) => {
                if (err) {
                    console.log("Error updating zone", err);
                    return res.status(400).json({ "result": "Database Error" });
                }
                
                if (updateResults.affectedRows === 0) {
                    return res.status(404).json({ "result": "zone Not Found" });
                }
                
                res.status(200).json({
                    "result_code": "200",
                    "result": "Delete Success",
                    "affected_rows": updateResults.affectedRows,
                });
            }
        );
    }   catch(err) {
        console.log(err);
        return res.status(500).json({ "result": "Server Error" });
    }
};



