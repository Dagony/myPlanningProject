import React, {Component} from "react";

class TaskEntriesEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qa: null,
            issue: {
                nr: 0,
                pr: 0,
                link: 'http://'
            },
            time: {
                man: {
                    prep: 0.00,
                    perf: 0.00,
                    doc: 0.00
                },
                auto: {
                    prep: 0.00,
                    perf: 0.00,
                    doc: 0.00
                }
            },
            id: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getData() {
        const {match: {params}} = this.props;
        console.log(`${params.id}`);
        let response = await fetch(`/taskentries/${params.id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let responseJson = await response.json();

        return responseJson[0];
    }

    async refreshData() {
        let loadedData = await this.getData();
        console.log(loadedData);

        this.setState({
            id: loadedData.id,
            qa: loadedData.qa,
            project: loadedData.project,
            issue: {
                nr: loadedData.issuenr,
                pr: loadedData.issuepr,
                link: loadedData.issueLink
            },
            time: {
                man: {
                    prep: loadedData.manpreptime,
                    perf: loadedData.manperftime,
                    doc: loadedData.mandoctime
                },
                auto: {
                    prep: loadedData.autopreptime,
                    perf: loadedData.autoperftime,
                    doc: loadedData.autodoctime
                }
            },
            started: loadedData.started.replace("Z", ""),
            ended: loadedData.ended.replace("Z", "")
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
            id: null,
            qa: "",
            project: "",
            issue: {
                nr: 0,
                pr: 0,
                link: ""
            },
            time: {
                man: {
                    prep: 0,
                    perf: 0,
                    doc: 0
                },
                auto: {
                    prep: 0,
                    perf: 0,
                    doc: 0
                }
            },
            started: null,
            ended: null
        };
        obj.id = event.target.id.value;
        obj.qa = event.target.qa.value;
        obj.project = event.target.project.value;
        obj.issue.nr = event.target["issue-nr"].value;
        obj.issue.pr = event.target["issue-pr"].value;
        obj.issue.link = event.target["issue-link"].value;
        obj.time.man.prep = event.target["man-prep"].value;
        obj.time.man.perf = event.target["man-perf"].value;
        obj.time.man.doc = event.target["man-doc"].value;
        obj.time.auto.prep = event.target["auto-prep"].value;
        obj.time.auto.perf = event.target["auto-perf"].value;
        obj.time.auto.doc = event.target["auto-doc"].value;
        obj.started = event.target["started"].value;
        obj.ended = event.target["ended"].value;
        console.log("OBJ\n" + JSON.stringify(obj, null, 2));

        const {match: {params}} = this.props;

        fetch(
            `/taskentries/${params.id}`,
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
                        <select name={"qa"} onChange={this.handleChange}>
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
                        <input type={"number"} onChange={this.handleChange} value={this.state.issue.nr}
                               name={"issue-nr"}/>
                    </label>

                    <label>
                        Issue PR
                        <input type={"number"} onChange={this.handleChange} value={this.state.issue.pr}
                               name={"issue-pr"}/>
                    </label>

                    <label>
                        Issue Link
                        <input type={"text"} onChange={this.handleChange} value={this.state.issue.link}
                               name={"issue-link"}/>
                    </label>

                    <label>
                        Preparation of manual tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.man.prep} name={"man-prep"}/>
                    </label>

                    <label>
                        Performing of manual time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.man.perf} name={"man-time"}/>
                    </label>

                    <label>
                        Documenting of manual time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.man.doc} name={"man-doc"}/>
                    </label>

                    <label>
                        Preparation of automated tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.auto.prep} name={"auto-prep"}/>
                    </label>

                    <label>
                        Performing of automated tests in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.auto.perf} name={"auto-perf"}/>
                    </label>

                    <label>
                        Documenting of automated time in quarters
                        <input type={"number"} step={"0.01"} onChange={this.handleChange}
                               value={this.state.time.auto.doc} name={"auto-doc"}/>
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