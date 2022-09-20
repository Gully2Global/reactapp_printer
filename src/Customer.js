import React, { Component, Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import "./Customer.css";
import axios from "axios";


const Customer = () => {
    // render() {
    // const { match } = this.props;
    const [boardType, setBoardType] = useState('');
    const [gsm, setGsm] = useState('');
    const [paperSize, setPaperSize] = useState('');
    const [printSize, setPrintSize] = useState('');
    const [printSide, setPrintSide] = useState('');
    const [copies, setCopies] = useState('');
    const [wasteInput, setWasteInput] = useState('');
    const [lamination, setLamination] = useState('');
    const [laminationType, setlaminationType] = useState('');
    const [folding, setFolding] = useState('');
    const [priceStr, setPriceStr] = useState('');


    const getPrice = (event) => {
        event.preventDefault();
        console.log("Inside");
        console.log(boardType + gsm);
        let samplestr = "";
        let pricefromdb = "";
        let paper_size = "";
        let pa = 0, ns = 0, pp1 = 0, pp2 = 0, pp3 = 0, cpc = 0, wi = 0, printcost = 0, lcopies = 0, fc = 0, total_cost = 0, cpca = 0;
        // setPriceStr(gsm);
        if (boardType == "maplitho")
            samplestr = samplestr + "mp";
        else if (boardType == "art_paper")
            samplestr = samplestr + "ap";
        else
            samplestr = samplestr + "ab";
        samplestr = samplestr + gsm;
        let sampleweight = samplestr;
        if (paperSize == "double_demy")
            paper_size = paper_size + "dd";
        else if (paperSize == "international_demy") {
            paper_size = paper_size + "idd";
            sampleweight = sampleweight + "idd";
        }
        else {
            paper_size = paper_size + "dc";
            sampleweight = sampleweight + "dc";
        }
        paper_size = paper_size + printSize;
        if (paperSize == "crown" || paperSize == "international_demy") {
            if (printSize == "s1")
                pa = 8000;
            else if (printSize == "s2")
                pa = 6000;
            else if (printSize == "s3")
                pa = 4000;
            else if (printSize == "s4")
                pa = 2000;
            else
                pa = 1000;
        }
        else {
            if (printSize == "s1")
                pa = 8000;
            else if (printSize == "s2")
                pa = 6000;
            else if (printSize == "s3")
                pa = 5000;
            else if (printSize == "s4")
                pa = 4000;
            else if (printSize == "s5")
                pa = 2000;
            else
                pa = 1000;
        }
        if (printSide == "double" && pa != 1000)
            pa = pa / 2;
        ns = copies / pa;
        console.log(pa);
        console.log(ns);
        console.log(paperSize);
        pp1 = Math.ceil(ns) - 1;

        if (paperSize == "international_demy" || paperSize == "double_demy")
            cpca = 2500;
        else
            cpca = 2700;
        let cpcb = 0;
        lcopies = copies;
        lcopies = lcopies - 1000;
        if (lcopies > 0) {
            if (paperSize == "international_demy" || paperSize == "double_demy")
                cpcb = 450;
            else
                cpcb = 550;
        }
        if (folding == "yes") {
            if (paperSize == "double_demy") {
                if (printSize == "s5")
                    fc = 1050;
                else if (printSize == "s6")
                    fc = 2100;
                else
                    fc = 800;
            }
            else {
                if (printSize == "s4")
                    fc = 1050;
                else if (printSize == "s5")
                    fc = 2100;
                else
                    fc = 800;
            }
            fc = fc / copies;
        }

        pp2 = pp1 * cpcb;
        console.log(cpc);
        pp3 = pp2 + cpca;
        // getPriceStr(samplestr);
        console.log(pp1);
        console.log(pp2);
        console.log(pp3);
        // axios.
        axios.post("http://localhost:3001/price", {
            paper_type: samplestr
        }).then((response) => {
            axios.post("http://localhost:3001/weights", {
                paper_weight: sampleweight
            }).then((response1) => {
                axios.post("http://localhost:3001/cutpieces", {
                    cut_size: paper_size
                }).then((response2) => {
                    let psc = 0;
                    if (gsm < 170)
                        psc = (response.data[0].total_price * response1.data[0].weight) / 500;
                    else
                        psc = (response.data[0].total_price * response1.data[0].weight) / 100;

                    let final_paper_price = psc / response2.data[0].paper_size;
                    wi = psc * wasteInput;
                    printcost = ((copies * final_paper_price) + pp3 + wi) + final_paper_price; //change here
                    console.log(final_paper_price);
                    console.log(printcost)
                    if (lamination == "yes") {
                        let lc = response2.data[0].lamination_cost;
                        if (printSide == "double")
                            lc = lc * 2;
                        if (laminationType == "gloss")
                            lc = lc * 0.45;
                        else
                            lc = lc * 0.5;
                        let lc3 = (wi * 4 * lc) / copies;
                        let total_lamination_cost = (lc + lc3) * copies;
                        total_cost = printcost + total_lamination_cost + fc;
                    }
                    else
                        total_cost = printcost;
                    document.getElementById("price").innerHTML = total_cost.toFixed(2);
                    document.getElementById("price_per_sheet").innerHTML = (total_cost/copies).toFixed(2);
                    console.log(response2.data);
                });
                console.log(response1.data[0].weight);
                console.log(response.data[0].total_price);
            });
            console.log(response.data[0].total_price);

            pricefromdb = document.getElementById("price").innerHTML;
            console.log(pricefromdb);
            setPriceStr(response.data[0].total_price);
            console.log(priceStr);
        });
        console.log(pricefromdb);
    };
    return (
        <Fragment>

            <div className="quotation_submit rowCustomer">
                <h1 className="heading">Quotation</h1>
                <form className="quotation" action="#">
                    <div className="starting_input">
                        <div className="name columnstart">
                            <label>Customer name: </label>
                            <input type="text" name="name" />
                        </div>
                        <div className="uniqueid columnstart">
                            <label>Unique ID: </label>
                            <input type="text" name="uid" />
                        </div>
                    </div>
                    <h2>Pre-Press</h2>
                    <div className="prePress">
                        <div className="design">
                            <label>Designing: </label>
                            <select name="board" id="board">
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="prePressRow">
                            <div className="columnThree">
                                <label>Hour rate:</label>
                                <input type="number" name="hour_rate" />
                            </div>
                            <div className="columnThree">
                                <label>Page rate:</label>
                                <input type="number" name="page_rate" />
                            </div>
                            <div className="columnThree">
                                <label>Logo design:</label>
                                <input type="text" name="logo_design" />
                            </div>
                        </div>
                    </div>
                    <h2>Paper cost</h2>
                    <div className="paper">
                        <div className="columnCustomer columnstart">
                            <div className="board">
                                <label>Board type: </label>
                                <select name="board" id="board" onChange={(e) => { setBoardType(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="art_board">Art board</option>
                                    <option value="art_paper">Art paper</option>
                                    <option value="maplitho">Maplitho</option>
                                </select>
                            </div>
                            <div className="gsm">
                                <label>GSM: </label>
                                <select name="gsm" id="gsm" onChange={(e) => { setGsm(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="37">37</option>
                                    <option value="42">42</option>
                                    <option value="44">44</option>
                                    <option value="47">47</option>
                                    <option value="54">54</option>
                                    <option value="60">60</option>
                                    <option value="70">70</option>
                                    <option value="80">80</option>
                                    <option value="90">90</option>
                                    <option value="100">100</option>
                                    <option value="120">120</option>
                                    <option value="130">130</option>
                                    <option value="170">170</option>
                                    <option value="220">220</option>
                                    <option value="250">250</option>
                                    <option value="300">37</option>
                                    <option value="350">350</option>
                                    <option value="400">400</option>
                                </select>
                            </div>
                            <div className="paper_buying_size">
                                <label>Paper buying size: </label>
                                <select name="paper_buying_size" id="paper_buying_size" onChange={(e) => { setPaperSize(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    {/* <option value="demy">18 * 23 Demy</option> */}
                                    <option value="international_demy">International Double Demy</option>
                                    <option value="double_demy">Double Demy</option>
                                    {/* <option value="22_28">22 * 28</option> */}
                                    <option value="crown">Double Crown paper</option>
                                    {/* <option value="double_crown">20 * 30 Double crown</option> */}
                                    {/* <option value="30_40">30 * 40</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="columnstart">
                            <div className="no_of_copies">
                                <label>No of copies: </label>
                                <input type="text" name="no_of_copies" className="no_of_copies_input" onChange={(e) => { setCopies(e.target.value) }} />
                            </div>
                            <div className="waste_input">
                                <label>Waste input: </label>
                                <input type="text" name="waste_input" className="waste_input_field" onChange={(e) => { setWasteInput(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <h2>Press</h2>
                    <div className="print">
                        <div className="pressRow">
                            <div className="columnThree">
                                <label>PS plate: </label>
                                <input type="text" name="ps_plate" />
                            </div>
                            <div className="columnThree">
                                <label>Master: </label>
                                <input type="text" name="master" />
                            </div>
                            <div className="columnThree">
                                <label>Film:</label>
                                <input type="text" name="film" />
                            </div>
                        </div>
                        <div className="columnCustomer">
                            <div className="printing_paper_size">
                                <label>Printing paper size: </label>
                                <select name="printing_paper_size" id="printing_paper_size" onChange={(e) => { setPrintSize(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="s1">S1</option>
                                    <option value="s2">S2</option>
                                    <option value="s3">S3</option>
                                    <option value="s4">S4</option>
                                    <option value="s5">S5</option>
                                    <option value="s6">S6</option>
                                </select>
                            </div>
                            <div className="printing_side">
                                <label>Printing side: </label>
                                <select name="printing_side" id="printing_side" onChange={(e) => { setPrintSide(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <h2>Post-Press</h2>
                    <div className="postPress">
                        <div className="columnCustomer">
                            <div className="lamination columnThree">
                                <label>Lamination: </label>
                                <select name="lamination" id="lamination" onChange={(e) => { setLamination(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="lamination_type columnThree" onChange={(e) => { setlaminationType(e.target.value) }}>
                                <label>Lamination Type: </label>
                                <select name="lamination_type" id="lamination_type">
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="gloss">Gloss</option>
                                    <option value="matt">Matt</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            <div className="folding columnThree">
                                <label>Folding: </label>
                                <select name="folding" id="folding" onChange={(e) => { setFolding(e.target.value) }}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="columnCustomer">
                            <div className="no_of_copies">
                                <label>No of sides: </label>
                                <input type="text" name="no_of_sides" className="no_of_sides_input" />
                            </div>
                            <div className="waste_input">
                                <label>Scoring: </label>
                                <input type="text" name="scoring" className="scoring_field" />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Calculate" className="button" onClick={getPrice} />
                    </div>
                    {/* <div className="inputs rowCustomer">
                        <h2 className="center_heading">Enter the details</h2>
                        <div className="no_of_copies">
                            <label>No of copies: </label>
                            <input type="text" name="no_of_copies" className="no_of_copies_input" onChange={(e) => { setCopies(e.target.value) }} />
                        </div>
                        <div className="waste_input">
                            <label>Waste input: </label>
                            <input type="text" name="waste_input" className="waste_input_field" onChange={(e) => { setWasteInput(e.target.value) }} />
                        </div>
                    </div> */}
                </form>

                <div className="quotation">
                    <h2 className="finalPrice">Final price</h2>
                    <div className="price_calculation">
                        <div className="total_final_price columnstart">
                            <div className="price_border">
                                <h4>Total cost</h4>
                                <div className="cost" id="price"></div>
                            </div>
                        </div>
                        <div className="cost_per_sheet columnstart">
                            <div className="price_border">
                                <h4>Cost per sheet</h4>
                                <div className="cost" id="price_per_sheet"></div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Send mail" className="button" />
                        <input type="submit" value="Print" className="button" />
                        <input type="submit" value="Export PDF" className="button" />

                    </div>
                </div>


            </div>
            {/* <div className="quotation_price">
                <h2 className="heading">Price</h2>
                <div id="price"></div>
            </div> */}
        </Fragment>
    );
}
// }
export default Customer;
