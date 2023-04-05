import "../style/home.css";
import Logo from "../images/logos.png";
import Gradient from "../images/gradient.jpg";
import Footer from "./Footer";

function Home() {
  return (
    <div
      className="background-image-home"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="home-page-container">
        <img src={Logo} alt="Logo" className="home-page-logo" />
        <p className="intro-text">
          Welcome to The Back End Café, where we combine the art of programming
          with the craft of coffee. Our café offers a unique atmosphere where
          you can indulge in your passion for coding while enjoying a delicious
          cup of coffee.
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
