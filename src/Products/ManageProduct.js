import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { Link, useHistory } from "react-router-dom";
import "./ManageProduct.css";

import Pagination from './Pagination'
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

//Trang quản lý sản phẩm
const ManageProduct = (props) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const history = useHistory();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = loadedProducts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  //Lấy dữ liệu sản phẩm với status === 1 (là những sản phẩm đã được Admin kiểm duyệt)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products`
        );
        const data = responseData.product.filter((data) => data.status === 1);
        setLoadedProducts(data);
        console.log(responseData.product);
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest]);

  //Xoá sản phẩm
  const onDeleteHandler = async (p) => {
    try {
      await sendRequest(`http://localhost:5000/api/products/${p}`, "DELETE");
      history.push("/manageProduct");
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
        <React.Fragment  >
          <div style={{ marginTop: "100px" }}>
            <p style={{color:"red"}}>Tổng số sản phẩm : {loadedProducts.length}</p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Giá</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Loại</th>
                <th scope="col">Diện tích</th>
                <th scope="col">Người duyệt</th>
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
                  <td>
                    <img
                      style={{ height: "100px", width: "150px" }}
                      src={`http://localhost:5000/${p.image}`}
                    />
                  </td>
                  <td>{p.productType}</td>
                  <td>{p.area} m2</td>
                  <td>{p.submition}</td>
                  <td>
                    <Link to={`/products/${p.id}`}>
                      <button type="button" class="btn btn-success">
                        Cập nhật
                      </button>
                    </Link>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => onDeleteHandler(p.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={loadedProducts.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};

export default ManageProduct;
