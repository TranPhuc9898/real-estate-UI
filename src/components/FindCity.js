import React from "react";
import Img1 from "../img/p1_1.jpg";
import Img2 from "../img/p2_3.jpg";
import Img3 from "../img/binhthanh.jpg";
import Img4 from "../img/govap.jpg";

import { Link } from "react-router-dom";

const hcm = "H%E1%BB%93%20Ch%C3%AD%20Minh";
const binhthanh = "B%C3%ACnh%20Th%E1%BA%A1nh";
const govap = "G%C3%B2%20V%E1%BA%A5p";

const findcity = () => (
  <section className="city-area section-gap">
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 header-text">
          <h1>Bất Động Sản theo thành phố</h1>
          <p>Nơi mà bạn có thể tin tưởng đặt niềm tin vào.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 mb-10">
          <div className="content">
            <Link to={`/search/${hcm}/1/1`}>
              <div className="content-overlay"></div>
              <img
                className="content-image img-fluid d-block mx-auto"
                src={Img1}
                alt=""
              />
              <div className="content-details fadeIn-bottom">
                <h3 className="content-title">Quận 1</h3>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 mb-10">
          <div className="content">
            <Link to={`/search/${hcm}/3/1`}>
              <div className="content-overlay"></div>
              <img
                className="content-image img-fluid d-block mx-auto"
                src={Img2}
                alt=""
              />
              <div className="content-details fadeIn-bottom">
                <h3 className="content-title">Quận 3</h3>
              </div>
            </Link>
          </div>

          <div className="row city-bottom">
            <div className="col-lg-6 col-md-6 mt-30">
              <div className="content">
                <Link to={`/search/${hcm}/${binhthanh}/1`}>
                  <div className="content-overlay"></div>
                  <img
                    className="content-image img-fluid d-block mx-auto"
                    src={Img3}
                    alt=""
                  />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Quận Bình Thạnh</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-30">
              <div className="content">
                <Link to={`/search/${hcm}/${govap}/1`}>
                  <div className="content-overlay"></div>
                  <img
                    className="content-image img-fluid d-block mx-auto"
                    src={Img4}
                    alt=""
                  />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Quận Gò Vấp</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default findcity;
