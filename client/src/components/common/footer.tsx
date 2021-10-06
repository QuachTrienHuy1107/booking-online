import newsletter from "assets/images/newslater-bg01.jpg";
import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/components/_footer.scss";
import Logo from "./logo";

const Footer: React.FC = () => {
    return (
        <section className="footer">
            <div className="newsletter">
                <Container>
                    <div
                        className="newslater-container bg_img"
                        data-background="./assets/images/newslater/newslater-bg01.jpg"
                        style={{ backgroundImage: `url(${newsletter})` }}
                    >
                        <div className="newslater-wrapper">
                            <h5 className="cate">subscribe to Boleto </h5>
                            <h3 className="title">to get exclusive benifits</h3>
                            <form className="newslater-form">
                                <input type="text" placeholder="Your Email Address" />
                                <button type="submit">subscribe</button>
                            </form>
                            <p>We respect your privacy, so we never share your info</p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="footer__detail">
                <Container>
                    <div className="footer__detail__top">
                        <div className="footer__detail__top--img">
                            <Logo />
                        </div>
                        <div className="footer__detail__top--social">
                            <ul>
                                <li>
                                    <a href="/">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fab fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fab fa-google" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <i className="fab fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__detail__bottom">
                        <div className="footer__detail__bottom--left">
                            <p>Copyright © 2021.All Rights Reserved By BookMyShow </p>
                        </div>
                        <div className="footer__detail__bottom--right">
                            <ul>
                                <li>
                                    <a href="/">About</a>
                                </li>
                                <li>
                                    <a href="/">Terms of use</a>
                                </li>
                                <li>
                                    <a href="/">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/">FAQ</a>
                                </li>
                                <li>
                                    <a href="/">Feedback</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};
export default Footer;
