import React, {Component} from "react";

import {Button, Card, Col, Input, Row} from "react-materialize";

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
            autoDocTime: 0.00,
            started: "1900-01-01",
            ended: "1900-01-01",
            isShowingModal: false
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
        event.preventDefault();
        let formData = {
            qa: this.state.qa,
            project: this.state.project,
            issueNr: this.state["issueNr"],
            issuePr: this.state["issuePr"],
            issueLink: this.state["issueLink"],
            manPrepTime: this.state["manPrepTime"],
            manPerfTime: this.state["manPerfTime"],
            manDocTime: this.state["manDocTime"],
            autoPrepTime: this.state["autoPrepTime"],
            autoPerfTime: this.state["autoPerfTime"],
            autoDocTime: this.state["autoDocTime"],
            started: new Date(this.state["started"]).toISOString().slice(0,10),
            ended: new Date(this.state["ended"]).toISOString().slice(0,10),
            isShowingModal: true
        };

        let freedom = JSON.stringify(formData);
        console.log("FREEDOM!!!!\n" + freedom);


        fetch('/dagony/TaskEntries', {
            method: 'POST',
            body: freedom,
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then((res) => this.handleRedirect(res))
    }

    handleRedirect(result) {
        console.log(result.status);
        if (result.status === 200) {
            console.log("Yay");
            this.setState({
                isShowingModal: true
            });
        }
        else {
           console.log("nah");
        }
    }


    render() {

        return (
            <div className={"centered"}>


                Create task entry:<br/>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col s={4}>
                            <Input type={"select"}  label={"QA Person"} defaultValue={"Mark"}
                                   name={"qa"}>
                                <option value={"mark"}>Mark</option>
                                <option value={"pauli"}>Pauli</option>
                            </Input>
                        </Col>
                    </Row>

                    <Row>
                        <Input type={"text"} onChange={this.handleInputChange} name={"project"} label={"project"} />
                    </Row>

                    <Card title={"Issue"}>
                        <Row>
                            <Col s={4}>
                                <Input type={"number"} onChange={this.handleInputChange} name={"issueNr"} label={"issue NR"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"number"} onChange={this.handleInputChange} name={"issuePr"} label={"issue PR"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"text"} onChange={this.handleInputChange} name={"issueLink"} label={"issue link"} />
                            </Col>
                        </Row>
                    </Card>

                    <Card title={"Manual testing"}>
                        <Row>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"manPrepTime"} label={"Preperation Time in Quarter-Hours"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"manPerfTime"} label={"Performance Time in Quarter-Hours"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"manDocTime"} label={"Documentation Time in Quarter-Hours"} />
                            </Col>
                        </Row>
                    </Card>

                    <Card title={"Automated testing"}>
                        <Row>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"autoPrepTime"} label={"Preperation Time in Quarter-Hours"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"autoPerfTime"} label={"Performance Time in Quarter-Hours"} />
                            </Col>
                            <Col s={4}>
                                <Input type={"number"} step={"0.01"} onChange={this.handleInputChange} name={"autoDocTime"} label={"Documentation Time in Quarter-Hours"} />
                            </Col>
                        </Row>
                    </Card>

                    <Card>
                        <Row>
                            <Col s={6}>
                                <Input type={"date"} onChange={this.handleInputChange} name={"started"} label={"started"} />
                            </Col>
                            <Col s={6}>
                                <Input type={"date"} onChange={this.handleInputChange} name={"ended"} label={"ended"} />
                            </Col>
                        </Row>
                    </Card>
                    <input type={"hidden"} name={"formPosted"} value={true} />

                    <Button>Submit</Button>
                </form>
            </div>
        );
    }
}

export default TaskEntriesCreate;