import React, { Component } from "react";
import { connect } from "react-redux";
import "./Banner.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourNAV: "",
    };
  }
  async componentDidMount() {
    this.props.getTourNav(4);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topTourNAV !== this.props.topTourNAV) {
      this.setState({
        tourNAV: this.props.topTourNAV,
      });
    }
  }
  handleInfoTour = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      pauseOnFocus: true,
    };
    let { tourNAV } = this.state;
    return (
      <div className="home-baner">
        <Slider {...settings}>
          {tourNAV &&
            tourNAV.length > 0 &&
            tourNAV.map((item, index) => {
              return (
                <>
                  <div className="baner-top" key={index}></div>

                  <div className="bander_name">
                    <div className="" dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}></div>
                    <div className="name" onDoubleClick={() => this.handleInfoTour(item)}>
                      {item.name}
                    </div>
                  </div>
                </>
              );
            })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topTourNAV: state.admin.topTourNAV,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourNav: (limit) => dispatch(actions.getTourNav(limit)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
