const Home = () => {
  return (
    <div>
      <div className="home">
        <h1>welcome</h1>
        <h3> You are watching </h3>

        <h4>
          <b>web-extension</b>
        </h4>
        <div className="iframe">
          <iframe
            width="350"
            height="400"
            src="https://www.youtube.com/embed/t8HrZTLRCeU"
            title="YouTube video player"
            allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
