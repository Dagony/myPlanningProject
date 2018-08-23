import React, {Component} from 'react';
import './MA.css';

class MA extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myData: null,
            maFactor: 1,
            numManTests: 1,
            numAutoTests: 1
        };
    }

    async getData() {
        let response = await fetch('/stats');
        let responseJson = await response.json();
        return responseJson.data;
    }

    async refreshData() {
        let loadedData = await this.getData();

        console.log(loadedData);

        this.setState({
            numManTests: loadedData.NumManTests,
            numAutoTests: loadedData.NumAutoTests,
            maFactor: loadedData.MaFactor
        });
    }

    componentDidMount() {
        this.refreshData();
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

            </section>

        </div>;
    }
}

export default MA;