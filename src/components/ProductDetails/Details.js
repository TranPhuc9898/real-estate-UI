import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Details = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();
  const [checking, setCheking] = useState();
  const [loadedLike, setLoadedLike] = useState();
  const productId = useParams().productId;
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`
        );
        setLoadedProducts(responseData.product);
        let check = responseData.product.likes.find((el) => el === auth.userId);
        console.log(check);
        if (check) {
          setCheking(true);
        } else {
          setCheking(false);
        }
      } catch (error) {}
    };
    fetchDetails();
  }, [sendRequest, productId]);

  const onChangeHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/products/sell/${loadedProducts.id}/${auth.userId}`,
        "PATCH",
        JSON.stringify({
          status: "-1",
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {}
  };
  const OnLikeHandler = async () => {
    if (!auth.isLoggedIn) {
      alert("Vui lòng đăng nhập trước khi sử dụng chức năng này!!!");
    } else {
      if  (checking) {
        setLoadedLike(loadedProducts.likes.length - 1);
        setCheking(false);
        try {
          await sendRequest(
            `http://localhost:5000/api/products/removelike/${loadedProducts.id}/${auth.userId}`,
            "DELETE"
          );         
          alert("Unliked!");
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoadedLike(loadedProducts.likes.length + 1);
        try {
          await sendRequest(
            `http://localhost:5000/api/products/like/${loadedProducts.id}/${auth.userId}`,
            "PATCH"
          );
          alert("Liked");
          setCheking(true);
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <section className="blog_area single-post-area p_120">
          <div className="container">
            <div className="row mt-80">
              <div className="col-lg-8 posts-list">
                <div className="single-post row">
                <div className="col-lg-4  col-md-4">
                    <div className="blog_info text-right">
                      <ul className="blog_meta list">
                        <li>
                          <a>
                            {loadedProducts.submition}
                            {"\t"}
                            <i className="lnr lnr-user"></i>
                          </a>
                        </li>
                        <li>
                          <a>
                            {loadedProducts.date.split("T")[0]}{"\t"}
                            <i className="lnr lnr-calendar-full"></i>
                          </a>
                        </li>
                        <li>
                          <a>
      {loadedProducts.views}{"\t"}
                            <i className="lnr lnr-eye"></i>
                          </a>
                        </li>
                        <li>
                          <button onClick={OnLikeHandler}>
                            {checking ? "Đã thích" : "Thích"  }  {"\t"}
                            <i className="lnr lnr-heart"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="feature-img">
                      <img
                        className="img-fluid"
                        src={`http://localhost:5000/${loadedProducts.image}`}
                        alt=""
                        style={{height:"300px", width:"500px"}}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-3  col-md-3">
                    <div className="blog_info text-right">
                      <ul className="blog_meta list">
                        <li>
                          <a>
                            {loadedProducts.submition}
                            {"\t"}
                            <i className="lnr lnr-user"></i>
                          </a>
                        </li>
                        <li>
                          <a>
                            12 Dec, 2017{"\t"}
                            <i className="lnr lnr-calendar-full"></i>
                          </a>
                        </li>
                        <li>
                          <a>
                            1.2M Views{"\t"}
                            <i className="lnr lnr-eye"></i>
                          </a>
                        </li>
                        <li>
                          06 Comments{"\t"}
                          <i className="lnr lnr-bubble"></i>
                        </li>
                        <li>
                          <button onClick={OnLikeHandler}>
                            {checking ? "Đã thích" : "Thích"  }  {"\t"}
                            <i className="lnr lnr-heart"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                  <div className="col-lg-9 col-md-9 blog_details">
                    <h1>Tên: {loadedProducts.title}</h1>
                    <hr />
                    <p className="excert">
                      <h2 style={{ color: "red" }}>
                        Gía :{" "}
                        {loadedProducts.price
                          .toFixed(0)
                          .replace(".", ",")
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                        {loadedProducts.currentcy}
                      </h2>
                    </p>
                    <p>
                      <table class="table table-dark">
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td rowspan="3" style={{ textAlign: "center" }}>
                              Địa chỉ
                            </td>
                            <td>Đường</td>
                            <td>{loadedProducts.address.street}</td>
                          </tr>
                          <tr>
                            <td>Thành Phố:</td>
                            <td>{loadedProducts.address.city}</td>
                          </tr>
                        </tbody>
                      </table>
                    </p>
                    <p>
                      <h2>Diện tích: {loadedProducts.area} m2</h2>
                    </p>
                    <p>
                      <p style={{ color: "green" }}>
                        Ngày đăng: {loadedProducts.date.split("T")[0]}{" "}
                      </p>
                    </p>
                    <p>
                      <p style={{ color: "red" }}>
                        Ngày hết hạn: {loadedProducts.endDate.split("T")[0]}{" "}
                      </p>
                    </p>
                  </div>
                  <hr />
                  <br />
                  <div className="col-lg-12">
                    <div className="quotes">
                      <h1>Mô tả:</h1>
                      <p>{loadedProducts.description}</p>
                    </div>
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <img
                          className="img-fluid"
                          src="img/blog/post-img2.jpg"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-12 mt-25"></div>
                    </div>
                    {auth.isAdmin && (
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={onChangeHandler}
                        >
                          ĐÃ BÁN
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget author_widget">
                    <img
                      className="author_img rounded-circle"
                      src="img/blog/author.png"
                      alt=""
                    />
                    <h4>Charlie Barber</h4>
                    <p>Senior blog writer</p>
                    <div className="social_icon">
                      <a href="/">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-github"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-behance"></i>
                      </a>
                    </div>
                    <p>
                      Boot camps have its supporters andit sdetractors. Some
                      people do not understand why you should have to spend
                      money on boot camp when you can get. Boot camps have
                      itssuppor ters andits detractors.
                    </p>
                    <div className="br"></div>
                  </aside>
                  <aside className="single_sidebar_widget popular_post_widget">
                    <h3 className="widget_title">Popular Posts</h3>
                    <div className="media post_item">
                      <img src="img/blog/popular-post/post1.jpg" alt="post" />
                      <div className="media-body">
                        <a href="blog-details.html">
                          <h3>Space The Final Frontier</h3>
                        </a>
                        <p>02 Hours ago</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img src="img/blog/popular-post/post2.jpg" alt="post" />
                      <div className="media-body">
                        <a href="blog-details.html">
                          <h3>The Amazing Hubble</h3>
                        </a>
                        <p>02 Hours ago</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img src="img/blog/popular-post/post3.jpg" alt="post" />
                      <div className="media-body">
                        <a href="blog-details.html">
                          <h3>Astronomy Or Astrology</h3>
                        </a>
                        <p>03 Hours ago</p>
                      </div>
                    </div>
                    <div className="media post_item">
                      <img src="img/blog/popular-post/post4.jpg" alt="post" />
                      <div className="media-body">
                        <a href="blog-details.html">
                          <h3>Asteroids telescope</h3>
                        </a>
                        <p>01 Hours ago</p>
                      </div>
                    </div>
                    <div className="br"></div>
                  </aside>
                  <aside className="single_sidebar_widget ads_widget">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="img/blog/add.jpg"
                        alt=""
                      />
                    </a>
                    <div className="br"></div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Details;
