import React from "react";
import "../style/aboutUs.css";
import Gradient from "../images/gradient.jpg";

function AboutUs() {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>Discover Our Story</h1>
          <p className="about-us-intro">
            At Back End Café, we believe that coffee and coding go hand in hand.
            Just as coffee is the fuel that keeps you going, programming is the
            brainpower that fuels your creativity and innovation. Our menu
            features a variety of coffee blends, each with its unique taste and
            aroma, carefully selected to inspire and invigorate your senses.
          </p>
        </div>

        <div className="about-us-body">
          <h2>The Perfect Blend</h2>
          <p className="about-us-description">
            Our café is designed with a programming theme, with cozy seating
            arrangements that resemble a coding workstation, complete with
            desks, monitors, and keyboard trays. Whether you're looking for a
            quiet place to work on your coding project or want to discuss the
            latest tech trends with like-minded individuals, Back End Café is
            the perfect place to be.
          </p>

          <h2>Knowledgeable Staff</h2>
          <p className="about-us-description">
            Our staff is knowledgeable, friendly, and passionate about both
            coffee and coding. They are always happy to offer recommendations on
            our coffee blends, as well as tips and tricks on coding techniques
            and tools.
          </p>

          <h2>A Community of Tech Enthusiasts</h2>
          <p className="about-us-description">
            So, come on in and enjoy a cup of coffee with a side of coding
            inspiration. At Back End Café, we're more than just a coffee shop;
            we're a community of tech enthusiasts who share a love for
            programming and coffee.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
