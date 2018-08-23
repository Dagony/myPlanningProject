import React, {Component} from 'react';
import './App.css';
import MA from "./MA";
import Home from './Home';
import Nav from './Header/Nav';

let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
// let Nav  = require('./Header/Nav');
// let Gantt  = require('./Chart/Gantt');
// let Home  = require('./Home');

/*
Following: https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/
*/

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoom: 'Months',
            messages: []
        };

        // this.data = getJsonData();
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.logTaskUpdate = this.logTaskUpdate.bind(this);
        this.logLinkUpdate = this.logLinkUpdate.bind(this);
    }

    addMessage(message) {
        let messages = this.state.messages.slice();
        let prevKey = messages.length ? messages[0].key : 0;

        messages.unshift({key: prevKey + 1, message});
        if (messages.length > 40) {
            messages.pop();
        }
        this.setState({messages});
    }

    logTaskUpdate(id, mode, task) {
        let text = task && task.text ? ` (${task.text})` : '';
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

            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <Route exact path={'/MA'} component={MA}/>
                        <Route render={function () {
                            return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
