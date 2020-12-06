import React from 'react'

const footer =() => (
    <footer className="footer-area section-gap">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>Địa chỉ công ty</h6>
						<p style={{color:'white'}}>
							Địa chỉ: 1 Nguyễn Huệ, Quận 1, TP. HCM
						</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>Thư ngỏ</h6>
						<p style={{color:'white'}}>Hãy luôn cập nhật thông tin của chúng tôi nhé !</p>
						
					</div>
				</div>
				
				<div className="col-lg-2 col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>Theo dõi</h6>
						<p style={{color: "white"}}>Let us be social</p>
						<div className="footer-social d-flex align-items-center">
							<a><i className="fa fa-facebook"></i></a>
							<a><i className="fa fa-twitter"></i></a>
							<a><i className="fa fa-dribbble"></i></a>
							<a><i className="fa fa-behance"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-2 col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>Liên Hệ</h6>
						<a href="tel:++880 1234 654 953">+092 760 9847</a>
					</div>
				</div>
			</div>
			{/* <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
				<p className="footer-text m-0">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
</p>
			</div> */}
		</div>
	</footer>
)

export default footer;