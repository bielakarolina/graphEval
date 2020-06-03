import React, {Component} from "react";
import { Graph } from 'react-d3-graph';
import {Title} from "../defaults";

export default class D3React extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : {
                nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
                links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
            },
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

    // componentDidMount() {
    //     this.setState({d3: node});
    // }

    onClickNode(nodeId) {
        window.alert('Clicked node ${nodeId}');
    };

    onMouseOverNode(nodeId) {
        window.alert(`Mouse over node ${nodeId}`);
    };

    onMouseOutNode(nodeId) {
        window.alert(`Mouse out node ${nodeId}`);
    };

    onClickLink(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    onMouseOverLink(source, target) {
        window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    onMouseOutLink(source, target) {
        window.alert(`Mouse out link between ${source} and ${target}`);
    };


    render() {
        return (
            <div>
                <Title>Tajksldgndflg</Title>
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