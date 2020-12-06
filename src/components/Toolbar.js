import React, { Component, useContext } from "react";
import Logo from "../img/logo1.jpg";
import { NavLink, Link, Route } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

import Users from "../pages/Users";

const Toolbar = (props) => {
  const auth = useContext(AuthContext);

  return (
    <header className="default-header">
      <div className="main-menu">
        <div className="container">
          <div className="row align-items-center justify-content-between d-flex">
            <div id="logo">
              <NavLink to="/">
                <img src={Logo} alt="" title="" />
              </NavLink>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active">
                  <Link to="/">Trang chủ </Link>
                </li>
                <li className="menu-has-children">
                  <a href="asdasd.html">blog</a>
                  <ul>
                    <li>
                      <a href="blog-home.html">Blog Home</a>
                    </li>
                    <li>
                      <a href="single-blog.html">Blog Single</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="contact.html">Liên hệ</a>
                </li>

                {!auth.isLoggedIn && (
                  <li>
                    <NavLink to="/signin" style={{ color: "green" }}>
                      Đăng Nhập
                    </NavLink>
                  </li>
                )}
                {/* {auth.isLoggedIn &&  (
                  <li>
                    <NavLink to="/users">Users</NavLink>
                  </li>
                )}  */}
                {auth.isLoggedIn && auth.isAdmin && (
                  <li>
                    <NavLink to="/manage">Quản Lý</NavLink>
                  </li>
                )}
            
                {auth.isLoggedIn && (
                  <li>
                    <NavLink to="/products/new">Đăng Bài</NavLink>
                  </li>
                )}
                {auth.isLoggedIn && (
                  <li style={{ paddingTop: "22px" }}>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      onClick={auth.logout}
                    >
                      Đăng Xuất
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Toolbar;
