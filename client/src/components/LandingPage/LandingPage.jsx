import React,{Component} from "react";
import {Link} from "react-router-dom";
import LandingCSS from "./LandingPage.module.css"

export default class LandingPage extends Component{
    render(){
        return(
        <div className={LandingCSS.container}>
            <div className={LandingCSS.title_container}>
             <h1>Dogs SPA</h1>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Link to = "/home">
                Let's go!
            </Link>
        </div>
        )
    }
}