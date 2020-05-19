import React, {Component} from "react";
import styled from "styled-components";
import gif from './ok2.gif'

const Wrapper = styled.div`
    width:100vw; 
    height:100vh;
    display:flex; 
    position:relative;
    background-color:#2e2e2e;
`;

const Graph = styled.div`
    padding:0;
    width:100%;
    height: 100vh;    
    background-color: #303030;
`;

const Giph = styled.img`
    position:absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-90%);
    width: 400px;
    height: 300px;
`;

const Buttons = styled.div`
    position:absolute;
    top:65%;
    left:50%;
    transform: translate(-50%,-50%);
    width:400px;
    display:flex;
    justify-content:space-between;
    padding:15px;

`;
const Button = styled.button`
    width: 170px;
    height: 50px;
    color:#57cab0;
    margin: 0 7px;
    background-color: #2e2e2e;
    text-align:center;
    border: 1.5px solid #57cab0;
    font-family: 'Lato', sans-serif;    
    text-transform:uppercase;
    font-weight:400;
    font-size: 24px;
    transition: all .3s;
    letter-spacing:1px;
    
    &:hover{
        background-color:#57cab0;
        box-shadow:1px 1px 25px #57cab0;
        color:#2e2e2e;
    }
`;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph:[]
        };
        this.getData = this.getData.bind(this);
    }

    async getData(event, data){
        this.setState({data: null});
        // await fetch(`http://localhost:3800/generate/${data.project}/${data.graph}`)
        //     .then(res => res.json())
        //     .then(
        //         result => {
        //             const arr = this.state.graphs;
        //             arr.push({name: data.graph});
        //             this.setState({
        //                 data: result.data,
        //                 graphs: arr
        //             });
        //         }
        //     );
    }

    render() {
        return (
            <Wrapper>
                <Giph src={gif}/>
                <Buttons>
                    <Button>Log in</Button>
                    <Button>Sign in</Button>
                </Buttons>
                {/*<Graph>*/}
                    {/*<VisReact/>*/}
                {/*</Graph>*/}
            </Wrapper>
        );
    }
}