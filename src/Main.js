import React, {Component} from "react";
import gif from './giphs/ok2.gif'
import {Form} from './components/Form'
import Graph from './Graph'
import {Wrapper, Gif, Buttons, Button} from './defaults'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible:false,
            regVisible:false,
            graphVisible:false,
        };
    }

    logged = () =>{this.setState({graphVisible:true})};
    registered = () =>{this.setState({graphVisible:true})};

    renderForm(){
        if(this.state.loginVisible){
            return(
                <Form
                    name="Log in"
                    fields={[
                        {name:"username", label:"Username", type:"text"},
                        {name:"password",label:"Password", type:"password"}]
                    }
                    click={this.logged}
                />
            )
        }
        if(this.state.regVisible){
            return(
                <Form
                    name="Register"
                    fields={[
                        {name:"username", label:"Username", type:"text"},
                        {name:"password",label:"Password", type:"password"},
                        {name:"email",label:"Email Address", type:"email"}]
                    }
                    click={this.registered}
                />
            )
        }
    }


    render() {
        if(this.state.graphVisible) {
            return (<Graph/>)
        }
        return (
            <Wrapper>
                <Gif src={gif}/>
                <Buttons>
                    <Button
                        onClick={() => this.setState({loginVisible: true, regVisible: false})}>Log in</Button>
                    <Button
                        onClick={() => this.setState({loginVisible: false, regVisible: true})}>Sign in</Button>
                </Buttons>
                {this.renderForm()}
            </Wrapper>
        );
    }
}