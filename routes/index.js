var express = require('express');
var getJSON = require('get-json');
var mysql = require("mysql");
var router = express.Router();
var env = require("dotenv").config();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/home", function(req, res, next) {
    res.render("home", { title: "Rk Sir-Projects" });
});
router.post("/url", function(req, res, next) {
    console.log("from the url");
    console.log("url: ", req.body.url);
    getJSON(req.body.url, function(error, response) {
        if (error) {
            console.log("there is an error:");
        }

        console.log("response: ", response);
        console.log("response.result: ", response.result);
        console.log("response.ok: ", response.ok);
        console.log("length of the Api Object: ", Object.keys(response.result).length);
        if (response.result) {
            var pool = mysql.createPool({
                host: "localhost",
                user: "root",
                password: "",
                database: "RkSir"
            });
            pool.getConnection(function(err, connection) {
                if (err) {
                    console.log("Unable to connect  dataBase: ");
                } else {
                    var count = 0;
                    var flag = 0;

                    var sortArray = (response.details).sort(function(a, b) {
                        return a.serialnumber - b.serialnumber;
                    });

                    var objArray = new Array();
                    // if (count == 0) {
                    var sql = "select serialnumber,surverdate  from datatable where  id = (select max(id) from datatable)"
                    connection.query(sql, (error, result, fields) => {
                        if (result.length < 1) {
                            (sortArray).forEach(data => {

                                var sql = "INSERT INTO datatable (serialnumber, assesseetype, assesseehousenumber, name, holdingnumber, circlenumber, boroughnumber, zonenumber, wardnumberold, wardnumbernew, buildingfloor,typeofroof,typeoffloor,typesofwalls,holdingstructure,usages,fathername,houseflatname,colonylocalityname,postoffice,roadname, nearestlandmark, district, pin, state, phonenumber, landlinenumber, emailaddress, tenant, waterconnection, aadhaarnumber, electricalconsumernumber, name_ma, fathername_ma, houseflatname_ma, postoffice_ma, coalonyname_ma, roadname_ma, landmark_ma, dist_ma, pin_ma, state_ma, phonenumber_ma, email_ma, latitude, longitude, surverdate, surveyorname_ma) VALUES ?";
                                var values = [
                                    [data.serialnumber, data.assesseetype, data.assesseehousenumber, data.name, data.holdingnumber, data.circlenumber, data.boroughnumber, data.zonenumber, data.wardnumberold, data.wardnumbernew, data.buildingfloor, data.typeofroof, data.typeoffloor, data.typesofwalls, data.holdingstructure, data.usages, data.fathername, data.houseflatname, data.colonylocalityname, data.postoffice, data.roadname, data.nearestlandmark, data.district, data.pin, data.state, data.phonenumber, data.landlinenumber, data.emailaddress, data.tenant, data.waterconnection, data.aadhaarnumber, data.electricalconsumernumber, data.name_ma, data.fathername_ma, data.houseflatname_ma, data.postoffice_ma, data.coalonyname_ma, data.roadname_ma, data.landmark_ma, data.dist_ma, data.pin_ma, data.state_ma, data.phonenumber_ma, data.email_ma, data.latitude, data.longitude, data.surverdate, data.surveyorname_ma]
                                ];

                                connection.query(sql, [values], function(err, result) {
                                    if (err) {
                                        console.log("err: ", err);
                                    } else {
                                        console.log("*********************Data sucessfully Inserted*******************", result);

                                    }
                                });

                            });
                            count++;
                        } else {

                            console.log("result[0] last data: +++++++++++++++++++::: ", result);
                            console.log("result[0] last fields: +++++++++++++++++++::: ", fields);
                            var resultDate = String(result[0].surverdate);
                            console.log("resultDate:after String:  ", resultDate);
                            console.log("split: ", resultDate.split(" "));
                            resultDate = resultDate.split(" ");
                            var newDate = resultDate[3] + "-" + ((result[0].surverdate).getMonth() + 1).length === 1 ? ((result[0].surverdate).getMonth() + 1) : "0" + ((result[0].surverdate).getMonth() + 1) + "-" + resultDate[2] + "T" + resultDate[4];
                            console.log("newDate: ", newDate);

                            console.log("mydb DateResult:Ind ", resultDate[4]);
                            console.log("mydb Date: ", Date.now(resultDate));
                            resultDate = Date.now(resultDate);

                            (sortArray).forEach(data => {
                                var apiDate = "'" + (data.surverdate) + "'";
                                console.log("apidate on timestamp: ", apiDate);
                                console.log("apidate on timestamp: ", Date.now(apiDate));
                                apiDate = Date.now(apiDate);
                                console.log(`data.serialumber: ${data.serialnumber} and  result[0].serialnumber: ${result[0].serialnumber} `);
                                if (apiDate > resultDate) {
                                    flag = 2;
                                    console.log(resultDate);
                                    console.log("______________________________From the If_____________________");
                                    console.log(apiDate);


                                    // objArray.push(data);
                                    // var sql = "INSERT INTO datatable (serialnumber, assesseetype, assesseehousenumber, name, holdingnumber, circlenumber, boroughnumber, zonenumber, wardnumberold, wardnumbernew, buildingfloor,typeofroof,typeoffloor,typesofwalls,holdingstructure,usages,fathername,houseflatname,colonylocalityname,postoffice,roadname, nearestlandmark, district, pin, state, phonenumber, landlinenumber, emailaddress, tenant, waterconnection, aadhaarnumber, electricalconsumernumber, name_ma, fathername_ma, houseflatname_ma, postoffice_ma, coalonyname_ma, roadname_ma, landmark_ma, dist_ma, pin_ma, state_ma, phonenumber_ma, email_ma, latitude, longitude, surverdate, surveyorname_ma) VALUES ?";
                                    // var values = [
                                    //     [data.serialnumber, data.assesseetype, data.assesseehousenumber, data.name, data.holdingnumber, data.circlenumber, data.boroughnumber, data.zonenumber, data.wardnumberold, data.wardnumbernew, data.buildingfloor, data.typeofroof, data.typeoffloor, data.typesofwalls, data.holdingstructure, data.usages, data.fathername, data.houseflatname, data.colonylocalityname, data.postoffice, data.roadname, data.nearestlandmark, data.district, data.pin, data.state, data.phonenumber, data.landlinenumber, data.emailaddress, data.tenant, data.waterconnection, data.aadhaarnumber, data.electricalconsumernumber, data.name_ma, data.fathername_ma, data.houseflatname_ma, data.postoffice_ma, data.coalonyname_ma, data.roadname_ma, data.landmark_ma, data.dist_ma, data.pin_ma, data.state_ma, data.phonenumber_ma, data.email_ma, data.latitude, data.longitude, data.surverdate, data.surveyorname_ma]
                                    // ];

                                    // connection.query(sql, [values], function(err, result) {
                                    //     if (err) {
                                    //         console.log("err: ", err);
                                    //     } else {
                                    //         console.log("*************************Data sucessfully Inserted********");
                                    //     }
                                    // });
                                    // count++;
                                } else {
                                    flag = 1;
                                    console.log("from the else:");
                                    res.render("home", { data: "allready in the dataBase: " });
                                }
                            });
                            console.log("newSorted Array: ", objArray);
                        }
                    });
                    // } else {
                    //     console.log("from the else: ", count);
                    // }



                }

            });
        }


        res.render("home", { data: "Sucessfully Inserted: " });
    });


});
module.exports = router;