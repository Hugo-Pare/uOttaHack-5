import React, { Component } from "react";
import axios from 'axios';

class Generate extends Component{

    state = {
        numbers: false,
        capitals: false,
        symbols: false,
        value: 14
    }

    async generatePassword(e){
        e.preventDefault();
        console.log("generate new password");
        const response = await axios.get("http://localhost:8080/",{ params: {length: this.state.value}});
        console.log(response.data);
        // console.log("numbers : " + this.state.numbers);
        // console.log("capitals : " + this.state.capitals);
        // console.log("symbols : " + this.state.symbols);
        // console.log("value : " + this.state.value);
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


    render(){
        return(
            <>
                <h1>Password Generator</h1>
                <p>Choose a secure password using our tool !</p>

                <input type="checkbox" id="numbers" onClick={this.changeNumbersBox}></input>
                <label htmlFor="numbers">Include numbers</label><br></br>
                <input type="checkbox" id="capitals" onClick={this.changeCapitalsBox}></input>
                <label htmlFor="capitals">Include capitals letters</label><br></br>
                <input type="checkbox" id="symbols" onClick={this.changeSymbolsBox}></input>
                <label htmlFor="symbols">Include symbols</label><br></br>

                <div className="rangeslider">
                    <input type="range" min="8" max="20" value={this.value} step={1} onChange={this.changeValue} id="sliderRange"/>
                </div>
                <button onClick={(e) => this.generatePassword(e)}>Generate</button>
            </>
        )
    }
}

export default Generate;