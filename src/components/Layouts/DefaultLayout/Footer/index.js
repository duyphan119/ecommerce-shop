import React from "react";
import TitleComponent from "../../../Common/TitleComponent";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="bg-primary py-2">
      <div className="container">
        <div className="row text-light">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <TitleComponent title="Giới thiệu" className="text-md-center" />
            <ul>
              <li className="my-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus omnis hic alias libero dicta laborum enim animi fuga
                cum nesciunt, quod nulla dolorum pariatur fugit. Sequi ex earum
                in similique!
              </li>
              <li className="footer-contact-item-left">
                <a
                  href="/#"
                  className="footer-contact-item-left-link text-light text-decoration-none mr-1 d-inline-flex align-items-center justify-content-center"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  href="/#"
                  className="footer-contact-item-left-link text-light text-decoration-none mr-1 d-inline-flex align-items-center justify-content-center"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="/#"
                  className="footer-contact-item-left-link text-light text-decoration-none mr-1 d-inline-flex align-items-center justify-content-center"
                >
                  <i className="fa fa-google"></i>
                </a>
                <a
                  href="/#"
                  className="footer-contact-item-left-link text-light text-decoration-none d-inline-flex align-items-center justify-content-center"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <TitleComponent title="Liên hệ" className="text-md-center" />
            <ul>
              <li className="d-flex align-items-center my-1">
                <div className="footer-contact-item-left mr-1">
                  <span className="d-flex justify-content-center align-items-center">
                    <i
                      className="fa fa-envelope footer-icon"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <span className="footer-contact-item-right">
                  6051071019@st.utc2.edu.vn
                </span>
              </li>
              <li className="d-flex align-items-center my-1">
                <div className="footer-contact-item-left mr-1">
                  <span className="d-flex justify-content-center align-items-center">
                    <i
                      className="fa fa-map-marker footer-icon"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <span className="footer-contact-item-right">
                  115/20 Hoàng Hoa Thám, Phường 2, Thành phố Tân An, tỉnh Long
                  An
                </span>
              </li>
              <li className="d-flex align-items-center my-1">
                <div className="footer-contact-item-left mr-1">
                  <span className="d-flex justify-content-center align-items-center">
                    <i
                      className="fa fa-phone footer-icon"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <span className="footer-contact-item-right">0385981196</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
