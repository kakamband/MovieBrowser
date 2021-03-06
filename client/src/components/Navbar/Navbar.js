import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import * as actionTypes from "../../store/actionTypes";
import classes from "./Navbar.module.sass";

class Navbar extends Component {
  state = {
    searchValue: "",
    animationClass: "",
    inputStyle: {}
  };

  componentDidMount = () => {
    console.log(window.location.pathname);
    if (window.location.pathname === "/") {
      this.setState({
        inputStyle: {
          textAlign: "center",
          marginRight: "auto"
        }
      });
    }
  };

  changeInputState = e => {
    this.setState({
      searchValue: e.target.value
    });
    console.log(e.target.value);
  };

  submitValue = history => {
    if (this.state.searchValue.trim()) {
      this.props.submitSearchValue(this.state.searchValue);
      history.push("/search");
    } else {
      this.setState({
        animationClass: "animated shake "
      });
    }
  };

  render() {
    return (
      <div className={classes.mainNavDiv}>
        {this.props.showChevron ? (
          <NavLink to="/">
            <div className={classes.chevronDiv}>
              <i className={"material-icons " + classes.chevronIcon}>
                chevron_left
              </i>
            </div>
          </NavLink>
        ) : null}
        <div
          style={this.state.inputStyle}
          className={this.state.animationClass + classes.inputDiv}
        >
          <input
            className={classes.searchInput}
            placeholder="search"
            type="text"
            onChange={this.changeInputState}
            value={this.state.searchValue}
            onKeyUp={this.checkForSubmit}
          />
          <div className={classes.searchIconDiv}>
            <Route
              render={({ history }) => (
                <i
                  onClick={() => this.submitValue(history)}
                  className={"material-icons " + classes.searchIcon}
                >
                  search
                </i>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSearchValue: search => dispatch(actionTypes.getSearchValue(search))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
