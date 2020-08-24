import React, {Component} from "react";
import { Graph } from 'react-d3-graph';
import {Title} from "../defaults";

export default class D3React extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.graph,
            myConfig: {
                nodeHighlightBehavior: true,
                width: 1600,
                height: 800,
                node: {
                    color: 'lightgreen',
                    fontColor: "white",
                    size: 1000,
                    highlightStrokeColor: 'blue',
                    labelProperty: "name",
                    fontSize: 14
                },
                link: {
                    labelProperty : "label",
                    highlightColor: 'lightblue'
                }
            }
        }
    }

    onClickNode(nodeId) {
    };

    onMouseOverNode(nodeId) {
    };

    onMouseOutNode(nodeId) {
    };

    onClickLink(source, target) {
    };

    onMouseOverLink(source, target) {
    };

    onMouseOutLink(source, target) {
    };

    onRenderCallback(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
    ) {
        console.log( 'The component', id, ',',
            'actual duration: ', actualDuration, 'base duration: ', baseDuration,' start time: ', startTime, 'commit time: ',commitTime, interactions);
    }
    render() {
        return (
            <div>
                <Graph
                    id="graph-id"
                    data={this.state.data}
                    config={this.state.myConfig}
                    onClickNode={this.onClickNode}
                    onClickLink={this.onClickLink}
                    onMouseOverNode={this.onMouseOverNode}
                    onMouseOutNode={this.onMouseOutNode}
                    onMouseOverLink={this.onMouseOverLink}
                    onMouseOutLink={this.onMouseOutLink}
                />;
            </div>
        )
    }
};