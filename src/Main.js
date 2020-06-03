import React, {Component} from "react";
import gif from './giphs/ok2.gif'
import {Form} from './components/Form'
import Graph from './Graph'
import {Wrapper, Gif, Buttons, Button, Success, Alert} from './defaults'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible:false,
            regVisible:false,
            graphVisible:false,
            registeredUsers:[],
            username: null,
            password:null,
            email:null,
            successStatus:false,
            requiredValue:false,
            badLoginStatus:false,
            mustRegister:false
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onEmailChange.bind(this);
        this.cleanAlerts = this.cleanAlerts.bind(this);
    }


    onEmailChange(e){
        this.setState({email: e.target.value})
    }
    onPasswordChange(e){
        this.setState({password: e.target.value})

    }
    onUsernameChange(e){
        this.setState({username: e.target.value})
    }

    cleanAlerts() {
        this.setState({
            successStatus:false,
            requiredValue:false,
            badLoginStatus:false,
            mustRegister:false
        })
    }


    logged = () =>{

       this.cleanAlerts();

        if(this.state.registeredUsers.length === 0){
            this.setState({mustRegister:true})
        }

        this.state.registeredUsers.forEach(user => {
            if((user.username === this.state.username || user.email === this.state.username) && user.password === this.state.password){
                this.setState({graphVisible:true})
            }
            else this.setState({badLoginStatus:true})

        });
    };

    registered = () =>{
        this.cleanAlerts();

        const registered = this.state.registeredUsers;
        if(this.state.username && this.state.password && this.state.email) {
            registered.push({username: this.state.username, password: this.state.password, email: this.state.email});
            this.setState({registeredUsers: registered, regVisible: false, loginVisible: true, successStatus: true});
        }
        else this.setState({username: null, password:null, email:null, requiredValue:true});
    };

    renderForm(){
        if(this.state.loginVisible){
            return(
                <Form
                    name="Log in"
                    fields={[
                        {name:"username", label:"Username", type:"text", change: (e) => this.setState({username: e.target.value}), value: this.state.username},
                        {name:"password",label:"Password", type:"password", change: (e) => this.setState({password: e.target.value}), value:this.state.password}]
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
                        {name:"username", label:"Username", type:"text",  value: this.state.username, change: (e) => this.setState({username: e.target.value})},
                        {name:"password",label:"Password", type:"password", value:this.state.password, change: (e) => this.setState({password: e.target.value})},
                        {name:"email",label:"Email Address", type:"email",value:this.state.email,  change: (e) => this.setState({email: e.target.value})}]
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
                {this.state.successStatus && <Alert success>Zarejestrowano pomyślnie</Alert>}
                {this.state.badLoginStatus && <Alert>Błąd logowania</Alert>}
                {this.state.requiredValue && <Alert >Wypełnij wszystkie pola</Alert>}
                {this.state.mustRegister && <Alert >Musisz się zarejestrować</Alert>}
            </Wrapper>
        );
    }
}