import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Profiles from "./Profiles";

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
                  <Logout setUser={setUser} />
                </p>
                <p>
                  <Link to="/search">Search</Link>
                </p>
              </>
            ) : (
              <>
                <p>
                  <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                  <Link to="/login">Login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </nav>

      <section>
        {user && (
          <div className="profile">
            <h2>Your Profile</h2>
            <img
              src="/path/to/your/image.jpg"
              alt="Your Profile Image"
              className="profile-image"
            />
            <div className="profile-info">
              <p>Name: Your Name</p>
              <p>Experience: Your Experience</p>
              <p>Education: Your Education</p>
              <p>Location: Your Location</p>
            </div>
          </div>
        )}

        <Profiles />
      </section>
    </div>
  );
}

export default Home;
