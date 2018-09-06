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
        let response = await fetch('/testtask/all');
        return await response.json();
    }

    async refreshData() {
        let loadedData = await this.getData();

        this.setState({
            taskentries: loadedData
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    render() {
        return (
            <IconContext.Provider value={{className: "global-class-name"}}>
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
                            <th><a className={"global-class-name"} href={"/TaskEntries/Create"}><FaPlusSquare/></a></th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.taskentries.map((item, i) => (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.qa}</td>
                                <td>{item.project}</td>
                                <td>{item["issuenr"]}</td>
                                <td>{item["issuepr"]}</td>
                                <td>{item["issuelink"]}</td>
                                <td>
                                    Prep: {item["manpreptime"]}<br />
                                    performance: {item["manperftime"]}<br />
                                    documentation: {item["mandoctime"]}
                                </td>
                                <td>
                                    Prep: {item["autopreptime"]}<br />
                                    performance: {item["autoperftime"]}<br />
                                    documentation: {item["autodoctime"]}
                                </td>
                                <td>{item["started"]}</td>
                                <td>{item["ended"]}</td>
                                <td><Link to={`/TaskEntries/Edit/${item.id}`}><FaEdit/></Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </IconContext.Provider>);
    }
}

export default TaskEntries;