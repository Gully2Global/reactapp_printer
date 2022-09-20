import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Dashboard.css";
import Master from "./Master";
import Pos from "./Pos";
import Customer from "./Customer";
import AddCustomer from "./AddCustomer";
import Pricing from "./Pricing";
import Employee from "./Employee";
import AddEmployee from "./AddEmployee";
// import IndexDashboard from "./IndexDashboard";
// import NotFound from "./404";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div>
        <ul>
          <li>
            <Link to={`${match.path}/quotation`}>Quotation</Link>
          </li>
          <li>
            <Link to={`${match.path}/master`}>Customers</Link>
          </li>
          <li>
            <Link to={`${match.path}/pos`}>Reports</Link>
          </li>
          <li>
            <Link to={`${match.path}/pricing`}>Pricing</Link>
          </li>
          <li>
            <Link to={`${match.path}/employee`}>Employees</Link>
          </li>
          <li className="push-right">
            <button onClick={this.signOut} href="#">
              Sign Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
            <Route path={`${match.path}/quotation`}>
                <Customer />
              </Route>
              <Route path={`${match.path}/master`}>
                <Master />
              </Route>
              <Route path={`${match.path}/pos`}>
                <Pos />
              </Route>
              <Route path={`${match.path}/pricing`}>
                <Pricing />
              </Route>
              <Route path={`${match.path}/employee`}>
                <Employee />
              </Route>
              <Route path={`/dashboard/addCustomer`}>
                <AddCustomer />
              </Route>
              <Route path={`/dashboard/addEmployee`}>
                <AddEmployee />
              </Route>
            </Switch>
          </div>
        </main>
        
      </div>
    );
  }
}

export default withRouter(Dashboard);
