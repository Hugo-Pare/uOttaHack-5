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
            value: 14,
            passphrase: "",
            password: ""
        }
        this.generatePassword = this.generatePassword.bind(this)
    }

    async generatePassword(e){
        e.preventDefault();
        console.log("generate new password");

        const options = {
            method: 'GET',
            url: `http://localhost:8080/api/password/${this.state.value}/${this.state.value}`,
            mode: 'no-cors'
        }

        axios.request(options).then(function (response){
            //password and passphrase
            this.setState({
                password: response.data.password,
                passphrase: response.data.passphrase
            });
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    async checkPasswordStrength(e){
        e.preventDefault();

        const axios = require("axios");

        const options = {
            method: 'GET',
            url: 'https://check-password-strength-with-zxcvbn1.p.rapidapi.com/check-password-strength',
            params: {password: '1239902'},
            headers: {
                'X-RapidAPI-Key': '85dc47a48dmsh35be22abe4ae707p136415jsn4ec8736e73bc',
                'X-RapidAPI-Host': 'check-password-strength-with-zxcvbn1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
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
                        <input type="range" className="slide" id="slider" min="8" max="20" value={this.value} step={1} onChange={this.changeValue}/>
                    </div>

                    <div className="button">
                        <button onClick={(e) => this.generatePassword(e)}>Generate</button>
                    </div>

                    {this.state.password == "" ? 
                        <div>
                            <div>
                                <input type="text" value={this.state.password} readOnly id="copyPassword"></input>
                                <button onClick={this.copyMyPassword}>Copy To Clipboard</button>
                            </div>
                            <div>
                                <input type="text" value={this.state.passphrase} readOnly id="copyPassphrase"></input>
                                <button onClick={this.copyMyPassphrase}>Copy To Clipboard</button>
                            </div>
                        </div>
                        
                         
                    : <div></div>}
                </div>
            </>
        )
    }
}

export default Generate;