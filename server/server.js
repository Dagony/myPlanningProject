let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
require("date-format-lite");

let port = 1337;
let app = express();
let mysql = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'gantt'
});

var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
    extended: true
}));

db.connect();

app.use(express.static(path.join(__dirname, "public")));

// Collect the data for the GANTT chart
app.get("/data", function (req, res) {
    db.query("SELECT * FROM gantt_tasks", function (err, rows) {
        if (err) console.log(err);
        console.log(rows[0]);

        db.query("SELECT * FROM gantt_links", function (err, links) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].start_date = rows[i].start_date.format("DD-MM-YYYY");
                rows[i].open = true;
            }

            res.send({data: rows, collections: {links: links}});
        })

    })
});

app.get('/stats', function (req, res) {
    let obj = {
        numManTests: null,
        numAutoTests: null,
        timeManTests: null,
        timeAutoTests: null,
        MaFactor: null,
        projects: {}
    };


    db.query("SELECT SUM(mantime) as sumManTime, SUM(autotime) as sumAutoTime FROM all_test_tasks", function (err, results) {
        obj.timeManTests = 1;
        if (err) console.log("The Most Bad-Ass Error:\n" + err);
        else {
            // console.log("ERR:\n" + err);
            // console.log("RESULTS:\n" + JSON.stringify(results[0]));
            // console.log(results[0]);
            obj.timeManTests = results[0].sumManTime;
            obj.timeAutoTests = results[0].sumAutoTime;
        }
        db.query("SELECT count(project) AS num_projects, project FROM all_test_tasks GROUP BY project ORDER BY num_projects DESC", function (err, rows) {
            if (err) throw(err);
            else {
                // console.log("ROWS:\n" + JSON.stringify(rows));
                // console.log("ROW 1:\n" + JSON.stringify(rows[0]));
                // console.log("ROW 1 - project field: " + JSON.stringify(rows[0].project));
                let len = rows.length;
                for (let i = 0; i < len; i++) {

                    // console.log(i + "\n" + JSON.stringify(rows[i]) + "\n" + rows[i].project + "\n\n");
                    // let projects = {
                    //     rows[i].project: rows[i].num_projects
                    // };
                    // obj.projects.push(projects);
                    obj.projects[rows[i].project] = rows[i].num_projects;
                }

                db.query("SELECT project, COUNT(project) as cnt FROM `all_test_tasks` WHERE autotime > 0 GROUP BY project", function(err, rows) {
                    if (err) throw(err);
                    else {
                        obj.numAutoTests = rows[0].cnt;

                        db.query("SELECT project, COUNT(project) as cnt FROM `all_test_tasks` WHERE mantime > 0 GROUP BY project", function(err, rows) {
                            if (err) throw(err);
                            else {
                                obj.numManTests = rows[0].cnt;
                                res.send({data: obj});
                            }
                        });
                    }
                });
            }
        });
    });
});

app.get('/taskentries', function (req, res) {
    db.query("SELECT * FROM all_test_tasks", function (err, rows) {
        if (err) console.log(err);

        res.send({data: rows});
    })
});

app.get('/taskentries/:id', function (req, res) {
    db.query("SELECT * FROM all_test_tasks WHERE id=" + req.params.id + ";", function (err, row) {
        if (err) console.log(err);

        res.send(row);
    });
});

app.post('/taskentries', jsonParser, function (req, res) {

    let obj = [
        req.body.qa,
        req.body.project,
        req.body.issue.nr,
        req.body.issue.pr,
        req.body.issue.link,
        parseFloat(req.body.time.auto, 2),
        parseFloat(req.body.time.man, 2),
        req.body.started,
        req.body.ended
    ];
    // console.log(JSON.stringify(obj));


    db.query("INSERT INTO all_test_tasks(qa,project,issuenr,issuepr,issuelink,autotime,mantime,started, ended) VALUES (?,?,?,?,?,?,?,?,?)", obj, function (err, result, fields) {
        // console.log(result);
        if (err) {
            // res.send(err);
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
            // console.log(result);
            // console.log(fields);
        }

    });
    // res.send('Success');
    res.redirect('..');
});

app.put('/taskentries/:id', jsonParser, function (req, res) {
    let obj = [
        req.body.qa,
        req.body.project,
        req.body.issue.nr,
        req.body.issue.pr,
        req.body.issue.link,
        parseFloat(req.body.time.auto, 2),
        parseFloat(req.body.time.man, 2),
        req.body.started,
        req.body.ended,
        req.body.id
    ];

    console.log(obj);

    db.query("UPDATE all_test_tasks SET qa = ?, project = ? , issuenr = ?, issuepr = ?, issuelink = ?, autotime = ?, mantime = ?, started = ?, ended = ? WHERE id = ?", obj, function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(port, function () {
    console.log("Server is running on port " + port + "...");
});


// To make sure the database is filled the correct way, call http://localhost:1337/fillDatabase
app.get("/fillDatabase", function (req, res) {
    console.log("/fillDatabase called");

    let values = [
        {
            id: 1,
            text: 'Create QA orientation',
            start_date: '2018-06-11',
            // start_date: '11-06-2018',
            duration: dateDiff(new Date(2018, 6, 11), new Date(2018, 7, 2)),
            progress: 0.10,
            parent: 0,
            text_detail: 'I will create a document for people when they join QA. This document should be the goto for when people join team Gatekeeper.'
        },
        {
            id: 2,
            text: 'Making MA available for everybody',
            // start_date: '02-07-2018',
            start_date: '2018-07-02',
            duration: dateDiff(new Date(2018, 7, 2), new Date(2018, 8, 24)),
            parent: 0,
            progress: calculateOverallProgress([0.20, 0.00, 0.05, 0.1])
        },
        {
            id: 21,
            text: 'QA-ers interview',
            parent: 2,
            // start_date: '09-07-2018',
            start_date: '2018-07-09',
            duration: dateDiff(new Date(2018, 7, 9), new Date(2018, 7, 22)),
            progress: 0.20
        },
        {
            id: 22,
            text: 'Perform manual and automatic tests',
            parent: 2,
            // start_date: '22-07-2018',
            start_date: '2018-07-22',
            duration: dateDiff(new Date(2018, 7, 22), new Date(2018, 7, 30)),
            progress: 0.00
        },
        {
            id: 23,
            text: 'Determine how to calculate MA',
            parent: 2,
            start_date: '2018-07-30',
            // start_date: '30-07-2018',
            duration: dateDiff(new Date(2018, 7, 30), new Date(2018, 8, 8)),
            progress: 0.05
        },
        {
            id: 24,
            text: 'Create react app to share MA',
            parent: 2,
            start_date: '2018-08-13',
            // start_date: '13-08-2018',
            duration: dateDiff(new Date(2018, 8, 13), new Date(2018, 8, 24)),
            progress: 0.1
        },

        {
            id: 3,
            text: 'Improve MA to 80%',
            parent: 0,
            start_date: '2018-08-24',
            // start_date: '24-08-2018',
            duration: dateDiff(new Date(2018, 8, 24), new Date(2018, 10, 21)),
            progress: 0.0
        },
        {
            id: 31,
            text: 'Inventorize which tests need to be manual',
            parent: 3,
            start_date: '2018-08-24',
            // start_date: '24-08-2018',
            duration: dateDiff(new Date(2018, 8, 24), new Date(2018, 9, 2)),
            progress: 0.0
        },
        {
            id: 32,
            text: 'Inventorize which tests can be automated',
            parent: 3,
            start_date: '2018-09-02',
            // start_date: '02-09-2018',
            duration: dateDiff(new Date(2018, 9, 2), new Date(2018, 9, 8)),
            progress: 0.0
        },
        {
            id: 33,
            text: 'Research how to convert manual testing to automated testing',
            parent: 3,
            start_date: '2018-09-08',
            // start_date: '08-09-2018',
            duration: dateDiff(new Date(2018, 9, 8), new Date(2018, 9, 22)),
            progress: 0.0
        },
        {
            id: 34,
            text: 'Perform actions to convert manual testing to automated testing',
            parent: 3,
            start_date: '2018-09-22',
            // start_date: '22-09-2018',
            duration: dateDiff(new Date(2018, 9, 22), new Date(2018, 10, 21)),
            progress: 0.0
        },
        {
            id: 4,
            text: 'Nightly performance tests running',
            start_date: '2018-10-21',
            parent: 0,
            // start_date: '21-10-2018',
            duration: dateDiff(new Date(2018, 10, 21), new Date(2018, 12, 31)),
            progress: 0.0
        },
        {
            id: 41,
            text: 'Set up tests in JMeter',
            parent: 4,
            start_date: '2018-10-21',
            // start_date: '21-10-2018',
            duration: dateDiff(new Date(2018, 10, 21), new Date(2018, 11, 30)),
            progress: 0.0
        },
        {
            id: 42,
            text: 'Run JMeter Performance test in Jenkins',
            parent: 4,
            start_date: '2018-11-30',
            // start_date: '30-11-2018',
            duration: dateDiff(new Date(2018, 11, 30), new Date(2018, 12, 14)),
            progress: 0.0
        },
        {
            id: 43,
            text: 'Push result of JMeter perf. to React app',
            parent: 4,
            start_date: '2018-12-14',
            // start_date: '14-12-2018',
            duration: dateDiff(new Date(2018, 12, 14), new Date(2018, 12, 31)),
            progress: 0.0
        },
    ];

    values.forEach((values) => {
        let d = createFromMysql(values.start_date);

        db.query(
            'INSERT INTO `gantt_tasks` (id, text, start_date, duration, progress, parent) VALUES (?, ?, ?, ?, ?, ?)',
            [values.id, values.text, d, values.duration, values.progress, values.parent],
            function (err, row) {
                if (err) console.log(err);
                console.log(row);

            });
    });

    let links = [
        {id: 1, source: 2, target: 21, type: '1'},
        {id: 2, source: 2, target: 22, type: '1'},
        {id: 3, source: 2, target: 23, type: '1'},
        {id: 4, source: 2, target: 24, type: '1'},
        {id: 5, source: 3, target: 31, type: '1'},
        {id: 6, source: 3, target: 32, type: '1'},
        {id: 7, source: 3, target: 33, type: '1'},
        {id: 8, source: 3, target: 34, type: '1'},
        {id: 9, source: 4, target: 41, type: '1'},
        {id: 10, source: 41, target: 42, type: '0'},
        {id: 11, source: 42, target: 43, type: '0'}
    ];

    links.forEach((link) => {
        db.query(
            'INSERT INTO `gantt_links` (id, source, target, type) VALUES(?,?,?,?)',
            [link.id, link.source, link.target, link.type],
            function (err, row) {
                if (err) console.log(err);
                console.log(row);
            }
        )
    });

    res.send({success: true});

});

function createFromMysql(mysql_string) {
    let t, result = null;
    if (typeof mysql_string === 'string') {
        t = mysql_string.split(/[-:]/);
        console.log(t);
        result = new Date(t[0], t[1] - 1, t[2]);
    }
    return result;
}


function dateDiff(fromdate, todate) {
    let diff = todate - fromdate;
    let divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000
    };

    return Math.floor(diff / divideBy['d']);
}

function calculateOverallProgress(inputTasks) {
    let total = 0;

    inputTasks.forEach((input) => {
        total += input;
    });
    total = total / inputTasks.length;
    console.log(inputTasks);
    console.log(total);
    return Math.round(total * 100) / 100;
}
