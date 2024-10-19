import React from "react";
import { useState } from "react";
export default class ClassBasedComponent extends React.Component{
    // constructor(props){
    //     //super(props)
    //     this.state = {
    //         Success: "Yes",
    //         Count: 0,
    //     }
        
    // }

    //We cannot use this.props inside the Constructor without calling Super Method. We can access ouside the Constructor like render()
    //We need to have super(props) only if we want to access this.props inside a Constructor
    state = {
        Success: "Yes",
        Count: 0,
    }
    handleChangeValue = () => {
        this.setState(prevState => {
            return {
                Success: prevState.Success === "Yes" ? "No" : "Yes",
            }
        })
    }
    hnadleChangeIncreament = () => {
        this.setState({Count: this.state.Count + 1})
    }
    render() {
        return(
            <>
            <h1 style={{backgroundClip: 'green'}}>Hello World {this.state.Success}</h1>
            <button onClick={this.handleChangeValue}>Change</button>
            <button onClick={this.hnadleChangeIncreament}>Add</button>
            <p>Count: {this.state.Count}</p>
            {console.log("Name ",this.props)}
            {console.log("Password ",this.props.passwords)}
            </>
        )
    }
}