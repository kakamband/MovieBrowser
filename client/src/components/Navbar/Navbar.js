import React, { Component } from "react";
import TMDBLogo from "./TMDBLogo.svg";
import classes from "./Navbar.module.sass";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className={classes.mainNavDiv}>
        <div className={classes.logoDiv}>
          <img alt="" className={classes.TMDBlogo} src={TMDBLogo} />
        </div>
        <div className={classes.inputDiv}>
          <input
            className={classes.searchInput}
            placeholder="search"
            type="text"
          />
          <div className={classes.searchIconDiv}>
            <i className={"material-icons " + classes.searchIcon}>search</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;