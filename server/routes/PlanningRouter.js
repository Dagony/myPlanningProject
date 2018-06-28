const express = require('express');
const app = express();
const PlanningRouter = express.Router();

const Planning = require('../models/Planning');

PlanningRouter.route('/planning').get(function (req, res) {
    Planning.find((err, res) => {
        return res.json();
    });
    console.log(res.json());
    return true;
    // Planning.find(function (err, planning) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.json(planning);
    //     }
    // });
});

module.exports = Planning;
