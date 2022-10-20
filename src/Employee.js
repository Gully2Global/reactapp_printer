import React, { Component, Fragment, useEffect, useState, useLayoutEffect, useMemo } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Master.css";
import AddCustomer from "./AddCustomer";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import ReactTable, { useFilters, useTable } from "react-table";
// import "react-table/react-table.css";  

const Employee = () => {
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
                Header: "Employee details",
                // First group columns
                columns: [
                    {
                        Header: "Employee ID",
                        accessor: "id"
                    },
                    {
                        Header: "Employee name",
                        accessor: "name"
                    },
                    {
                        Header: "Department",
                        accessor: "department"
                    },
                    {
                        Header: "Designation",
                        accessor: "designation"
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
            const result = await axios.get("http://localhost:3001/getemployee");
            setData(result.data);
            console.log(result);
        })();
    }, []);

    return (
        <div className="Master customer">
            <div className="starting">
                <div className="header_starting">
                    <h2 className="customer_list">List of employees</h2>
                </div>
                {/* <div class="search-container">
          <form action="#">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit"><FaSearch /></button>
          </form>
        </div> */}
                <div className="new_customer">
                    <Link to={`/dashboard/addEmployee`}>
                        <input type="submit" value="Add new employee" />
                    </Link>
                </div>
            </div>
            <div className="tables">
                <div className="input_filter">
                    <input
                        value={filterInput}
                        onChange={handleFilterChange}
                        placeholder={"Search name"}
                    />
                </div>
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

// // const Master = () => {
// //   // const [tableData, setTableData] = useState([]);
// //   const ids = [];
// //   useLayoutEffect(() => {
// //     axios.get("http://localhost:3001/getcustomer").then((response) => {
// //       console.log(response.data[0].uid);
// //       for (let i = 0; i < response.data.length; i++) {
// //         ids[i] = response.data[i].uid;
// //       }
// //       console.log(ids);
// //       // setTableData(response.data);
// //       // console.log(tableData);
// //     }).catch((e) => {
// //       console.log(e);
// //     });
// //   });
// //   const data = [{
// //     name: 'Ayaan',
// //     age: 26
// //   }, {
// //     name: 'Ahana',
// //     age: 22
// //   }, {
// //     name: 'Peter',
// //     age: 40
// //   }, {
// //     name: 'Virat',
// //     age: 30
// //   }, {
// //     name: 'Rohit',
// //     age: 32
// //   }, {
// //     name: 'Dhoni',
// //     age: 37
// //   }];
// //   const columns = [{
// //     Header: 'Name',
// //     accessor: 'name'
// //   }, {
// //     Header: 'Age',
// //     accessor: 'age'
// //   }];
// //   const changeToCustomer = () => {
// //     for (let i = 0; i < 2; i++) {
// //       return <h2>ids[i]</h2>
// //     }
// //   }
// //   const getIds = () => {
// //     return <h2>ids</h2>
// //   }
// //   return (
// //     <Fragment>
// //       <div className="customer">
// //         <div className="starting">
// //           <div className="header_starting">
// //             <h2 className="customer_list">List of customers</h2>
// //           </div>
// //           <div class="search-container">
// //             <form action="#">
// //               <input type="text" placeholder="Search.." name="search" />
// //               <button type="submit"><FaSearch /></button>
// //             </form>
// //           </div>
// //           <div className="new_customer">
// //             <Link to={`/dashboard/addCustomer`}>
// //               <input type="submit" value="Add new customer" />
// //             </Link>
// //           </div>
// //         </div>
// //         <div>
// //           <ReactTable
// //             data={data}
// //             columns={columns}
// //             defaultPageSize={2}
// //             pageSizeOptions={[2, 4, 6]}
// //           />
// //         </div>
// //       </div>
// //       {/* <div className="main">
// //           <Switch>
// //             <Route path={`/dashboard/addCustomer`}>
// //               <AddCustomer />
// //             </Route>
// //           </Switch>
// //         </div> */}
// //     </Fragment>

// //   );
// // }

export default Employee;
