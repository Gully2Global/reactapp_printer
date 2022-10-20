import React, { Component, Fragment, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./AddCustomer.css";
import axios from "axios";

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    let history = useHistory();

    const createNewEmployee = () => {
        
        axios.post("http://localhost:3001/createemployee", {
                name:name,
                department:department,
                designation:designation,
                email:email,
                phone:phone
            }).then((response) => {
                console.log(response);
            });
            history.push("/dashboard/quotation");
    }

    return (
        <Fragment>
            <div className="form_div">
                <div className="customer_heading">
                    <h2>Fill the form details to add a new employee</h2>
                </div>
                <form className="customer_form">
                    <div className="name form_value">
                        <label>Name: </label>
                        <input className="name" name="name" onChange={ (e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="department form_value">
                        <label>Department: </label>
                        <input className="department" name="department" onChange={ (e) => { setDepartment(e.target.value) }}/>
                    </div>
                    <div className="designation form_value">
                        <label>Designation: </label>
                        <input className="designation" name="designation" onChange={ (e) => { setDesignation(e.target.value) }}/>
                    </div>
                    <div className="email form_value">
                        <label>Email: </label>
                        <input className="email" name="email" onChange={ (e) => { setEmail(e.target.value) }}/>
                    </div>
                    <div className="phone form_value">
                        <label>Phone: </label>
                        <input className="phone" name="phone" onChange={ (e) => { setPhone(e.target.value) }}/>
                    </div>
                    <input type="submit" value="Submit" onClick={createNewEmployee}/>
                </form>
                {/* </div> */}
            </div>
        </Fragment>
    )
}

export default withRouter(AddCustomer);