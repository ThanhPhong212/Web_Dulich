import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: "",
    };
  }

  componentDidMount() {
    this.props.getTopHotel("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tophotel !== this.props.tophotel) {
      this.setState({
        hotel: this.props.tophotel,
      });
    }
  }
  //load
  handleViewHotel = () => {
    this.props.history.push(`/khach-san`);
  };

  hotelinfo = (item) => {
    this.props.history.push(`/thong-tin-khach-san/${item.id}`);
  };

  render() {
    let { hotel } = this.state;
    return (
      <div className="section_container">
        <div className="section_content">
          <div className="section_title text-center">
            <b>KHÁCH SẠN</b>
          </div>
          <Slider {...this.props.settings}>
            {hotel &&
              hotel.length > 0 &&
              hotel.map((item, index) => {
                return (
                  <div className="secsion_customize">
                    <div className="customize">
                      <div
                        className="image"
                        dangerouslySetInnerHTML={{ __html: item.imgHTML }}
                      ></div>

                      <div className="info">
                        <div className="name" onClick={() => this.hotelinfo(item)}>
                          <b>{item.name}</b>
                        </div>
                        <div className="addresshotel">
                          <i className="fas fa-map-marker-alt"></i> {item.address}
                        </div>
                        <div className="pricehotel">
                          Giá: {item.price}
                          <button className="btn-tour" onClick={() => this.hotelinfo(item)}>
                            Đặt phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
          <div className="section_btn text-center">
            <button onClick={() => this.handleViewHotel()}>
              <b>Xem Thêm</b>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tophotel: state.admin.tophotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopHotel: (id) => dispatch(actions.getTopHotel(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotel));
