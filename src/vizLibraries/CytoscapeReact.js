import React, {Component} from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';
import Cytoscape from 'cytoscape';


Cytoscape.use(COSEBilkent);
export default class CytoscapeReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: {
                name: 'cose-bilkent'//'grid' //random, circle, concentric
            },
            elements: this.props.graph.elements

        }
    }

    componentDidMount() {
        const {elements} = this.props.graph;
        this.setState({elements:elements})
    }

    onRenderCallback(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
    ) {
        console.log('The component', id, ',',
            'actual duration: ', actualDuration, 'base duration: ', baseDuration, ' start time: ', startTime, 'commit time: ', commitTime, interactions);
    }

    render() {
        return (
                <CytoscapeComponent elements={this.props.graph.elements} stylesheet={[
                    {
                        selector: 'node',
                        style: {
                            width: 30,
                            height: 30,
                            backgroundColor: '#e35e94',
                            fontColor: '#eee',
                            label: 'data.label',
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            width: 1,
                            lineColor: '#eee'
                        }
                    }
                ]} style={{width: '80vw', height: '80vh'}} layout={this.state.layout}/>
        );
    }
}
