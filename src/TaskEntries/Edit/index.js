import React, {Component} from "react";
import {Button, Card, Row, Input, Col} from "react-materialize";

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
        return await response.json();
    }

    async refreshData() {
        let loadedData = await this.getData();
        console.log(loadedData);

        this.setState({
            id: loadedData.id,
            qa: loadedData.qa,
            project: loadedData.project,
            issueNr: loadedData.issueNr,
            issuePr: loadedData.issuePr,
            issueLink: loadedData.issueLink,
            manPrepTime: loadedData.manPrepTime,
            manPerfTime: loadedData.manPerfTime,
            manDocTime: loadedData.manDocTime,
            autoPrepTime: loadedData.autoPrepTime,
            autoPerfTime: loadedData.autoPerfTime,
            autoDocTime: loadedData.autoDocTime,
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
        obj.issueNr = event.target.issueNr.value;
        obj.issuePr = event.target.issuePr.value;
        obj.issueLink = event.target.issueLink.value;
        obj.manPrepTime = event.target.manPrepTime.value;
        obj.manPerfTime = event.target.manPerfTime.value;
        obj.manDocTime = event.target.manDocTime.value;
        obj.autoPrepTime = event.target.autoPrepTime.value;
        obj.autoPerfTime = event.target.autoPerfTime.value;
        obj.autoDocTime = event.target.autoDocTime.value;
        obj.started = event.target.started.value;
        obj.ended = event.target.ended.value;
        console.log("OBJ\n" + JSON.stringify(obj, null, 2));

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

                    <Row>
                        <Input type={"number"} placeholder={this.state.id} value={this.state.id}
                               disabled={true} label={"id"} name={"id"}/>
                    </Row>

                    <Row>
                        <Input type={"select"} label={"QA Person"} defaultValue={"Mark"} onChange={this.handleChange}
                               name={"qa"}>
                            <option value={"mark"}>Mark</option>
                            <option value={"pauli"}>Pauli</option>
                        </Input>
                    </Row>

                    <Row>
                        <Input onChange={this.handleChange} value={this.state.project} placeholder={"Project"}
                               label={"Project"} name={"project"} />
                    </Row>

                    <Card title={"Issue"}>
                        <Row>
                            <Col s={"4"}>
                                <Input type={"number"} onChange={this.handleChange} value={this.state.issueNr}
                                       name={"issueNr"} label={"Issue NR"} placeholder={"0.00"}/>
                            </Col>
                            <Col s={"4"}>
                                <Input type={"number"} onChange={this.handleChange} value={this.state.issuePr}
                                       name={"issuePr"} label={"Issue PR"} placeholder={"0.00"}/>
                            </Col>
                            <Col s={"4"}>
                                <Input type={"text"} length={200} onChange={this.handleChange}
                                       value={this.state.issueLink}
                                       name={"issueLink"} label={"Issue Link"} placeholder={"http://"}/>
                            </Col>
                        </Row>
                    </Card>

                    <Card title={"Manual Testing"}>
                        <Row>
                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       value={this.state.manPrepTime} name={"manPrepTime"}
                                       label={"Preparation Time in Quarter-Hours"}/>
                            </Col>

                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       label={"Performing Time in Quarter-Hours"} value={this.state.manPerfTime}
                                       name={"manPerfTime"}/>
                            </Col>

                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       value={this.state.manDocTime} name={"manDocTime"}
                                       label={"Documenting Time in Quarter-Hours"}/>
                            </Col>
                        </Row>
                    </Card>

                    <Card title={"Automated Testing"}>
                        <Row>
                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       value={this.state.autoPrepTime} name={"autoPrepTime"}
                                       label={"Preparation Time in Quarter-Hours"}/>
                            </Col>
                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       value={this.state.autoPerfTime} name={"autoPerfTime"}
                                       label={"Performing Time in Quarter-Hours"}/>
                            </Col>
                            <Col s={4} className={"grid-example"}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleChange}
                                       value={this.state.autoDocTime} name={"autoDocTime"}
                                       label={"Documenting Time in Quarter-Hours"}/>
                            </Col>
                        </Row>
                    </Card>

                    <Card>
                        <Row>
                            <Col s={"6"} className={"grid-example"}>
                                <Input type={"date"} onChange={this.handleChange} value={this.state.started}
                                       name={"started"} label={"started"} />
                            </Col>
                            <Col s={"6"} className={"grid-example"}>
                                <Input type={"date"} onChange={this.handleChange} value={this.state.ended}
                                       name={"ended"} label={"ended"} />
                            </Col>
                        </Row>
                    </Card>

                    <Button onChange={this.handleChange}>Submit</Button>
                </form>
            </div>
        );
    }
}

export default TaskEntriesEdit;