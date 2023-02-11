import React, { Component } from "react";
import axios from 'axios';
import './Generate.css';

class Generate extends Component{

    state = {
        numbers: false,
        capitals: false,
        symbols: false,
        value: 14,
        generatedPassword: false
    }

    async generatePassword(e){
        e.preventDefault();
        console.log("generate new password");

        await fetch(`http://localhost:8080/api/password/${this.state.value}/${this.state.value}`, {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
        .then(response => response.json())
        .then(response => this.setState({passwords: response}))
        .then(() => {
            console.log('Results', this.state.response);
        })
        .catch(error =>{console.log(error)})

        // const response = await axios.get("http://localhost:8080/",{ params: {length: this.state.value}});
        // console.log(response.data);
        this.setState({generatePassword: true})
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

                    {this.state.generatedPassword ? 
                        <div>
                            <div>
                                <input type="text" value="123Password!" readOnly id="copyPassword"></input>
                                <button onClick={this.copyMyPassword}>Copy To Clipboard</button>
                            </div>
                            <div>
                                <input type="text" value="123PasswordPhrase!" readOnly id="copyPassphrase"></input>
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