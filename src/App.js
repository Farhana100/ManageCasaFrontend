import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './my-components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';

import Owners from './my-components/content/src/owner/Owners';
import OwnerList from './my-components/content/src/owner/OwnerList';
import OwnerAdd from './my-components/content/src/owner/OwnerAdd';

import Apartments from './my-components/content/src/apartment/Apartments';
import ApartmentList from './my-components/content/src/apartment/ApartmentList';
import ApartmentView from './my-components/content/src/apartment/ApartmentView';

import Tenants from './my-components/content/src/tenant/Tenants';
import TenantList from './my-components/content/src/tenant/TenantList';
import TenantAdd from './my-components/content/src/tenant/TenantAdd';

import Committee from './my-components/content/src/Committee';
import CommitteeAdd from './my-components/content/src/CommitteeAdd';
import CommitteeEdit from './my-components/content/src/CommitteeEdit';

import Election from './my-components/content/src/election/Election';
import ElectionCreate from './my-components/content/src/election/ElectionCreate';
import Election_View from './my-components/content/src/election/Election_View';

import Poll from './my-components/content/src/poll/Poll';
import PollList from './my-components/content/src/poll/PollList';
import PollCreate from './my-components/content/src/poll/PollCreate';
import PollView from './my-components/content/src/poll/PollView';


import Finance from './my-components/content/src/finance/Finance';
import ServiceChargeFund from './my-components/content/src/finance/ServiceChargeFund';
import ExpenseStatistics from './my-components/content/src/finance/ExpenseStatistics';

import Payment from './my-components/content/src/dues/payment';
import Checkout from './my-components/content/src/finance/testStripe';

import ToBeMade from './my-components/content/src/ToBeMade';
import ElectionList from './my-components/content/src/election/ElectionList';
import ApartmentCreate from './my-components/content/src/apartment/ApartmentCreate';
import ApartmentEdit from './my-components/content/src/apartment/ApartmentEdit';
import ServiceProviders from './my-components/content/src/service/ServiceProviders';
import ServiceProviderList from './my-components/content/src/service/ServiceProviderList';
import ServiceProviderAdd from './my-components/content/src/service/ServiceProviderAdd';
import ServiceProviderView from './my-components/content/src/service/ServiceProviderView';
import Error404 from './my-components/content/src/error/Error404';
import ServicePackageAdd from './my-components/content/src/service/ServicePackageAdd';
import ServiceProviderEdit from './my-components/content/src/service/ServiceProviderEdit';
import ServicePackageEdit from './my-components/content/src/service/ServicePackageEdit';
import Dues from './my-components/content/src/dues/Dues';
import DuesList from './my-components/content/src/dues/DuesList';
import PaymentHistory from './my-components/content/src/paymentHistory/PaymentHistory';
import PaymentList from './my-components/content/src/paymentHistory/PaymentList';



function App() {

  // check if user is logged in
  let user = JSON.parse(localStorage.getItem('data'));
  if (! user) {
    user = {
      username: "",
      userType: "",
      user_active: false,
    }
  }

  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/notFound" element={<Error404/>} exact />
          <Route path="/home" element={<Home/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/register" element={<Register/>} exact />
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<ToBeMade/>} />
            <Route path="/apartments" element={<Apartments />}>
              <Route path="/apartments/" element={<ApartmentList/>} />
              <Route path="/apartments/create" element={<ApartmentCreate/>} />
              <Route path="/apartments/edit/:id" element={<ApartmentEdit/>} />
              <Route path="/apartments/:id" element={<ApartmentView usertype={user.userType} />} />
            </Route>
            <Route path="/committee" element={<Committee/>}/>
            <Route path="/committee/add" element={<CommitteeAdd/> } />
            <Route path="/committee/edit" element={<CommitteeEdit/> } />
            <Route path="/owners" element={<Owners/>}>
              <Route path="/owners" element={<OwnerList/>} />
              <Route path="/owners/add" element={<OwnerAdd/>} />
            </Route>
            <Route path="/tenants" element={<Tenants/>}>
              <Route path="/tenants" element={<TenantList/>} />
              <Route path="/tenants/add" element={<TenantAdd/>} />
            </Route>
            <Route path="/service" element={<ServiceProviders/>}>
              <Route path="/service" element={<ServiceProviderList/>} />
              <Route path="/service/add" element={<ServiceProviderAdd/>} />
              <Route path="/service/edit/:id" element={<ServiceProviderEdit/>} />
              <Route path="/service/edit/:id/addPackage" element={<ServicePackageAdd/>} />
              <Route path="/service/edit/:id/editPackage/:package_id" element={<ServicePackageEdit/>} />
              <Route path="/service/:id" element={<ServiceProviderView/>} />
            </Route>
            <Route path="/election" element={<Election />}>
              <Route path="/election" element={<ElectionList/>} />
              <Route path="/election/create" element={<ElectionCreate/>}/>
              <Route path="/election/view/:id" element={<Election_View/>}/>
              <Route path="/election/poll" element={<Poll/>} >
                <Route path="/election/poll" element={<PollList/>} />
                <Route path="/election/poll/create" element={<PollCreate/>} />
                <Route path="/election/poll/view/:id" element={<PollView/>}/>
              </Route>
            </Route>
            <Route path="/finance" element={<Finance/>} >
              <Route path="/finance" element={<ServiceChargeFund/>} />
              <Route path="/finance/expense" element={<ExpenseStatistics/>} />
              
            </Route>
            <Route path="/dues" element={<Dues/>} >
              <Route path="/dues" element={<DuesList/>} />
              {/* <Route path="/dues/payment" element={<Checkout/>} /> */}
            </Route>
            <Route path="/paymenthistory" element={<PaymentHistory/>}>
              <Route path="/paymenthistory" element={<PaymentList/>}/>
            </Route>
            <Route path="/employees" element={<ToBeMade/>} />
            <Route path="/forum" element={<ToBeMade/>} />
            <Route path="/complaints" element={<ToBeMade/>} />
            <Route path="/notice" element={<ToBeMade/>} />
            <Route path="/visitors" element={<ToBeMade/>} />
          </Route>
          <Route path="*" element={<Error404/>}></Route>
        </Routes>
      </Router>
    </>
  );

}

export default App;