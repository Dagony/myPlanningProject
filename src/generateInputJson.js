let data = {
    data: [
        {id: 1, text: 'Create QA orientation', start_date: '11-06-2018', duration: dateDiff(new Date(2018,6,11), new Date(2018,7,2)), progress: 0.10, text_detail: 'I will create a document for people when they join QA. This document should be the goto for when people join team Gatekeeper.'},
        {id: 2, text: 'Making MA available for everybody', start_date: '02-07-2018', duration: dateDiff(new Date(2018,7,2), new Date(2018,8,24)), progress: calculateOverallProgress([0.00, 0.00, 0.05, 0.1])},
        {id: 21, text: 'QA-ers interview', parent: 2, start_date: '09-07-2018', duration: dateDiff(new Date(2018, 7, 9), new Date(2018,7,22)), progress: 0.00},
        {id: 22, text: 'Perform manual and automatic tests', parent: 2, start_date: '22-07-2018', duration: dateDiff(new Date(2018,7,22), new Date(2018,7,30)), progress: 0.00},
        {id: 23, text: 'Determine how to calculate MA', parent: 2, start_date: '30-07-2018', duration: dateDiff(new Date(2018,7,30), new Date(2018,8,8)), progress: 0.05},
        {id: 24, text: 'Create react app to share MA', parent: 2, start_date: '13-08-2018', duration: dateDiff(new Date(2018,8,13), new Date(2018,8,24)), progress: 0.1},

        {id: 3, text: 'Improve MA to 80%', start_date: '24-08-2018', duration: dateDiff(new Date(2018,8,24), new Date(2018,10,21)), progress: 0.0 },
        {id: 31, text: 'Inventorize which tests need to be manual', parent: 3, start_date: '24-08-2018', duration: dateDiff(new Date(2018,8,24), new Date(2018,9,2)), progress: 0.0 },
        {id: 32, text: 'Inventorize which tests can be automated', parent: 3, start_date: '02-09-2018', duration: dateDiff(new Date(2018,9,2), new Date(2018,9,8)), progress: 0.0 },
        {id: 33, text: 'Research how to convert manual testing to automated testing', parent: 3, start_date: '08-09-2018', duration: dateDiff(new Date(2018,9,8), new Date(2018,9,22)), progress: 0.0 },
        {id: 34, text: 'Perform actions to convert manual testing to automated testing', parent: 3, start_date: '22-09-2018', duration: dateDiff(new Date(2018,9,22), new Date(2018,10,21)), progress: 0.0 },
        {id: 4, text: 'Nightly performance tests running', start_date: '21-10-2018', duration: dateDiff(new Date(2018,10,21), new Date(2018,12,31)), progress: 0.0 },
        {id: 41, text: 'Set up tests in JMeter', parent: 4, start_date: '21-10-2018', duration: dateDiff(new Date(2018,10,21), new Date(2018,11,30)), progress: 0.0},
        {id: 42, text: 'Run JMeter Performance test in Jenkins', parent: 4, start_date: '30-11-2018', duration: dateDiff(new Date(2018,11,30), new Date(2018,12,14)), progress: 0.0 },
        {id: 43, text: 'Push result of JMeter perf. to React app', parent: 4, start_date: '14-12-2018', duration: dateDiff(new Date(2018,12,14), new Date(2018,12,31)), progress: 0.0 },
    ],
    links: [
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
    ],
    scale_unit: 'week'
};

function dateDiff(fromdate, todate) {
    let diff = todate - fromdate;
    let divideBy = {
        w:604800000,
        d:86400000,
        h:3600000,
        n:60000,
        s:1000 };

    return Math.floor( diff/divideBy['d']);
}

function calculateOverallProgress(inputTasks) {
    let total = 0;

    let myFunc = function(majorTask) {
        for ( let i = 0; i < majorTask.length; i++) {
            console.log(JSON.stringify(majorTask[i]));
        }
    };

    inputTasks.forEach((input) => {
        total += input;
    });
    total = total / inputTasks.length;
    console.log(inputTasks);
    console.log(total);
    return Math.round(total * 100) / 100;
}

export default function getJsonData() {
    return data;
}