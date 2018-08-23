import React, {Component} from "react";

class TaskEntries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskentries: [],
            rows: null
        };
    }

    async getData() {
        let response = await fetch('/taskentries');
        let responseJson = await response.json();
        return responseJson.data;
    }

    async refreshData() {
        let loadedData = await this.getData();

        // console.log(loadedData);

        this.setState({
            taskentries: loadedData
        });


    }

    componentDidMount() {
        this.refreshData();
    }

    render() {


        return <div>
            <section id={"top-stats"} >

                <table>
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
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.taskentries.map((item, i) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item["qa-er"]}</td>
                            <td>{item["project"]}</td>
                            <td>{item["issue-nr"]}</td>
                            <td>{item["issue-pr"]}</td>
                            <td>{item["issue-link"]}</td>
                            <td>{item["man-time"]}</td>
                            <td>{item["auto-time"]}</td>
                            <td>{item["started"]}</td>
                            <td>{item["ended"]}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>

            </section>

        </div>;
    }
}

export default TaskEntries;