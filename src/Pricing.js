import React, { Component, Fragment, useEffect, useState, useLayoutEffect, useMemo } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Pricing.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import ReactTable, { useFilters, useTable } from "react-table";
// import "react-table/react-table.css";  

const Pricing = () => {
  const [data, setData] = useState([]);
  const [table, handleTable] = useState("");

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  const changeTableValue = (e) => {
    //  console.log(f);
    //  console.log(table);
    //  console.log(document.getElementsByClassName("table_descriptions")[1].innerHTML);
    let start = e * 12;
    let end = start + 12;
    let values = [];
    let i = 0;
    while (start < end) {
      values[i] = document.getElementsByClassName("table_descriptions")[start].innerHTML;
      i++;
      start++;
    }
    console.log(values);
    axios.put("http://191.101.15.254:3001/changePrice", {
      id: e + 1,
      paper_type: values[0],
      paper_size: values[1],
      brand: values[2],
      gsm: values[3],
      gst: values[4],
      transport_wages: values[5],
      net_price: values[6],
      press_profit: values[7],
      customer_profit_percent: values[8],
      press_profit_percent: values[9],
      net_cprice: values[10],
      net_pprice: values[11]
    }).then((response) => {
      console.log(response);
    });
  }

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Pricing details",
        // First group columns
        columns: [
          {
            Header: "Paper/Board type",
            accessor: "paper_type"
          },
          {
            Header: "Board type",
            accessor: "paper_size"
          },
          {
            Header: "Brand",
            accessor: "brand"
          },
          {
            Header: "GSM",
            accessor: "gsm"
          },
          {
            Header: "GST",
            accessor: "gst"
          },
          {
            Header: "Transport wages",
            accessor: "transport_wages"
          },
          {
            Header: "Net price",
            accessor: "net_price"
          },
          {
            Header: "Press profit",
            accessor: "press_profit"
          },
          {
            Header: "Customer Profit",
            accessor: "customer_profit_percent"
          },
          {
            Header: "Press profit",
            accessor: "press_profit_percent"
          },
          {
            Header: "Net Customer price",
            accessor: "net_cprice"
          },
          {
            Header: "Net Press price",
            accessor: "net_pprice"
          }
          // {
          //   Header: "Type",
          //   accessor: "show.type"
          // }
        ]
      },
      // {
      //   // Second group - Details
      //   Header: "Details",
      //   // Second group columns
      //   columns: [
      //     {
      //       Header: "Contact number",
      //       accessor: "contact"
      //     },
      //     {
      //       Header: "Address",
      //       accessor: "address"
      //     },
      //     {
      //       Header: "Nature of business",
      //       accessor: "nature"
      //     }
      //   ]
      // }
    ],
    []
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter
  } = useTable({
    columns,
    data
  },
    useFilters
  );

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://191.101.15.254:3001/getprice");
      setData(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <div className="Master customer">
      {/* <div className="headers">
        <h2>Pricing</h2>
      </div> */}
      <div className="tables">
        {/* <div className="input_filter">
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
          />
        </div> */}
        <div className="table_display">
          <table {...getTableProps()} className="table_rows_price">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="table_rows_price">
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="table_headings">{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="table_rows_price">
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()} className="table_descriptions" contentEditable="true" suppressContentEditableWarning="true">{cell.render("Cell")}</td>;
                    })}
                    <td><button className="changeValue" onClick={() => changeTableValue(i)}>Change</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="addButton">
        <button onClick={navigateToAdd}>Add</button>
      </div> */}
      <div className="new_customer">
        <Link to={`/dashboard/addPricing`}>
          <input type="submit" value="Add new price" />
        </Link>
      </div>
    </div>
  );
}

export default Pricing;
