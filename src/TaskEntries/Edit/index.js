import React, {Component} from "react";

class TaskEntriesEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qa: null,
            issueNr: 0,
            issuePr: 0,
            issueLink: 'http://',
            manPrepTime: 0.00,
            manPerfTime: 0.00,
            manDocTime: 0.00,
            autoPrepTime: 0.00,
            autoPerfTime: 0.00,
            autoDocTime: 0.00,
            id: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getData() {
        const {match: {params}} = this.props;
        console.log(`get Task Entry with id: ${params.id}`);
        let response = await fetch(`/dagony/taskentries/${params.id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let responseJson = await response.json();
        // console.log('This Task Entry was fetched:\n' + JSON.stringify(responseJson[0]));
        return responseJson;
    }

    async refreshData() {
        let loadedData = await this.getData();
        console.log(loadedData);

        this.setState({
            id: loadedData.id,
            qa: loadedData.qa,
            project: loadedData.project,
            issueNr: loadedData.issuenr,
            issuePr: loadedData.issuepr,
            issueLink: loadedData.issueLink,
            manPrepTime: loadedData.manpreptime,
            manPerfTime: loadedData.manperftime,
            manDocTime: loadedData.mandoctime,
            autoPrepTime: loadedData.autopreptime,
            autoPerfTime: loadedData.autoperftime,
            autoDocTime: loadedData.autodoctime,
            started: loadedData.started,
            ended: loadedData.ended
        });
    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let obj = {
            qa: null,
            issueNr: 0,
            issuePr: 0,
            issueLink: 'http://',
            manPrepTime: 0.00,
            manPerfTime: 0.00,
            manDocTime: 0.00,
            autoPrepTime: 0.00,
            autoPerfTime: 0.00,
            autoDocTime: 0.00,
            id: null
        };
        obj.id = event.target.id.value;
        obj.qa = event.target.qa.value;
        obj.project = event.target.project.value;
        obj.issueNr = event.target["issue-nr"].value;
        obj.issuePr = event.target["issue-pr"].value;
        obj.issueLink = event.target["issue-link"].value;
        obj.manPrepTime = event.target["man-prep"].value;
        obj.manPerfTime = event.target["man-perf"].value;
        obj.manDocTime = event.target["man-doc"].value;
        obj.autoPrepTime = event.target["auto-prep"].value;
        obj.autoPerfTime = event.target["auto-perf"].value;
        obj.autoDocTime = event.target["auto-doc"].value;
        obj.started = event.target["started"].value ;
        obj.ended = event.target["ended"].value;
        console.log("OBJ\n" + JSON.stringify(obj, null, 2));

        const {match: {params}} = this.props;

        fetch(
            `/dagony/taskentries`,
            {
                method: 'put',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );


    }

    componentDidMount() {
        this.refreshData();
        console.log('STATE\n' + JSON.stringify(this.state, null, 2));
    }


    render() {
        return (
            <div className={"centered"}>
                Edit task entry:<br/>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        ID
                        <input type={"number"} onChange={this.handleChange} value={this.state.id} name={"id"}
                               disabled={true}/>
                    </label>

                    <label>
                        QA-er
                        <select name={"qa"} value={this.state.qa} onChange={this.handleChange}>
                            <option key={'mark'} value="mark">Mark</option>
                            <option key={'pauli'} value="pauli">Pauli</option>
                        </select>
                    </label>

                    <label>
                        Project
                        <input type={"text"} onChange={this.handleChange} value={this.state.project}
                               name={"project"}/>
                    </label>

                    <label>
                        Issue NR
                        <input type={"number"} onChange={this.handleChange} value={this.state.issueNr}
                               name={"issue-nr"}/>
                    </label>

                    <label>
                        Issue PR
                        <input type={"number"} onChange={this.handleChange} value={this.state.issuePr}
                               name={"issue-pr"}/>
                    </label>

                    <label>
                        Issue Link
                        <input type={"text"} onChange={this.handleChange} value={this.state.issueLink}
                               name={"issue-link"}/>
                    </label>

                    <label>
                        Preparation of manual tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.manPrepTime} name={"man-prep"}/>
                    </label>

                    <label>
                        Performing of manual time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.manPerfTime} name={"man-perf"}/>
                    </label>

                    <label>
                        Documenting of manual time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.manDocTime} name={"man-doc"}/>
                    </label>

                    <label>
                        Preparation of automated tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.autoPrepTime} name={"auto-prep"}/>
                    </label>

                    <label>
                        Performing of automated tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.autoPerfTime} name={"auto-perf"}/>
                    </label>

                    <label>
                        Documenting of automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.autoDocTime} name={"auto-doc"}/>
                    </label>

                    <label>
                        Started
                        <input type={"datetime-local"} onChange={this.handleChange} value={this.state.started}
                               name={"started"}/>
                    </label>

                    <label>
                        Ended
                        <input type={"datetime-local"} onChange={this.handleChange} value={this.state.ended}
                               name={"ended"}/>
                    </label>

                    <input onChange={this.handleChange} type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default TaskEntriesEdit;