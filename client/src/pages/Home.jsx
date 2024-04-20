import Banner from "../components/Banner";
import Home_Section01 from "../components/Home_Section01";
import { homeData } from "../data/home";

const Home = () => {
  
  return (
    homeData && (
      <div className="home_container">
        <div className="wrapper">
          <Banner />
          <Home_Section01 />
        </div>
      </div>
    )
  );
};

export default Home;
