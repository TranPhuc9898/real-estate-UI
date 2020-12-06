import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const UproductItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const dateInterval = setInterval(() => {
      const date = dayjs();
      const enddate = dayjs(props.enddate);
      if (date - enddate > 0) {
        console.log("Delete");
        confirmDeleteHandler();
      }
    }, 86400000);
    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${props.id}`,
        "DELETE"
      );
      props.delete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="col-lg-4">
        <div className="single-property">
          <div className="images">
            <img
              style={{ height: "400px", width: "400px" }}
              className="img-fluid mx-auto d-block"
              src={`http://localhost:5000/${props.img}`}
              alt=""
            />
          </div>

          <div className="desc">
            <div className="top d-flex justify-content-between">
              <h4>
                <a>{props.title}</a>
              </h4>
              <p></p>
            </div>
            <div>
              <div className="d-flex justify-content-start">
                <p>
                  Giá:{" "}
                  {props.price
                    .toFixed(0)
                    .replace(".", ",")
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                  {props.currentcy}
                </p>
              </div>
              <p>Thể Loại: {props.productType}</p>
            </div>
            <div style={{ color: "red" }}>Diện tích: {props.area} m2</div>
            <div> Quận: {props.address.district} </div>
            <div> Thành Phố: {props.address.city} </div>
            <div style={{ fontSize: "14px", color: "green" }}>
              {" "}
              Ngày đăng: {props.date}{" "}
            </div>
            <div style={{ textAlign: "center" }}>
              <Link to="/details">
                <p> Click vào đây để xem chi tiết</p>
              </Link>
            </div>
            <div className="bottom d-flex justify-content-start">
              <p>
                <span className="lnr lnr-heart"></span> 15 Likes
              </p>
              <p>
                <span className="lnr lnr-bubble"></span> 02 Comments
              </p>
            </div>
            <div className="bottom d-flex justify-content-start">
              <Link to={`/products/${props.id}`}>
                <button type="button" class="btn btn-success">
                  CẬP NHẬT
                </button>
              </Link>
              <button
                style={{ marginLeft: "20px" }}
                type="button"
                class="btn btn-danger"
                onClick={confirmDeleteHandler}
              >
                XOÁ
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UproductItem;
