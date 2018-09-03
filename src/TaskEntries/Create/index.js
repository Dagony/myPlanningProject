import React, {Component} from "react";

class TaskEntriesCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qa: 'Pauli',
            issue: {
                nr: 0,
                pr: 0,
                link: 'http://'
            },
            time: {
                man: 0.00,
                auto: 0.00
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event) {
        let formData = {
            qa: this.state.qa,
            project: this.state.project,
            issue: {
                nr: this.state["issue-nr"],
                pr: this.state["issue-pr"],
                link: this.state["issue-link"]
            },
            time: {
                man: this.state["man-time"],
                auto: this.state["auto-time"]
            },
            started: this.state["started"],
            ended: this.state["ended"]
        };



        // console.log(this.state);
        let freedom = JSON.stringify(formData);
        alert(freedom);

        event.preventDefault();
        fetch('/taskentries', {
            method: 'POST',
            body: freedom
            ,headers: {
                'Content-Type' : 'application/json'
            }
        });

    }


    render() {
        return (
            <div className={"centered"}>
                Create task entry:<br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        QA-er
                        <select name={"qa"} value={this.state.qa} onChange={this.handleInputChange}>
                            <option key={'mark'} value="mark">Mark</option>
                            <option key={'pauli'} value="pauli">Pauli</option>
                        </select>
                    </label>

                    <label>
                        Project
                        <input type={"text"} onChange={this.handleInputChange} name={"project"} />
                    </label>

                    <label>
                        Issue NR
                        <input type={"number"} onChange={this.handleInputChange} name={"issue-nr"} />
                    </label>

                    <label>
                        Issue PR
                        <input type={"number"} onChange={this.handleInputChange} name={"issue-pr"} />
                    </label>

                    <label>
                        Issue Link
                        <input type={"text"} onChange={this.handleInputChange} name={"issue-link"} />
                    </label>

                    <label>
                        Manual time in quarters
                        <input type={"text"} onChange={this.handleInputChange} name={"man-time"} />
                    </label>

                    <label>
                        Automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"auto-time"} />
                    </label>

                    <label>
                        Started
                        <input type={"datetime-local"} onChange={this.handleInputChange} name={"started"} />
                    </label>

                    <label>
                        Ended
                        <input type={"datetime-local"} onChange={this.handleInputChange} name={"ended"} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default TaskEntriesCreate;