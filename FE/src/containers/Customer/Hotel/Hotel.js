import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HeaderPage/HomeHeader";
import "./hotel.scss";
import * as actions from "../../../store/actions";
import Bookhotel from "../Modal/Bookhotel";
class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tophotel: "",
      hotel: "",
    };
  }
  componentDidMount() {
    this.props.getTopHotel("ALL");
    this.props.getHotel("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tophotel !== this.props.tophotel) {
      this.setState({
        tophotel: this.props.tophotel,
      });
    }
    if (prevProps.hotel !== this.props.hotel) {
      this.setState({
        hotel: this.props.hotel,
      });
    }
  }
  hotelinfo = (item) => {
    this.props.history.push(`/thong-tin-khach-san/${item.id}`);
  };
  render() {
    let { tophotel, hotel } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="hotel_container">
          <div className="hotel_content">
            <div className="left">
              <div className="titlehotel">Khách Sạn</div>
              <div className="hotel_item">
                {hotel &&
                  hotel.length > 0 &&
                  hotel.map((item, index) => {
                    return (
                      <div className="item" onClick={() => this.hotelinfo(item)}>
                        <div
                          className="img"
                          dangerouslySetInnerHTML={{ __html: item.imgHTML }}
                        ></div>
                        <div className="name">{item.name}</div>
                        <div className="address">{item.address}</div>
                        <div className="price">Giá: {item.price}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="right">
              <div className="tophotel">
                <div className="title">Khách sạn nổi bật</div>
                {tophotel &&
                  tophotel.length > 0 &&
                  tophotel.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <div
                          className="image"
                          dangerouslySetInnerHTML={{ __html: item.imgHTML }}
                        ></div>
                        <div className="name" onClick={() => this.hotelinfo(item)}>
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tophotel: state.admin.tophotel,
    hotel: state.admin.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopHotel: (id) => dispatch(actions.getTopHotel(id)),
    getHotel: (id) => dispatch(actions.getHotel(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
