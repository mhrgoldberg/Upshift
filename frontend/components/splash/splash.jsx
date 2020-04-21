import React from "react";
import { Link } from "react-router-dom";
import SplashFooter from "./splash_footer";

const Splash = () => (
  <div className="splash">
    <Link to="/signup">
      <button className="splash-button">Start Your Journey Now!</button>
    </Link>
    <SplashFooter />
  </div>
);

export default Splash;
