import React from 'react'
import Img from '../img/about-img-1.jpg'

const aboutarea =() => (
    <section className="about-area">
		<div className="container-fluid">
			<div className="row d-flex justify-content-end align-items-center">
				<div className="col-lg-6 about-left">
					<div className="single-about">
						<h4>Tại sao lại chọn để tin tưởng chúng tôi? </h4>
						<p>
							Công ty chúng tôi được thành lập từ năm 2020 với khẩu hiệu :"Nhanh chóng, Tận tâm, Uy tín".
						</p>
					</div>
					<div className="single-about">
						<h4>Về sản phẩm của chúng tôi ! </h4>
						<p>
							Chúng tôi sẽ mang đến cho bạn những sản phẩm chất lượng với giá thành rẻ nhất ! Cập nhật sản phẩm nhanh chóng với những ưu đãi hấp dẫn ! 
						</p>
					</div>
					<div className="single-about">
						<h4>Độ đáng tin cậy về chất lượng và dịch vụ !</h4>
						<p>
							.......
						</p>
					</div>
				</div>
				<div className="col-lg-6 about-right no-padding">
					<img className="img-fluid" src={Img} alt=""/>
				</div>
			</div>
		</div>
	</section>
)

export default aboutarea;