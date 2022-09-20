import React, { Component, Fragment, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./AddCustomer.css";
import axios from "axios";

const AddCustomer = () => {
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [nature, setNature] = useState('');
    let history = useHistory();

    const createNewCustomer = () => {
        
        axios.post("http://191.101.15.254:3001/createcustomer", {
                uid:uid,
                name:name,
                contact:contact,
                address:address,
                nature:nature
            }).then((response) => {
                console.log(response);
            });
            history.push("/dashboard/quotation");
    }

    return (
        <Fragment>
            <div className="form_div">
                <div className="customer_heading">
                    <h2>Fill the form details to add a new customer</h2>
                </div>
                <form className="customer_form">
                    <div className="id form_value">
                        <label>Unique ID: </label>
                        <input className="id" name="id" onChange={ (e) => { setUid(e.target.value) }}/>
                    </div>
                    <div className="name form_value">
                        <label>Name: </label>
                        <input className="name" name="name" onChange={ (e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="contact_number form_value">
                        <label>Contact number: </label>
                        <input className="contact_number" name="contact_number" onChange={ (e) => { setContact(e.target.value) }}/>
                    </div>
                    <div className="address form_value">
                        <label>Address: </label>
                        <input className="address" name="address" onChange={ (e) => { setAddress(e.target.value) }}/>
                    </div>
                    <div className="nature_of_business form_value">
                        <label>Nature of business: </label>
                        <input className="nature_of_business" name="nature_of_business" onChange={ (e) => { setNature(e.target.value) }}/>
                    </div>
                    <input type="submit" value="Submit" onClick={createNewCustomer}/>
                </form>
                {/* </div> */}
            </div>
        </Fragment>
    )
}

export default withRouter(AddCustomer);


//http://191.101.15.254:3001/