import React, { Component, Fragment, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./AddCustomer.css";
import axios from "axios";

const AddCustomer = () => {
    const [paper_type, setPaper_type] = useState('');
    const [board_type, setBoard_type] = useState('');
    const [brand, setBrand] = useState('');
    const [gsm, setGsm] = useState('');
    const [gst, setGst] = useState('');
    const [transport_wages, setTransport_wages] = useState('');
    const [net_price, setNet_price] = useState('');
    const [press_profit, setPress_profit] = useState('');
    const [customer_profit_percent, setCustomer_profit_percent] = useState('');
    const [press_profit_percent, setPress_profit_percent] = useState('');
    const [netcprice, setNetcprice] = useState('');
    const [netpprice, setNetpprice] = useState('');
    let history = useHistory();

    const createNewPricing = () => {
        
        axios.post("http://localhost:3001/createpricing", {
            paper_type: paper_type,
            paper_size: board_type,
            brand: brand,
            gsm: gsm,
            gst: gst,
            transport_wages: transport_wages,
            net_price: net_price,
            press_profit:press_profit,
            customer_profit_percent: customer_profit_percent,
            press_profit_percent: press_profit_percent,
            net_cprice: netcprice,
            net_pprice: netpprice
            }).then((response) => {
                console.log(response);
            });
            history.push("/dashboard/pricing");
    }

    return (
        <Fragment>
            <div className="form_div">
                <div className="customer_heading">
                    <h2>Fill the form details to add a new price</h2>
                </div>
                <form className="customer_form">
                    <div className="paper_type form_value">
                        <label>Paper Type: </label>
                        <input className="paper_type" name="paper_type" onChange={ (e) => { setPaper_type(e.target.value) }}/>
                    </div>
                    <div className="board_type form_value">
                        <label>Board Type: </label>
                        <input className="board_type" name="board_type" onChange={ (e) => { setBoard_type(e.target.value) }}/>
                    </div>
                    <div className="brand form_value">
                        <label>Brand: </label>
                        <input className="brand" name="brand" onChange={ (e) => { setBrand(e.target.value) }}/>
                    </div>
                    <div className="gsm form_value">
                        <label>GSM: </label>
                        <input className="gsm" name="gsm" onChange={ (e) => { setGsm(e.target.value) }}/>
                    </div>
                    <div className="gst form_value">
                        <label>GST: </label>
                        <input className="gst" name="gst" onChange={ (e) => { setGst(e.target.value) }}/>
                    </div>
                    <div className="transport form_value">
                        <label>Transport Wages: </label>
                        <input className="transport" name="transport" onChange={ (e) => { setTransport_wages(e.target.value) }}/>
                    </div>
                    <div className="net_price form_value">
                        <label>Net Price: </label>
                        <input className="net_price" name="net_price" onChange={ (e) => { setNet_price(e.target.value) }}/>
                    </div> 
                    <div className="press_profit form_value">
                        <label>Press profit: </label>
                        <input className="press_profit" name="press_profit" onChange={ (e) => { setPress_profit(e.target.value) }}/>
                    </div>
                    <div className="customer_profit form_value">
                        <label>Customer profit percent: </label>
                        <input className="customer_profit" name="customer_profit" onChange={ (e) => { setCustomer_profit_percent(e.target.value) }}/>
                    </div>
                    <div className="press_profit_percent form_value">
                        <label>Press profit percent: </label>
                        <input className="press_profit_percent" name="press_profit_percent" onChange={ (e) => { setPress_profit_percent(e.target.value) }}/>
                    </div>
                    <div className="netcprice form_value">
                        <label>Net Customer price: </label>
                        <input className="netcprice" name="netcprice" onChange={ (e) => { setNetcprice(e.target.value) }}/>
                    </div>
                    <div className="netpprice form_value">
                        <label>Net Press price: </label>
                        <input className="netpprice" name="netpprice" onChange={ (e) => { setNetpprice(e.target.value) }}/>
                    </div>
                     
                    <input type="submit" value="Submit" onClick={createNewPricing}/>
                </form>
                {/* </div> */}
            </div>
        </Fragment>
    )
}

export default withRouter(AddCustomer);