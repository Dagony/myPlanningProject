import React, {Component} from "react";
import './TaskEntries.css';

import {IconContext} from 'react-icons';
import {FaEdit} from 'react-icons/fa';
import {FaPlusSquare} from 'react-icons/fa';
import {Link} from "react-router-dom";

class TaskEntries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskentries: [],
            rows: null
        };
    }

    async getData() {
        let response = await fetch('/dagony/taskentries');
        let responseJson = await response.json();
        return responseJson;
    }

    async refreshData() {
        let loadedData = await this.getData();

        // console.log(loadedData);

        this.setState({
            taskentries: loadedData
        });


    }

    componentDidMount() {
        <IconContext.Provider value={{className: "global-class-name"}}>
            .react-icons {
        }
        </IconContext.Provider>;
        this.refreshData();
    }

    render() {


        return (
            <div>
                <table className={"table-fill"}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>QA-er</th>
                        <th>Project</th>
                        <th>issue-nr</th>
                        <th>issue-pr</th>
                        <th>issue-link</th>
                        <th>man-time</th>
                        <th>auto-time</th>
                        <th>started</th>
                        <th>ended</th>
                        <th><a className={"global-class-name"} href={"/taskentries/Create"}><FaPlusSquare/></a></th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.taskentries.map((item, i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.qa}</td>
                            <td>{item.project}</td>
                            <td>{item.issueNr}</td>
                            <td>{item.issuePr}</td>
                            <td>{item.issueLink}</td>
                            <td>
                                Prep: {item.manPrepTime}<br />
                                performance: {item.manPerfTime}<br />
                                documentation: {item.manDocTime}
                            </td>
                            <td>
                                Prep: {item.autoPrepTime}<br />
                                performance: {item.autoPerfTime}<br />
                                documentation: {item.autoDocTime}
                            </td>
                            <td>{item["started"]}</td>
                            <td>{item["ended"]}</td>
                            <td><Link to={`/taskentries/Edit/${item.id}`}><FaEdit/></Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>);
    }
}

export default TaskEntries;