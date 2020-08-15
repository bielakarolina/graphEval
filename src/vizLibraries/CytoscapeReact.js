import React, {Component} from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import Cytoscape from 'cytoscape';


Cytoscape.use(COSEBilkent);
export default class CytoscapeReact extends Component {
    constructor(props) {
        super(props);
        this.state ={
            layout: {
                name: 'cose-bilkent'//'grid' //random, circle, concentric
            },
            elements : this.props.graph.elements

    }
    }

    componentDidMount(){
        const {elements} = this.props.graph;

        console.log(elements);

        this.setState({elements:elements});
    }
    render(){
        console.log(this.state.elements)
        return <CytoscapeComponent elements={this.state.elements} stylesheet={[
            {
                selector: 'node',
                style: {
                    width: 30,
                    height: 30,
                    backgroundColor: '#e35e94',
                    fontColor:'#eee',
                    label: 'data(label)',
                    color:'white',
                    fontSize:12
                }
            },
            {
                selector: 'edge',
                style: {
                    width: 1,
                    lineColor: '#eee'
                }
            }
        ]} style={{width: '80vw', height: '80vh'}} layout={this.state.layout}/>;
    }
}
