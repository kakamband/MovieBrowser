import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { Slide } from "react-reveal";
import classes from "./MovieDetails.module.sass";

class MovieDetails extends Component {
  state = {
    movieDetailsClosed: false,
    displayContent: false
  };

  componentDidMount = () => {
    this.setState({
      movieDetailsClosed: true
    });
  };

  closeMovieDetails = () => {
    this.setState({
      movieDetailsClosed: false
    });
    setTimeout(() => {
      this.props.changeLoadingState(true);
      this.props.toggleMovieDetails();
    }, 1000);
  };

  render() {
    return (
      <Slide down when={this.state.movieDetailsClosed}>
        {!this.props.loading ? (
          <div
            style={{
              background: `url(https://image.tmdb.org/t/p/original/${
                this.props.movieDetails.backdrop_path
              })`
            }}
            className={classes.movieDetailsMainDiv}
          >
            <div className={classes.opacityLayerDiv}>
              <div
                className={
                  "animated fadeInDown fast " + classes.movieDetailsContainerDiv
                }
              >
                <div className={classes.chevronDiv}>
                  <i
                    onClick={this.closeMovieDetails}
                    className={classes.chevronIcon + " material-icons"}
                  >
                    chevron_left
                  </i>
                </div>
                <div className={classes.titleSectionDiv}>
                  <div className={classes.movieTitleDiv}>
                    <h5 className={classes.movieTitleHeader}>
                      {this.props.movieDetails.title}
                    </h5>
                  </div>
                  <div className={classes.movieDescribtionDiv}>
                    <p className={classes.movieDescribtionText}>
                      {this.props.movieDetails.overview}
                    </p>
                  </div>
                </div>
                <div className={classes.infoSectionDiv}>
                  <div className={classes.movieInfoDiv}>
                    <ul>
                      <li>
                        Release Date: {this.props.movieDetails.release_date}
                      </li>
                      <li>
                        Production:{" "}
                        {this.props.movieDetails.production_companies[0].name}
                      </li>
                      <li>
                        Runtime:{" "}
                        {parseInt(this.props.movieDetails.runtime / 60)} hours{" "}
                        {this.props.movieDetails.runtime -
                          parseInt(this.props.movieDetails.runtime / 60) *
                            60}{" "}
                        minutes
                      </li>
                      <li>
                        Avarage rating: {this.props.movieDetails.vote_average}
                      </li>
                      <li>Budget: {this.props.movieDetails.budget}</li>
                      <li>
                        Revenue:{" "}
                        {this.props.movieDetails.revenue === 0
                          ? "No data available yet"
                          : this.props.movieDetails.revenue}
                      </li>
                      <li>
                        Genres:{" "}
                        {this.props.movieDetails.genres.map((genre, index) => {
                          if (
                            index ===
                            this.props.movieDetails.genres.length - 1
                          ) {
                            return genre.name;
                          } else {
                            return genre.name + ", ";
                          }
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.loadingContainer}>
            <div className={classes.loadingDiv} />
          </div>
        )}
      </Slide>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres,
    movieDetails: state.movieDetails,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoadingState: loading =>
      dispatch(actionTypes.changeLoadingState(loading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);