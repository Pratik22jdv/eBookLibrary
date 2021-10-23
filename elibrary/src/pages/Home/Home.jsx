import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
//import "bootstrap/dist/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "../../components/Menu";
//import Layout from "../../components/Layout";
import Books from "../../components/Books";
import Search from "../../components/Search";

//import './layout.css';

export default function Home() {
    return (
        <div>
            <div style={{paddingTop:"120px"}}><Menu /> </div>
            <Search />
            
            <div><Books /></div>
        </div>
       
    )
}