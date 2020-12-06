import React from 'react'
import ProductItem from './ProductItem'
import {Link} from 'react-router-dom'

const productList = props => {
    if (props.items.length === 0) {
        return (
          <div className="center">
            <h2>Không tìm thấy kết quả! </h2>
            <Link to= "/"><button className="btn btn-warning"> Trở về trang chủ </button></Link>
          </div>
        );
      }
    return(
        <div className="row">
            {props.items.map(product => (
                <ProductItem 
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price = {product.price}
                currentcy = {product.currentcy}
                address={product.address}
                img={product.image}
                area={product.area}
                date={product.date.split("T")[0]}
                enddate= {product.endDate.split("T")[0]}
                productType = {product.productType}
                like = {product.likes}
                views={product.views} />
            ))}
        </div>
    )
}

export default productList;