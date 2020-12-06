import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import {AuthContext} from '../shared/context/auth-context'
import './Manage.css'
const Manage = (props) => {
    const auth =useContext(AuthContext);
  return (
    <div style={{ marginTop: "200px", marginBottom: "160px" }}  >
        <Link to="/users"><a  className="myButton">QUẢN LÝ THÀNH VIÊN</a></Link>
        <Link to="/manageProduct"><a className="myButton">QUẢN LÝ SẢN PHẨM</a></Link>
        <Link to="/revenue"><a className="myButton">DOANH THU</a></Link>
        <Link to={`/${auth.userId}/submit`}><a className="myButton" style={{marginTop:"20px"}}>DUYỆT SẢN PHẨM</a></Link>
    </div>
  );
};

export default Manage;
