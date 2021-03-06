import React, { PureComponent } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Home.css';
import CampaignList from '../CampaignList/CampaignList';
import EmployeeList from '../EmployeeList/EmployeeList';
import * as Constants from '../../constants';

class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <header>
          <nav>
            <ul className="MainMenu">
              <li>
                <NavLink
                  to="/campaignlist"
                  exact
                >
                  {Constants.CAMPAIGN_LIST}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employeelist"
                  exact
                >
                  {Constants.EMPLOYEE_LIST}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/campaignlist" component={CampaignList} />
          <Route path="/employeelist" component={EmployeeList} />
        </Switch>
      </div>
    );
  }
}

export default Home;
