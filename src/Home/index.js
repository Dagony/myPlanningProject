import React, {Component} from "react";
import Toolbar from "../Chart/Toolbar";
import Gantt from "../Chart/Gantt";
import MessageArea from "../Chart/MessageArea";

// import Gantt from './Chart/Gantt';
// import Toolbar from './Chart/Toolbar';
// import MessageArea from './Chart/MessageArea';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoom: 'Months',
            messages: [],
            data: []
        };

        // this.data = getJsonData();
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.logTaskUpdate = this.logTaskUpdate.bind(this);
        this.logLinkUpdate = this.logLinkUpdate.bind(this);
    }

    addMessage(message) {
        let messages = this.state.messages.slice();
        let prevKey = messages.length ? messages[0].key: 0;

        messages.unshift({key: prevKey + 1, message});
        if(messages.length > 40){
            messages.pop();
        }
        this.setState({messages});
    }

    logTaskUpdate(id, mode, task) {
        let text = task && task.text ? ` (${task.text})`: '';
        let message = `Task ${mode}: ${id} ${text}`;
        this.addMessage(message);
    }

    logLinkUpdate(id, mode, link) {
        let message = `Link ${mode}: ${id}`;
        if (link) {
            message += ` ( source: ${link.source}, target: ${link.target} )`;
        }
        this.addMessage(message)
    }

    handleZoomChange(zoom) {
        this.setState({
            currentZoom: zoom
        });
    }

    render() {
        return (
            <div>
                <h1>Data first, then decide + actions!!!</h1>

                <Toolbar
                    zoom={this.state.currentZoom}
                    onZoomChange={this.handleZoomChange}
                />
                <div className="gantt-container">
                    <Gantt
                        tasks={this.data}
                        zoom={this.state.currentZoom}
                        onTaskUpdated={this.logTaskUpdate}
                        onLinkUpdated={this.logLinkUpdate}
                    />
                </div>
                <MessageArea
                    messages={this.state.messages}
                />
            </div>
        );
    }
}
export default Home;
