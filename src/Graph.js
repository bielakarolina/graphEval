import React, {Component} from "react";
import styled from "styled-components";
import VisReact from './vizLibraries/VisReact'
import {Wrapper, Title} from "./defaults";
import {OptionButton} from "./components/OptionButton";

const GraphContainer = styled.div`
    padding:0;
    width:80%;
    height: 100vh;    
    background-color: #2e2e2e;
`;

const OptionsContainer = styled.div`
    padding:0;
    width:20%;
    background-color: #303030;
`;

const OptionsWrapper = styled.div`
    width: calc(100% - 20px);
    padding:0 7px;
`;

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: [],
            availLibs: ['Vis', 'D3', 'Cytoscape'],
            availDataSets: ['Test', 'BigData', 'Cars', 'Weather', 'Bank transactions'],
            availDataBases: ['Neo4J', 'OrionDB', 'ArangoDB'],
            currentDataBase: 'Neo4J',
            currentLib: 'Vis',
            currentDataSet: 'Test'
        };
        this.getData = this.getData.bind(this);
        this.handleLibChange = this.handleLibChange.bind(this);
        this.handleDataSetChange = this.handleDataSetChange.bind(this);
        this.handleDataBaseChange = this.handleDataBaseChange.bind(this);
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

    handleLibChange(name){
        this.setState({currentLib: name});
    }
    handleDataSetChange(name){
        this.setState({currentDataSet: name});
    }
    handleDataBaseChange(name){
        this.setState({currentDataBase: name});
    }

    renderOptions = () => {

        return(
            <OptionsWrapper>

                <Title small color='pink'>Libraries</Title>
                {this.state.availLibs.map(lib => {
                    return <OptionButton click={() => this.handleLibChange(lib)} name={lib}/>
                })}

                <Title small color='pink'> DataSets</Title>
                {this.state.availDataSets.map(lib => {
                    return <OptionButton click={() => this.handleDataSetChange(lib)} name={lib}/>
                })}

                <Title small color='pink'>Databases</Title>
                {this.state.availDataBases.map(lib => {
                    return <OptionButton click={() => this.handleDataBaseChange(lib)} name={lib}/>
                })}

            </OptionsWrapper>
        );

    };

    render() {
        const {
            currentDataBase,
            currentLib,
            currentDataSet
        } = this.state;

        return (
            <Wrapper row>
                <OptionsContainer>
                    <Title color='pink'>Testing options</Title>

                    {this.state.availLibs && this.renderOptions()}
                </OptionsContainer>
                {this.state.graph.nodes &&
                <GraphContainer>
                    <Title color='pink'>Currently using: <bold>{currentLib}</bold> with {currentDataBase} on {currentDataSet} dataset </Title>
                    <VisReact graph={this.state.graph}/>
                </GraphContainer>
                }
            </Wrapper>
        );
    }
}