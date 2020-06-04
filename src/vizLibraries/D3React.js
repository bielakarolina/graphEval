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
                node: {
                    color: 'lightgreen',
                    size: 120,
                    highlightStrokeColor: 'blue'
                },
                link: {
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