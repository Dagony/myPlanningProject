import React, {Component} from "react";

class TaskEntriesCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qa: 'Pauli',
            issueNr: 0,
            issuePrr: 0,
            issueLink: 'http://',
            manPrepTime:  0.00,
            manPerfTime: 0.00,
            manDocTime: 0.00,
            autoPrepTim: 0.00,
            autoPerfTime: 0.00,
            autoDocTime: 0.00
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
            issueNr: this.state["issue-nr"],
            issuePr: this.state["issue-pr"],
            issueLink: this.state["issue-link"],
            manPrepTime: this.state["man-prep"],
            manPerfTime: this.state["man-time"],
            manDocTime: this.state["man-doc"],
            autoPrepTime: this.state["auto-prep"],
            autoPerfTime: this.state["auto-time"],
            autoDocTime: this.state["auto-doc"],
            started: this.state["started"],
            ended: this.state["ended"]
        };



        // console.log(this.state);
        let freedom = JSON.stringify(formData);
        console.log("FREEDOM!!!!\n" + freedom);

        event.preventDefault();
        fetch('/dagony/TaskEntries', {
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
                        Preparing of Manual tests in quarters
                        <input type={"text"} onChange={this.handleInputChange} name={"man-prep"} />
                    </label>

                    <label>
                        Performing of Manual tests in quarters
                        <input type={"text"} onChange={this.handleInputChange} name={"man-time"} />
                    </label>

                    <label>
                        Documenting of Manual tests in quarters
                        <input type={"text"} onChange={this.handleInputChange} name={"man-doc"} />
                    </label>

                    <label>
                        Preparing of Automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"auto-prep"} />
                    </label>

                    <label>
                        Performance of Automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"auto-time"} />
                    </label>

                    <label>
                        Documenting of Automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"auto-doc"} />
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