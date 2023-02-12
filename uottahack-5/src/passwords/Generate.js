import React, { Component } from "react";
import axios from 'axios';
import './Generate.css';

class Generate extends Component{

    constructor(props){
        super(props)
        this.state = {
            numbers: false,
            capitals: false,
            symbols: false,
            value: 21,
            passphrase: "",
            password: "",
        }
        this.generatePassword = this.generatePassword.bind(this);
        this.generatePassphrase = this.generatePassphrase.bind(this);
    }

    async generatePassword(e){
        e.preventDefault();
        console.log("generate new password");
        this.setState({passphrase: ""});

        let options = {
            method: 'GET',
            url: `http://localhost:8080/api/password/${this.state.value}/${this.state.numbers}/${this.state.capitals}/${this.state.symbols}`,
            mode: 'no-cors'
        }

        axios.request(options).then(response =>{
            //password and passphrase
            this.setState({
                password: response.data.password
            });
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    async generatePassphrase(e){
        e.preventDefault();
        console.log("generate new passphrase");
        this.setState({password: ""});

        let options = {
            method: 'GET',
            url: `http://localhost:8080/api/passphrase/${this.state.value}/${this.state.numbers}/${this.state.capitals}/${this.state.symbols}`,
            mode: 'no-cors'
        }

        axios.request(options).then(response =>{
            //password and passphrase
            this.setState({
                passphrase: response.data.passphrase
            });
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    changeValue = event => {
        this.setState({value: event.target.value});
        // console.log(event.target.value);
    }

    changeNumbersBox = event => {
        this.setState({numbers: event.target.checked});
        // console.log(event.target.checked);
    }

    changeCapitalsBox = event => {
        this.setState({capitals: event.target.checked});
        // console.log(event.target.checked);
    }

    changeSymbolsBox = event => {
        this.setState({symbols: event.target.checked});
        // console.log(event.target.checked);
    }

    copyMyPassword(){
        var textToCopy = document.getElementById("copyPassword");
        textToCopy.select();
        document.execCommand("copy");
    }

    copyMyPassphrase(){
        var textToCopy = document.getElementById("copyPassphrase");
        textToCopy.select();
        document.execCommand("copy");
    }

    render(){

        return(
            <>
                <div className="body">
                    <h1>Password Generator</h1>
                    <p>Choose a secure password using our tool !</p>

                    <div className="checkboxes">
                        <input type="checkbox" id="numbers" onClick={this.changeNumbersBox}></input>
                        <label htmlFor="numbers">Include numbers</label><br></br>
                        <input type="checkbox" id="capitals" onClick={this.changeCapitalsBox}></input>
                        <label htmlFor="capitals">Include capitals letters</label><br></br>
                        <input type="checkbox" id="symbols" onClick={this.changeSymbolsBox}></input>
                        <label htmlFor="symbols">Include symbols</label><br></br>
                    </div>
                    

                    <div className="slider-container">
                        <input type="range" className="slide" id="slider" min="12" max="30" value={this.value} step={1} onChange={this.changeValue}/>
                    </div>

                    <div className="buttons">
                        <button onClick={(e) => this.generatePassword(e)}>Generate Password</button>
                        <button onClick={(e) => this.generatePassphrase(e)}>Generate Passphrase</button>
                    </div>

                    {(this.state.password != "") || (this.state.passphrase != "")? 
                        <div className="generated-password">
                            {this.state.password != "" ?
                                <div>
                                    <label htmlFor="copyPassword">Generated Password : </label>
                                    <input type="text" value={this.state.password} readOnly id="copyPassword"></input>
                                    <button onClick={this.copyMyPassword}>Copy</button>
                                </div>
                            : 
                                <div>
                                    <div>
                                    <label htmlFor="copyPassphrase">Generated Passphrase : </label>
                                        <input type="text" value={this.state.passphrase} readOnly id="copyPassphrase"></input>
                                        <button onClick={this.copyMyPassphrase}>Copy</button>
                                    </div>
                                </div>
                            }
                        </div>
                        
                         
                    : <div></div>}
                </div>
            </>
        )
    }
}

export default Generate;