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
            timeAutoTests: 0,
            timeManTests: 0
        };
    }

    getData() {
        fetch('/stats').then((response) => {
            return response.json()
                .then((responseData) => {
                    this.setState({
                        timeAutoTests: responseData.data.timeAutoTests,
                        timeManTests: responseData.data.timeManTests
                    });
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
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{this.state.maFactor}</h1>
                    <p className="h3 bold lh1 mo">MA</p>
                </div>
                {/*<div className="col-6 md-col-3 p2">*/}
                    {/*<h1 className="h00 lh1 mo">{this.state.numManTests}</h1>*/}
                    {/*<p className="h3 bold lh1 mo"># Manual tests</p>*/}
                {/*</div>*/}
                {/*<div className="col-6 md-col-3 p2">*/}
                    {/*<h1 className="h00 lh1 mo">{this.state.numAutoTests}</h1>*/}
                    {/*<p className="h3 bold lh1 mo"># Automatic tests</p>*/}
                {/*</div>*/}
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{Number.parseFloat(this.state.timeAutoTests / 4).toFixed(1)}</h1>
                    <p className="h3 bold lh1 mo">Hours of Automated testing</p>
                </div>
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{Number.parseFloat(this.state.timeManTests / 4).toFixed(1)}</h1>
                    <p className="h3 bold lh1 mo">Hours of Manual testing</p>
                </div>

            </section>

        </div>;
    }
}

export default MA;