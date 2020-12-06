import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import Pagination from '../Products/Pagination'
const Revenue = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [total, setTotal] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const history = useHistory();

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
  const onUpdateHandler =  () => {
    let sum = 0;
    loadedProducts.map((p) => {
      let price;
      if (p.currentcy === "Triệu") {
        price = p.price * 1000000;
      } else price = p.price * 1000000000;
      sum += price;
      setTotal(sum / 1000000000);
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = loadedProducts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
            <p style={{ color: "red" }}>
              Tổng số sản phẩm đã bán : {loadedProducts.length}
            </p>
          </div>
          <div>
            <p style={{ color: "red" }}>tổng tiền đã bán: {total} tỉ</p>
          </div>
          <div>
            <p style={{ color: "red" }}>tổng doanh thu: {total*0.2} tỉ</p>
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
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Giá bán</th>
                <th scope="col" style={{color:"red"}}>Doanh thu của công ty</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Loại</th>
                <th scope="col">Diện tích</th>
                <th scope="col"> Ngày bán </th>
                <th scope="col"> Người bán </th>
              </tr>
            </thead>
            <tbody>
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
                  <td style={{color:"red"}}>
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
