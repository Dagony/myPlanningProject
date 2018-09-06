import React, {Component} from 'react';
import './MA.css';

class MA extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myData: null,
            maFactor: 1,
            numManTests: 1,
            numAutoTests: 1,
            timeManTests: 0.00,
            timeAutoTests: 0.00,
            timeAutoPrepTests: 0.00,
            timeAutoPerfTests: 0.00,
            timeAutoDocTests: 0.00,
            timeManPrepTests: 0.00,
            timeManPerfTests: 0.00,
            timeManDocTests: 0.00

        };
    }

    getData() {
        fetch('/testtask/all').then((response) => {
            return response.json()
                .then((responseData) => {

                    let manualTestTimeTotalSpend = 0.0;
                    let manualTestPreperationTimeSpend = 0.0;
                    let manualTestPerformanceTimeSpend = 0.0;
                    let manualTestDocumentationTimeSpend = 0.0;
                    let automaticTestTimeSpend = 0.0;
                    let automaticTestPreparationTimeSpend = 0.0;
                    let automaticTestPerformanceTimeSpend = 0.0;
                    let automaticTestDocumentationTimeSpend = 0.0;
                    let manualTests = 0;
                    let automaticTests = 0;

                    console.log(responseData);
                    responseData.map((item, i) => {
                        console.log("Man Prep Time: " + item.manpreptime);
                        manualTestPreperationTimeSpend =  manualTestPreperationTimeSpend + item.manpreptime;
                        manualTestPerformanceTimeSpend = manualTestPerformanceTimeSpend + item.manperftime;
                        manualTestDocumentationTimeSpend += item.mandoctime;
                        manualTestTimeTotalSpend = manualTestTimeTotalSpend + item.manpreptime + item.manperftime + item.mandoctime;
                        automaticTestPreparationTimeSpend = automaticTestPreparationTimeSpend + item.autopreptime;
                        automaticTestPerformanceTimeSpend = automaticTestPerformanceTimeSpend + item.autoperftime;
                        automaticTestDocumentationTimeSpend = automaticTestDocumentationTimeSpend + item.autodoctime;
                        automaticTestTimeSpend += item.autopreptime + item.autoperftime + item.autodoctime;
                        if ((item.autopreptime + item.autoperftime + item.autodoctime) > 0) {
                            automaticTests++;
                        }
                        if ((item.manpreptime + item.manperftime + item.mandoctime) > 0) {
                            manualTests++;
                        }

                    });

                    console.log("Total Manual Testing Preparation time spend is: " + manualTestPreperationTimeSpend);
                    console.log("Total Manual Testing Performance time spend is: " + manualTestPerformanceTimeSpend);
                    console.log("Total Manual Testing Documantation time spend is: " + manualTestDocumentationTimeSpend);
                    console.log("Total Manual Testing time spend is (in quarters of hours): " + manualTestTimeTotalSpend);
                    console.log("Total Automated Testing Preparation time spend is: " + automaticTestPreparationTimeSpend);
                    console.log("Total Automated Testing Preparation time spend is: " + automaticTestPreparationTimeSpend);
                    console.log("Total Automated Testing Preparation time spend is: " + automaticTestPreparationTimeSpend);
                    console.log("Total Automated Testing Preparation time spend is: " + automaticTestPreparationTimeSpend);


                    this.setState({
                        timeManPrepTests: manualTestPreperationTimeSpend / 4,
                        timeManPerfTests: manualTestPerformanceTimeSpend / 4,
                        timeManDocTests: manualTestDocumentationTimeSpend / 4,
                        timeManTests: manualTestTimeTotalSpend / 4,
                        timeAutoPrepTests: automaticTestPreparationTimeSpend / 4,
                        timeAutoPerfTests: automaticTestPerformanceTimeSpend / 4,
                        timeAutoDocTests: automaticTestDocumentationTimeSpend / 4,
                        timeAutoTests: automaticTestTimeSpend / 4,
                        numManTests: manualTests,
                        numAutoTests: automaticTests
                    });
                    return responseData;
                });
        });
        this.calculateMA();
    }



    componentDidMount() {
        this.getData();
    }

    render() {
        return <div>
            <section id={"top-stats"} className="flex flex-wrap mxn2 mb4">
                {this.state.myData}
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{this.state.maFactor}</h1>
                    <p className="h3 bold lh1 mo">MA</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{this.state.numManTests}</h1>
                    <p className="h3 bold lh1 mo"># Manual tests</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{this.state.numAutoTests}</h1>
                    <p className="h3 bold lh1 mo"># Automatic tests</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoPerfTests).toFixed(1)}</h1>
                    <p className="h3 bold lh1 mo">Hours of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{Number.parseFloat(this.state.timeManTests).toFixed(1)}</h1>
                    <p className="h3 bold lh1 mo">Hours of Manual testing</p>
                </div>

            </section>

        </div>;
    }

    // To calculate the MA factor, use the formula from the documentation
    calculateMA() {

    }
}

export default MA;