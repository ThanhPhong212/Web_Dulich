import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HeaderPage/HomeHeader";
import Commentt from "../../Customer/fb/Comment";
import LikeAndShare from "../../Customer/fb/LikeAndShare";
import Footer from "../../HomePage/Footer/Footer";
import Bookhotel from "../Modal/Bookhotel";

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tophotel: "",
      infohotel: "",
      idmas: "",
      isOpenModalBooking: false,
      dataBooking: "",
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      await this.props.getHotel(id);
      this.setState({
        idmas: id,
      });
    }
    this.props.getTopHotel("ALL");
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tophotel !== this.props.tophotel) {
      this.setState({
        tophotel: this.props.tophotel,
      });
    }

    let idmas = this.props.match && this.props.match.params && this.props.match.params.id;
    if (this.state.idmas !== idmas) {
      let id = idmas;
      await this.props.getHotel(id);
      this.setState({
        idmas: id,
      });
    }

    if (prevProps.hotel !== this.props.hotel) {
      this.setState({
        infohotel: this.props.hotel,
      });
    }
  }
  hotelinfo = (item) => {
    this.props.history.push(`/thong-tin-khach-san/${item.id}`);
  };

  handleBookTour = () => {
    this.setState({
      isOpenModalBooking: true,
      dataBooking: this.state.infohotel,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let dataBooking = this.state.dataBooking;
    let openModal = this.state.isOpenModalBooking;
    let { tophotel, infohotel } = this.state;
    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://chat-bot-smile-travel.herokuapp.com/"
        : window.location.href;
    return (
      <>
        <HomeHeader />
        <div className="infohotel_container">
          <div className="infohotel_content">
            {infohotel && infohotel.name && infohotel && (
              <div className="left">
                <div className="name">{infohotel.name}</div>
                <div className="address">Địa chỉ: {infohotel.address}</div>
                <div className="like">
                  <LikeAndShare dataHref={currentURL} />
                </div>
                <div
                  className="img"
                  dangerouslySetInnerHTML={{ __html: infohotel.imghtlHTML }}
                ></div>
                <div className="title text-center">Tiện Nghi {infohotel.name}</div>
                <div
                  className="convenien"
                  dangerouslySetInnerHTML={{ __html: infohotel.convenientHTML }}
                ></div>
                <div className="pricehotel text-center">
                  <div className="price">Giá: {infohotel.price}</div>
                  <div className="bookhotel">
                    <div className="btn" onClick={() => this.handleBookTour()}>
                      Đặt phòng nhanh
                    </div>
                  </div>
                  <div className="phone"> Số điện thoại: {infohotel.phoneNumber}</div>
                </div>
                <div className="title text-center">Các loại phòng tại {infohotel.name}</div>
                <div
                  className="room"
                  dangerouslySetInnerHTML={{ __html: infohotel.roomHTML }}
                ></div>
                <div className="title text-center">Tổng quan {infohotel.name}</div>
                <div
                  className="overview"
                  dangerouslySetInnerHTML={{ __html: infohotel.overviewHTML }}
                ></div>
              </div>
            )}

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
          <div className="cmt">
            <Commentt dataHref={currentURL} width={"100%"} />
          </div>
        </div>
        <Bookhotel
          isOpenModal={openModal}
          isCloseModal={this.closeModal}
          infoBookhotel={dataBooking}
        />
        <Footer />
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
