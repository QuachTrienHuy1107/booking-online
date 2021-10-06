import TitleNavigation from "components/common/title-navigation";
import MovieRecommend from "components/movie-recommend";
import { Movies } from "components/movies";
import React from "react";
import { Container } from "react-bootstrap";
import { ROUTES } from "utils/constant";
import "../styles/pages/_home.scss";
import primierBanner from "../assets/images/premier.webp";

const Home: React.FC = () => {
    return (
        <div className="home">
            <Container>
                <Movies />
            </Container>

            <section className="premier">
                <Container>
                    <img src={primierBanner} alt="" />
                    <div className="heading-title--hasFence">
                        <TitleNavigation title="Premieres" linkTo={ROUTES.MOVIELIST} subTitle="See all" />
                    </div>

                    <p>Brand new releases every Friday</p>
                    <MovieRecommend isHome={true} />
                </Container>
            </section>
        </div>
    );
};
export default Home;
