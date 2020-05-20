import React, {Component} from "react";
import styled from "styled-components";
import VisReact from './vizLibraries/VisReact'
import {Wrapper,Title} from "./defaults";

const GraphContainer = styled.div`
    padding:0;
    width:80%;
    height: 100vh;    
    background-color: #2e2e2e;
`;

const OptionsContainer = styled.div`
    padding:0;
    width:20%;
    height: 100vh;    
    background-color: #303030;
`;


export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: [],
            availLibs: ['Vis', 'D3', 'Cytoscape'],
            availDataSets: ['Test', 'BigData', 'Cars', 'Weather', 'Bank transactions'],
            currentDataBase: 'Neo4J',
            currentLib: ['Vis'],
            currentDataSet: ['Test']
        };
        this.getData = this.getData.bind(this);
    }

    async componentDidMount(){
        await this.getData()
    }

    async getData() {
        await fetch(`http://localhost:9000/data`)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        graph: result.data,
                    });
                }
            );
    }

    renderOptions = () => {

    }

    render() {
        return (
            <Wrapper row>
                <OptionsContainer>
                    <Title>Testing options</Title>
                    {this.renderOptions}
                </OptionsContainer>
                {this.state.graph.nodes &&
                <GraphContainer>
                    <VisReact graph={this.state.graph}/>
                </GraphContainer>
                }
            </Wrapper>
        );
    }
}