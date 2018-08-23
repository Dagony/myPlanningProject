import React, {Component} from "react";

class TaskEntriesCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        let formData = {
            qa: React.findDOMNode(this.)
        };



        fetch('/taskentries', {
            method: 'POST',
            body: data
        });
    }


    render() {
        return (
            <div className={"centered"}>
                Create task entry:<br/>
                <form onSubmit={(e) => {this.handleSubmit(e);}}>
                    <label>
                        QA-er
                        <select name={"qa"} onChange={this.handleChange}>
                            <option value="mark">Mark</option>
                            <option value="pauli">Pauli</option>
                        </select>
                    </label>

                    <label>
                        Project
                        <input type={"text"} name={"project"} />
                    </label>

                    <label>
                        Issue NR
                        <input type={"number"} name={"issue-nr"} />
                    </label>

                    <label>
                        Issue PR
                        <input type={"number"} name={"issue-pr"} />
                    </label>

                    <label>
                        Issue Link
                        <input type={"text"} name={"issue-link"} />
                    </label>

                    <label>
                        Manual time in quarters
                        <input type={"text"} name={"man-time"} />
                    </label>

                    <label>
                        Automated time in quarters
                        <input type={"number"} name={"auto-time"} />
                    </label>



                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default TaskEntriesCreate;