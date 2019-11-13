import React from 'react';
import { Link } from 'react-router-dom'

const SplashFooter = () => (
  <footer>
    <div className="footer-content"> 
    <section className="left-side-footer">
      <h3>
        Follow
      </h3>
      <a href="https://github.com/mitchellreiss">GitHub</a>
      <a href="https://www.linkedin.com/in/mitchell-reiss/">LinkedIn</a>
    </section>
    <section className="right-side-footer">
      <h1>
        UpShift
      </h1>
      <h3>
        <Link to="/signup">
        Start your journey today!
        </Link>
      </h3>
      
    </section>
    </div>
  </footer>
)

export default SplashFooter;