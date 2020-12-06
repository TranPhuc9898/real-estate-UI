import React, { Component } from "react";
import { Link } from "react-router-dom";

import { data } from "../city";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Hồ Chí Minh",
      district: "1",
      type: "1"
    };
    this.cityChange = this.cityChange.bind(this);
    this.districtChange = this.districtChange.bind(this);
  }
  cityChange = (e) => {
    this.setState({ city: e.target.value });
  };
  districtChange = (e) => {
    this.setState({ district: e.target.value });
  };
  typeChange = (e) => {

    this.setState({ type: e.target.value });
    {console.log( e.target.value)}
  };
  render() {
    let options = data.filter((o) => {
      if(o.value === this.state.city) return o.district;
    });
    return (
      <section className="home-banner-area relative" id="home">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row fullscreen align-items-end justify-content-center">
            <div className="banner-content col-lg-12 col-md-12">
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
              <div className="search-field">
                <form
                  className="search-form"
                >
                  <div className="row">
                    <div className="col-lg-12 d-flex align-items-center justify-content-center toggle-wrap">
                      <div className="row">
                        <div className="col">
                          <h4 className="search-title">Tìm kiếm</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xs-6">
                      <p>Thành phố</p>
                      <select
                        name="city"
                        className="form-control"
                        style={{fontFamily: "Cursive"}}
                        value={this.state.city}
                        onChange={this.cityChange}
                        
                      >
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xs-6">
                      <p>Quận</p>
                      <select
                        name="district"
                        className="form-control"
                        value={this.state.district}
                        onChange={this.districtChange}
                        style={{fontFamily: "Cursive"}}
                      >
                        {options[0].district.map(d =>{ return(
                          <option value={d.name}>{d.name}</option>)
                        })}
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-6 col-xs-6">
                      <p>Loại</p>
                      <select
                        name="productType"
                        className=" form-control"
                        required
                        value={this.state.type}
                        onChange={this.typeChange}
                        style={{fontFamily: "Cursive"}}
                      >
                        <option value="1">Tất cả</option>
                        <option value="Chung cư">Chung cư</option>
                        <option value="Căn hộ">Căn hộ</option>
                        <option value="Nhà ở">Nhà ở</option>
                      </select>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-end">
                      <Link
                        to={`/search/${this.state.city}/${this.state.district}/${this.state.type}`}
                      >
                        <button
                          className="primary-btn"
                          style={{ alignItems: "center" }}
                        >
                          Tìm kiếm
                          <span className="lnr lnr-arrow-right"></span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
