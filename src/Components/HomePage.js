import HomeImage from "../Assets/Images/HomeImg.png";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="welcome-text">Welcome to My Awesome Site</h1>
      <p className="subtext">Explore, interact, and enjoy the experience!</p>
      <div className="image-container">
        <img src={HomeImage} alt="Homepage Illustration" className="homepage-image" />
      </div>
    </div>
  );
};

export default HomePage;
