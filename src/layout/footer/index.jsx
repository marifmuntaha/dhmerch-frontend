import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="nk-footer">
            <div className="container-fluid">
                <div className="nk-footer-wrap">
                    <div className="nk-footer-copyright">
                        {" "}
                        &copy; 2023 DH Media by <a href="#">Yayasan Darul Hikmah Menganti</a>
                    </div>
                    <div className="nk-footer-links">
                        <ul className="nav nav-sm">
                            <li className="nav-item">
                                <Link to={`#`} className="nav-link">
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`#`} className="nav-link">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`#`} className="nav-link">
                                    Bantuan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;