import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Route, useHistory } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import {Link } from 'react-router-dom'
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import Pagination from "../Products/Pagination";
import TotalRevenue from './TotalRevenue'
const Revenue = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [total, setTotal] = useState();
  const [value, onChange] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const history = useHistory();

  //Lấy dữ liệu của sản phẩm với status === -1 (Là những sản phẩm đã được bán)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products`
        );
        const data = responseData.product.filter((data) => data.status === -1);
        setLoadedProducts(data);
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest]);

  //Chuyển đổi thành tiền của tổng tiền các sản phẩm sang giá trị là "Tỷ"
  const onUpdateHandler = () => {
    let sum = 0;
    currentPosts.map((p) => {
      let price;
      if (p.currentcy === "Triệu") {
        price = p.price * 1000000;
      } else price = p.price * 1000000000;
      sum += price;
      setTotal(sum / 1000000000);
    });
  };

  //Phân trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = loadedProducts.slice(indexOfFirstPost, indexOfLastPost).filter(p=>p.selledDate.slice(8,10).split(" ") == value.getDate());
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Lưu doanh thu vào database
  const onSaveHandler = async () => {
    try {
      let t = total * 0.2;
      await sendRequest(`http://localhost:5000/api/total/${t}`, "PATCH");
      history.push("/revenue");
      alert("Lưu thành công !");
    } catch (error) {}
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <React.Fragment>
          <div style={{ marginTop: "100px" }}>
            <h4>Tìm kiếm doanh thu theo ngày tháng!</h4>
            <Calendar
              onChange={onChange}
              value={value}
              calendarType="ISO 8601"
            />
            {console.log(value)}
            <i className="lnr lnr-pointer-down" style={{marginLeft:"140px"}}></i><Link to="/totalRevenue"><h1>Tổng doanh thu</h1></Link><i className="lnr lnr-pointer-up" style={{marginLeft:"140px"}}></i>
            <p style={{ color: "red", marginTop:"40px" }}>
              Tổng số sản phẩm đã bán ngày {value.toLocaleString().slice(10,20)} : {currentPosts.length}
            </p>
          </div>
          <div>
            <p style={{ color: "red" }}>tổng tiền đã bán ngày {value.toLocaleString().slice(10,20)}: {total} tỉ</p>
          </div>
          <div>
            <p style={{ color: "red" }}>tổng doanh thu ngày {value.toLocaleString().slice(10,20)}: {total * 0.2} tỉ</p>
          </div>
          <button
            type="button"
            class="btn btn-success"
            onClick={onUpdateHandler}
          >
            Cập nhật giá
          </button>
          <button type="button" class="btn btn-success" onClick={onSaveHandler}>
            Lưu vào dữ liệu
          </button>
          <div></div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Giá bán</th>
                <th scope="col" style={{ color: "red" }}>
                  Doanh thu của công ty
                </th>
                <th scope="col">Ảnh</th>
                <th scope="col">Loại</th>
                <th scope="col">Diện tích</th>
                <th scope="col"> Ngày bán </th>
                <th scope="col"> Người bán </th>
              </tr>
            </thead>
            <tbody>
              {console.log(currentPosts)}
              {currentPosts.map((p) => (
                <tr>
                  <th>{p.title}</th>
                  <td>
                    Địa chỉ: {p.address.street}, <br /> Quận:{" "}
                    {p.address.district}
                    ,<br /> TP: {p.address.city}
                  </td>
                  <td>
                    {p.price} {p.currentcy}
                  </td>
                  <td style={{ color: "red" }}>
                    {p.price * 0.2} {p.currentcy}
                  </td>
                  <td>
                    <img
                      style={{ height: "100px", width: "150px" }}
                      src={`http://localhost:5000/${p.image}`}
                    />
                  </td>
                  <td>{p.productType}</td>
                  <td>{p.area} m2</td>
                  <td>{p.selledDate.split("T")[0]}</td>
                  <td>{p.seller}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={loadedProducts.length}
            paginate={paginate}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Revenue;
