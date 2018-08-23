import React, {Component} from 'react';
import './MA.css';

class MA extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maFactor: this.props["ma-factor"],
            numManTests : this.props["num-man-tests"],
            numAutoTests : this.props["num-auto-tests"]
        };
    }



    render() {
        return <div>
            <section id={"top-stats"} className="flex flex-wrap mxn2 mb4">
                <div className="col-6 md-col-3 p2">
                    <h1 className="h00 lh1 mo">{(this.state.numManTests / this.state.numAutoTests)}</h1>
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