/*global gantt*/
import React, {Component} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
    setZoom(value) {
        switch (value) {
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    {unit: 'hour', step: 1, date: '%H'}
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "#%W";
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%d %M"}
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%F";
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    {unit: "week", step: 1, date: "#%W"}
                ];
                break;
            default:
                break;
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    initGanttEvents() {
        if (gantt.ganttEventsInitialized) {
            return;
        }
        gantt.ganttEventsInitialized = true;

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            if (this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'inserted', task);
            }
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            // Convert dhtmlx Gantt chart task data to my model
            let myObject = {
                id: task.id,
                text: task.text,
                startDate: new Date(task.start_date).toISOString().slice(0,10),
                duration: task.duration,
                progress: Number.parseFloat(task.progress).toFixed(2),
                parent: task.parent
            };

            // Send Updated task data to the backend
            if (this.props.onTaskUpdated) {
                fetch("/dagony/gantttasks", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(myObject)
                }).then((response) => {
                    // console.log("This is the response: \n" + JSON.stringify(response, null, 2));
                    return response.json()
                })
                .then((json) => {
                    console.log(JSON.stringify(json))
                });
                this.props.onTaskUpdated(id, 'updated', task);
            }
            gantt.render();
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            if (this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'deleted');
            }
        });

        gantt.attachEvent('onAfterLinkAdd', (id, link) => {
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'inserted', link);
            }
        });

        gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'updated', link);
            }
        });

        gantt.attachEvent('onAfterLinkDelete', (id, link) => {
            alert("You've just clicked an item with id=" + id);
            if (this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'deleted');
            }
        });


    }

    componentDidMount() {
        this.initGanttEvents();
        let _data = [];
        let _links = [];
        let dp = new gantt.dataProcessor("/dagony/gantttasks");
        dp.init(gantt);
        dp.setTransactionMode("REST");

        fetch(
            "/dagony/gantttasks"
        ).then((response) => {
                return response.json();
            }
        ).then((json) => {
            // console.log(json);
            // json.start_date = json.startDate;

            for (let i = 0; i < json.length; i++) {
                let myDate = new Date(json[i].startDate);
                _data.push(
                    {
                        id: json[i].id,
                        text: json[i].text,
                        start_date: myDate,
                        duration: json[i].duration,
                        progress: parseFloat(json[i].progress).toFixed(4),
                        parent: json[i].parent
                    }
                );
            }

            fetch(
                "/dagony/ganttlinks"
            ).then((response) => {
                return response.json();
            }).then((json) => {


                _links = json;
                // console.log(_links);
                //
                // // _data.start_date = _data.start_date.toISOString().slice(0,10);
                //
                // console.log(_data);


                gantt.parse({
                    data: _data,
                    links: _links
                });


                (function () {

                    gantt._show_tooltip = function (text, pos) {
                        if (gantt.config.touch && !gantt.config.touch_tooltip) return;

                        let tip = this._create_tooltip();

                        tip.innerHTML = text;
                        gantt.$task_data.appendChild(tip);

                        let width = tip.offsetWidth + 20;
                        let height = tip.offsetHeight + 40;
                        let max_height = window.outerHeight;
                        let max_width = this.$task.offsetWidth;
                        let scroll = this.getScrollState();

                        gantt._waiAria.tooltipVisibleAttr(tip);

                        pos.y += scroll.y;

                        let mouse_pos = {
                            x: pos.x,
                            y: pos.y
                        };

                        pos.x += (gantt.config.tooltip_offset_x * 1 || 0);
                        pos.y += (gantt.config.tooltip_offset_y * 1 || 0);

                        pos.y = Math.min(Math.max(scroll.y, pos.y), scroll.y + max_height - height);
                        pos.x = Math.min(Math.max(scroll.x, pos.x), scroll.x + max_width - width);

                        if (gantt._is_cursor_under_tooltip(mouse_pos, {pos: pos, width: width, height: height})) {
                            if ((mouse_pos.x + width) > (max_width + scroll.x)) pos.x = mouse_pos.x - (width - 20) - (gantt.config.tooltip_offset_x * 1 || 0);
                            if ((mouse_pos.y + height) > (max_height + scroll.y)) pos.y = mouse_pos.y - (height - 40) - (gantt.config.tooltip_offset_y * 1 || 0);
                        }

                        tip.style.left = pos.x + "px";
                        tip.style.top = pos.y + "px";
                        // tip.style.zIndex = 999;
                    };

                })();
                // resolve();
            });
        });


        // Define the look of the tasks
        gantt.templates.task_text = function (start, end, task) {
            return "<span style='text-align: left'> " + formatProgress(task.progress) + " </span>" + task.text;
        };

        // gantt.
        gantt.config.columns = [
            {name: "text", label: "Task name", tree: true, width: 300, resize: true},
            {name: "start_date", label: "Start time", align: "center"},
            {name: "duration", label: "Days", align: "center"},
            {
                name: "progress", label: "Progress", width: 100, align: "center", template: function (obj) {
                    return formatProgress(obj.progress);
                }
            },
            {name: "add", label: "", width: 44}
        ];

        gantt.config.keep_grid_width = false;

        gantt.addMarker({
            start_date: new Date(),
            css: "today",
            text: "Now",
            title: new Date().toLocaleDateString('nl-NL', {timeZone: 'GMT'})
        });

        gantt.init(this.ganttContainer);

        // Define the look of the tooltip hovering over tasks
        gantt.templates.tooltip_text = function (start, end, task) {
            let textDetail = task.text_detail ? task.text_detail : '';
            return "<b>Task: </b>" + task.text + "<br />" +
                "<b>Duration: </b>" + task.duration + " days<br/>" +
                "<b>Progress: </b>" + formatProgress(task.progress) + " <br/>" +
                "<b>Start date: </b>" + task.start_date.toLocaleDateString('nl-NL', {timeZone: 'GMT'}) + "<br />" +
                "<b>End date: </b>" + task.end_date.toLocaleDateString('nl-NL', {timeZone: 'GMT'}) + "<br />" +
                textDetail;
        };


        dp.destructor();
        //
        //
        // gantt.parse(tasks);
    }

    render() {
        this.setZoom(this.props.zoom);

        return (
            <div
                ref={(input) => {
                    this.ganttContainer = input
                }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}

function formatProgress(progress) {
    return (progress * 100) + "%";
}
