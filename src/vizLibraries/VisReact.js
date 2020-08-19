import React, {Component, Profiler} from "react";
import Graph from "vis-react";
let highlightActive = false;

const graph = {
    nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
    ]
};

const options = {
    layout: {
        randomSeed: 32
    },
    groups: {
        0: {color: "#fff400"},
        1: {color: "#e35e94"},
        2: {color: "#5ee3ad"},
        3: {color: "#ad5ee3"},
        4: {color: "#fff400"},
        5: {color: "#f67307"},
        6: {color: "#07d8f6"},
        7: {color: "#f4a9e6 "},
        8: {color: "#b73461"},
        9: {color: "#6dce3a"},
        10: {color: "#c062ea"},

    },
    nodes: {
        shape: "dot",
        size: 50,
        color: "#e35e94",
        borderWidth: 0,
        borderWidthSelected: 2,

        font: {
            size: 15,
            align: "center",
            color: "#ffffff",
            bold: {
                color: "#ffffff",
                size: 15,
                vadjust: 0,
                mod: "bold"
            }
        }
    },
    edges: {
        width: 1,
        color: {
            color: "#D3D3D3",
            highlight: "#f67307",
            hover: "#e35e94",
            opacity: 1.0
        },
        arrows: {
            to: {enabled: true, scaleFactor: 1, type: "arrow"},
            middle: {enabled: false, scaleFactor: 1, type: "arrow"},
            // from: { enabled: true, scaleFactor: 1, type: "arrow" }
        },
        smooth: {
            enabled: false,
        }
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -30000,
            centralGravity: 1,
            springLength: 70,
            avoidOverlap: 1
        },
        stabilization: {iterations: 10}
    },
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectable: true,
        selectConnectedEdges: false,
        zoomView: true,
        navigationButtons: true,
        keyboard: true,
        dragView: true
    }

};


export default class VisReact extends Component {

    setState(stateObj) {
        if (this.mounted) {
            super.setState(stateObj);
        }
    }

    componentWillMount() {
        this.mounted = true;
    }

    constructor(props) {
        super(props);
        this.events = {
            hoverNode: function (event) {
                this.neighbourhoodHighlight(event);
            },
            blurNode: function (event) {
                this.neighbourhoodHighlightHide(event);
            },
            hoverEdge: function (event) {
                this.neighbourhoodHighlight(event);
            },
            blurEdge: function (event) {
                this.neighbourhoodHighlightHide(event);
            },
            stabilized: function (event) {
                this.onstabilized(event);
            }
        };
        this.state = {
            graph: this.props.graph,
            options: options,
            style: {width: "100%", height: "100%"},
            network: null,
            ready: false
         };
        this.measure = this.measure.bind(this);
        this.events.hoverNode = this.events.hoverNode.bind(this);
        this.events.blurNode = this.events.blurNode.bind(this);
        this.events.hoverEdge = this.events.hoverEdge.bind(this);
        this.events.blurEdge = this.events.blurEdge.bind(this);
        this.events.stabilized = this.events.stabilized.bind(this);
        this.neighbourhoodHighlight = this.neighbourhoodHighlight.bind(this);
        this.neighbourhoodHighlightHide = this.neighbourhoodHighlightHide.bind(
            this
        );
    }

    async componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener("resize", this.measure);
    }

    measure() {
        this.state.network.redraw();
        this.state.network.fit();
    }

    onstabilized(params){
        this.props.callback()
    }

    neighbourhoodHighlight(params) {
        let allNodes = this.state.graph.nodes;
        let Nodes = new this.vis.DataSet(allNodes);
        let cloneNodes = Nodes.get({returnType: "Object"});
        this.state.network.canvas.body.container.style.cursor = "pointer";

        let allEdges = this.state.graph.edges;
        let Edges = new this.vis.DataSet(allEdges);
        let cloneEdges = Edges.get({returnType: "Object"});

        for (let edgeId in cloneEdges) {
            cloneEdges[edgeId].color = options.edges.color;
        }

        if (params.node !== undefined) {
            highlightActive = true;
            let i, j;
            let selectedNode = params.node;
            let degrees = 1;

            for (let nodeId in cloneNodes) {
                cloneNodes[nodeId].color = "rgba(200,200,200,0.5)";
                if (cloneNodes[nodeId].hiddenLabel === undefined) {
                    cloneNodes[nodeId].hiddenLabel = cloneNodes[nodeId].label;
                    cloneNodes[nodeId].label = undefined;
                }
            }

            let connectedNodes = this.state.network.getConnectedNodes(selectedNode);
            let allConnectedNodes = [];
            for (i = 1; i < degrees; i++) {
                for (j = 0; j < connectedNodes.length; j++) {
                    allConnectedNodes = allConnectedNodes.concat(
                        this.state.network.getConnectedNodes(connectedNodes[j])
                    );
                }
            }

            for (i = 0; i < allConnectedNodes.length; i++) {
                cloneNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.75)";
                if (cloneNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                    cloneNodes[allConnectedNodes[i]].label =
                        cloneNodes[allConnectedNodes[i]].hiddenLabel;
                    cloneNodes[allConnectedNodes[i]].hiddenLabel = undefined;
                }
            }

            for (let i = 0; i < connectedNodes.length; i++) {
                cloneNodes[connectedNodes[i]].color = '#f1a883';
                if (cloneNodes[connectedNodes[i]]["hiddenLabel"] !== undefined) {
                    cloneNodes[connectedNodes[i]].label =
                        cloneNodes[connectedNodes[i]]["hiddenLabel"];
                    const fontSize = this.state.network.body.nodes;
                    fontSize[connectedNodes[i]].options.font.size = 15;
                    cloneNodes[connectedNodes[i]]["hiddenLabel"] = undefined;
                }
            }

        } else if (highlightActive === true) {
            for (let nodeId in cloneNodes) {
                cloneNodes[nodeId].color = options.groups[cloneNodes[nodeId].group];
                if (cloneNodes[nodeId]["hiddenLabel"] !== undefined) {
                    cloneNodes[nodeId].label = cloneNodes[nodeId]["hiddenLabel"];
                    const fontSize = this.state.network.body.nodes;
                    fontSize[nodeId].options.font.size = 15;
                    cloneNodes[nodeId]["hiddenLabel"] = undefined;
                }
            }
            highlightActive = false;
        }

        let updateArray = [];
        for (let nodeId in cloneNodes) {
            if (cloneNodes.hasOwnProperty(nodeId)) {
                updateArray.push(cloneNodes[nodeId]);
            }
        }

        let edgeArray = [];
        for (let nodeId in cloneEdges) {
            if (cloneEdges.hasOwnProperty(nodeId)) {
                edgeArray.push(cloneEdges[nodeId]);
            }
        }

        if (this.mounted) {
            this.setState({
                graph: {
                    nodes: updateArray,
                    edges: edgeArray
                }
            });
        }
    }

    neighbourhoodHighlightHide() {
        let allNodes = this.state.graph.nodes;

        let Nodes = new this.vis.DataSet(allNodes);
        let SelectedNodes = new this.vis.DataSet(this.state.selectedNodes);
        let allNodess = Nodes.get({returnType: "Object"});
        let selectedNodes = SelectedNodes.get({returnType: "Object"});

        let allEdges = this.state.graph.edges;
        let Edges = new this.vis.DataSet(allEdges);
        let cloneEdges = Edges.get({returnType: "Object"});

        for (let edgeId in cloneEdges) {
            cloneEdges[edgeId].color = options.edges.color;
        }

        this.state.network.canvas.body.container.style.cursor = "default";

        for (let nodeId in allNodess) {
            allNodess[nodeId].color = "#c062ea";
            if (allNodess[nodeId].hiddenLabel === undefined) {
                allNodess[nodeId].hiddenLabel = allNodess[nodeId].label;
                allNodess[nodeId].label = undefined;
            }
        }

        highlightActive = true;
        if (highlightActive === true) {
            for (let nodeIds in allNodess) {
                allNodess[nodeIds].color = options.groups[allNodess[nodeIds].group];
                if (allNodess[nodeIds].hiddenLabel !== undefined) {
                    allNodess[nodeIds].label = allNodess[nodeIds].hiddenLabel;
                    const fontSize = this.state.network.body.nodes;
                    fontSize[nodeIds].options.font.size = 15;
                    allNodess[nodeIds].hiddenLabel = undefined;
                }
            }
            highlightActive = false;
        }

        var updateArray = [];
        for (var nodeIde in allNodess) {
            if (allNodess.hasOwnProperty(nodeIde)) {
                updateArray.push(allNodess[nodeIde]);
            }
        }

        let edgeArray = [];
        for (let nodeId in cloneEdges) {
            if (cloneEdges.hasOwnProperty(nodeId)) {
                edgeArray.push(cloneEdges[nodeId]);
            }
        }

        if (this.mounted) {
            this.setState({
                graph: {
                    nodes: updateArray,
                    edges: edgeArray
                }
            });
        }
    }
    
    getNetwork = data => {
        this.setState({network: data});
    };
    getEdges = data => {
        console.log(data);
    };
    getNodes = data => {
        console.log(data);
    };
    onFinish() {
        console.log( 'Heh');
    }

    render() {
        const{
            graph,
            style
        } = this.state;


        this.props.callfront();

        return (
                <Graph
                    graph={graph}
                    options={options}
                    events={this.events}
                    style={style}
                    getNetwork={this.getNetwork}
                    getEdges={this.getEdges}
                    getNodes={this.getNodes}
                    vis={vis => (this.vis = vis)}
                />
        );
    }
}
