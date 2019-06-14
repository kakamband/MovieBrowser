import React, { Component } from "react";
import classes from "./MovieList.module.sass";
import { connect } from "react-redux";
import Slider from "react-slick";

import MovieCard from "../MovieCard/MovieCard";

class MovieList extends Component {
  state = {
    movies: [],
    data: [],
    genres: []
  };

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    console.log(this.props.genres);
    setTimeout(() => {
      fetch(`/api/${this.props.path}`)
        .then(res => res.json())
        .then(movies => {
          const parsedMovies = JSON.parse(movies);
          console.log(parsedMovies);
          this.setState({
            movies: parsedMovies
          });
          let data = [];
          parsedMovies.results.forEach(movie => {
            let genresName = [];
            console.log(this.props.genres);
            genresName.push(
              this.props.genres.find(key => key.id === movie.genre_ids[0])
            );
            console.log(genresName);
            data.push({
              imgSrc:
                "https://image.tmdb.org/t/p/original/" + movie.poster_path,
              title: movie.title,
              genre: genresName[0].name
            });
            this.setState({
              data: data
            });
          });
        })
        .then(() => {
          if (this.props.closeLoadingScreen) {
            this.props.closeLoadingScreen();
          }
        });
    }, 1000);
  };

  settings = {
    dots: false,
    slidesToShow: 5,
    speed: 400,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  render() {
    return (
      <div>
        <div className={classes.mainMovieListDiv}>
          <h5 className={classes.movieListHeader}>{this.props.title}</h5>
          <Slider className={classes.movieCardsContainer} {...this.settings}>
            {this.state.data.map(movie => {
              return (
                <MovieCard
                  key={movie.imgSrc}
                  imagePath={movie.imgSrc}
                  title={movie.title}
                  genre={movie.genre}
                />
                // <div dsiapl>
                //   <img src={movie.imgSrc} width="250px" />
                // </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};

export default connect(
  mapStateToProps,
  null
)(MovieList);
