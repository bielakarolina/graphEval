import React, {Component} from "react";
import CytoscapeComponent from 'react-cytoscapejs';

export default class CytoscapeReact extends Component {
    constructor(props) {
        super(props);
        this.state ={
            layout: {
                name: 'random'//'grid' //random, circle, concentric
            },
            elements : this.props.graph.elements

    }
    }

    componentDidMount(){
        const {elements} = this.props.graph;

        this.setState({elements:elements});
    }
    render(){
        return <CytoscapeComponent elements={this.state.elements} style={{width: '80vw', height: '100vh'}} layout={this.state.layout}/>;
    }
}
