import React, {Component} from 'react';
import './MA.css';

class MA extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myData: null,
            maFactor: 1,
            percentAuto: 1,
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
        fetch('/dagony/taskentries').then((response) => {
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
                    let percentAuto = 0.0;

                    responseData.map((item) => {
                        manualTestPreperationTimeSpend =  manualTestPreperationTimeSpend + item.manPrepTime;
                        manualTestPerformanceTimeSpend = manualTestPerformanceTimeSpend + item.manPerfTime;
                        manualTestDocumentationTimeSpend += item.manDocTime;
                        manualTestTimeTotalSpend = manualTestTimeTotalSpend + item.manPrepTime + item.manPerfTime + item.manDocTime;
                        automaticTestPreparationTimeSpend = automaticTestPreparationTimeSpend + item.autoPrepTime;
                        automaticTestPerformanceTimeSpend = automaticTestPerformanceTimeSpend + item.autoPerfTime;
                        automaticTestDocumentationTimeSpend = automaticTestDocumentationTimeSpend + item.autoDocTime;
                        automaticTestTimeSpend += item.autoPrepTime + item.autoPerfTime + item.autoDocTime;
                        if ((item.autoPrepTime + item.autoPerfTime + item.autoDocTime) > 0) {
                            automaticTests++;
                        }
                        if ((item.manPrepTime + item.manPerfTime + item.manDocTime) > 0) {
                            manualTests++;
                        }
                        percentAuto = (automaticTests / (automaticTests + manualTests)) * 100;
                        return true; // arrow functions need a return value.
                    });

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
                        numAutoTests: automaticTests,
                        percentAuto: percentAuto
                    });
                    this.calculateMA();
                    return responseData;
                });
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return <div>
            <section id={"top-stats"} className="flex flex-wrap mxn2 mb4">
                {this.state.myData}
                <div className="col-6 lg-col-6 p2">
                    <h1 className={"h00 lh1 mo"}>{Number.parseFloat(this.state.percentAuto).toFixed(1)}%</h1>
                    <p className={"h1 bold lh1 mo"}>of all tests are automatically performed</p>
                </div>
                <div className="col-6 lg-col-6 p2">
                    <h1 className="h00 lh1 mo">{this.state.maFactor}</h1>
                    <p className="h1 bold lh1 mo">MA</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{this.state.numManTests}</h3>
                    <p className="h3 bold lh1 mo"># Manual tests</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{this.state.numAutoTests}</h3>
                    <p className="h3 bold lh1 mo"># Automatic tests</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoPrepTests).toFixed(1)}</h3>
                    <p className="h3 bold lh1 mo">Hours of Preparation of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoPerfTests).toFixed(1)}</h3>
                    <p className="h3 bold lh1 mo">Hours of Performing of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoDocTests).toFixed(1)}</h3>
                    <p className="h3 bold lh1 mo">Hours of Documenting of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoPerfTests).toFixed(1)}</h3>
                    <p className="h3 bold lh1 mo">Hours of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h3 className="h00 lh1 mo">{Number.parseFloat(this.state.timeManTests).toFixed(1)}</h3>
                    <p className="h3 bold lh1 mo">Hours of Manual testing</p>
                </div>
            </section>
        </div>;
    }

    // To calculate the MA factor, use the formula from the documentation
    calculateMA() {
        let RF = 1; // Repeatability factor

        let mtt = this.state.timeManPrepTests + ((this.state.timeManPerfTests + this.state.timeManDocTests) * RF);
        let att = this.state.timeAutoPrepTests + ((this.state.timeAutoPerfTests + this.state.timeAutoDocTests) * RF);

        this.setState({
            maFactor: (att / mtt).toFixed(3)
        });

    }
}

export default MA;