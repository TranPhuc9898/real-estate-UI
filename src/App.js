import React, { useState, useCallback, useContext } from "react";
import "./App.css";
import Aux from "./hoc/Auxx";
import Toolbar from "./components/Toolbar";
import Middle from './components/Middle/Middle'
import Footer from './components/Footer'
import UpdateProduct from './UserProducts/pages/UpdateProduct'
import Auth from './pages/Auth'
import Users from './pages/Users'
import Manage from './Admin/Manage'
import UserProducts from './UserProducts/pages/UserProducts'
import NewProduct from './UserProducts/pages/NewProduct'
import UpdateUser from './Users/UserUpdate'
import Submit from './Admin/Submittion'
import Revenue from './Admin/Revenue'
import ManageAdmin from './Users/ManageAdmin'
import TotalRevenue from './Admin/TotalRevenue'

import SearchDetail from './Admin/SearchDetail'

import { AuthContext } from './shared/context/auth-context';
import {Route, Switch, Redirect} from 'react-router-dom'
import Details from "./components/ProductDetails/Details";
import ManageProduct from "./Products/ManageProduct";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {

    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const autho = useCallback((role) => {
    console.log(role)
    if (role===1) {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false)
    }
  }, []);

  let routes;
  


  
  if ( isAdmin && isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Middle />
        </Route>
        <Route path="/manage" exact>
          <Manage />
        </Route>
        <Route path="/manageProduct" >
          <ManageProduct />          
        </Route>
        <Route path="/users/admin" >
          <ManageAdmin />          
        </Route>
        <Route path="/revenue" >
          <Revenue />          
        </Route>
        <Route path="/TotalRevenue" component={TotalRevenue}/>
         <Route path="/:userId/products" exact>
          <UserProducts />
        </Route>
        <Route path="/products/new" exact>
          <NewProduct />
        </Route>
        <Route path="/:userId/updateInfo" exact>
          <UpdateUser />
        </Route>
        <Route path="/:userId/submit" exact>
          <Submit />
        </Route>
        <Route path="/users" exact>
          <Users/>
        </Route>
        <Route path="/products/:productId" >
          <UpdateProduct />
        </Route>
        <Route path="/:productId/details" exact >
          <Details />
        </Route>
        <Route path='/search/:pcity/:pdistrict/:ptype' component={SearchDetail} />
        <Redirect to="/" />
      </Switch>
    );
  } else if(isLoggedIn && isAdmin===false){
    routes = (
      <Switch>
        <Route path="/" exact>
          <Middle />
        </Route>
        <Route path="/products/new" exact>
          <NewProduct />
        </Route>
        <Route path="/:productId/details" exact >
          <Details />
        </Route>
        <Route path='/search/:pcity/:pdistrict/:ptype' component={SearchDetail} />
        <Redirect to="/" /> 
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Middle />
        </Route>
        <Route path="/:productId/details" exact >
          <Details />
        </Route>
        <Route path="/signin">
          <Auth />
        </Route>
        <Route path='/search/:pcity/:pdistrict/:ptype' component={SearchDetail} />
        <Redirect to="/" /> 
      </Switch>
    )
  }
  return (
    <Aux>
      <AuthContext.Provider value={{ authorization:autho, isLoggedIn: isLoggedIn,isAdmin:isAdmin,userId: userId, login: login, logout: logout }}>
      <Toolbar />
        <main>{routes}</main>
      <Footer/>
      </AuthContext.Provider>
    </Aux>
  );
}

export default App;
