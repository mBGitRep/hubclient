import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Profiles from "./Profiles";
import "./Home.css";

function Home({ user, setUser }) {
  return (
    <div className="home">
      <header>
        <h1>Hub360</h1>
      </header>

      <nav>
        <div className="container">
          <div className="nav">
            {user ? (
              <>
                <p>
                  <Link to="/addprofile">Add your Profile</Link>
                </p>
                <p>
                  {/* <Link to="/connections">My Connections</Link> */}
                </p>
                <p>
                  <Logout setUser={setUser} />
                </p>
                <p>
                  {/* <Link to="/search">Search</Link> */}
                </p>
              </>
            ) : (
              <>
                <p>
                  <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                  <Link to="/">Login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </nav>

      <section>
        {user && (
          <div className="profile">
            <h2>My Profile</h2>
            <img
              src="https://nssdc.gsfc.nasa.gov/planetary/banner/uranus.gif"
              alt="Your Profile Image"
              className="profile-image"
            />
            <div className="profile-info">
              <p>Name: Mirza Baig</p>
              <p>Experience: Over a decade of failing to learn code.</p>
              <p>Education: Software Engineer, studied at amazing General Assembly.</p>
              <p>Location: Adelaide, Australia.</p>
            </div>
          </div>
        )}

        <Profiles />
      </section>
    </div>
  );
}

export default Home;
