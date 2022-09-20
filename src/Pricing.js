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

  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

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
      const result = await axios.get("http://localhost:3001/getprice");
      setData(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <div className="Master customer">
        <div className="headers">
            <h2>Pricing</h2>
        </div>
      <div className="tables">
        {/* <div className="input_filter">
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
          />
        </div> */}
        <div className="table_display">
          <table {...getTableProps()} className="table_rows">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="table_rows">
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
                  <tr {...row.getRowProps()} className="table_rows">
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()} className="table_descriptions">{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
