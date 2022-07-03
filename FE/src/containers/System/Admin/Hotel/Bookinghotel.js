import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
// import "./Booking.scss";

class Bookimghotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookinghotel: "",
      email: "",
      name: "",
      gender: "",
      phoneNumber: "",
      address: "",
      hotelname: "",
      datestart: "",
      dateend: "",
      yeucau: "",
      status: "",
    };
  }

  async componentDidMount() {
    this.props.getBookingHotel("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.bookinghotel !== this.props.bookinghotel) {
      this.setState({
        bookinghotel: this.props.bookinghotel,
      });
    }
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEdit = (item) => {
    this.setState({
      email: item.customerHt.email,
      name: item.customerHt.name,
      gender: item.customerHt.genderData.value,
      phoneNumber: item.customerHt.phoneNumber,
      address: item.customerHt.address,
      hotelname: item.hotelData.name,
      datestart: item.datestart,
      dateend: item.dateend,
      yeucau: item.yeucau,
      status: item.statusId,
    });
  };
  render() {
    let { bookinghotel } = this.state;
    return (
      <React.Fragment>
        <div className="Bookimghotel_container container">
          <div className="Bookimghotel_content">
            <div className="title">Quản lý đặt khách sạn</div>
            <div className="top row">
              <div className="col-2 mt-5">
                Họ và tên:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
              </div>
              <div className="col-1 mt-5">
                Giới tính:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.gender}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                />
              </div>
              <div className="col-3 mt-5">
                Địa chỉ:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-3 mt-5">
                Email:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                />
              </div>

              <div className="col-3 mt-5">
                Số điện thoại:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-4 mt-5">
                Tên khách sạn:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.hotelname}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "hotelname");
                  }}
                />
              </div>
              <div className="col-2 mt-5">
                Ngày nhận phòng:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.datestart}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "datestart");
                  }}
                />
              </div>
              <div className="col-2 mt-5">
                Ngày trả phòng:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.dateend}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "dateend");
                  }}
                />
              </div>
              <div className="col-3 mt-5">
                Yêu cầu:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.yeucau}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "yeucau");
                  }}
                />
              </div>
              <div className="col-1 mt-5">
                <label>Trạng thái:</label>
                <select
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "status");
                  }}
                  value={this.state.status}
                  className=" form-control mt-2"
                >
                  <option value={"ALL"}>Tất cả</option>
                  <option value={"S1"}>Đang chờ</option>
                  <option value={"S2"}>Chờ duyệt</option>
                  <option value={"S3"}>Đã duyệt</option>
                  <option value={"S4"}>Đã hủy</option>
                  <option value={"S5"}>Đã xong</option>
                </select>
              </div>
            </div>
            <div className="bottom">
              <table id="customers" className="mt-4 mb-4">
                <tr>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Tên Khách sạn</th>
                  <th>Ngày nhận phòng</th>
                  <th>Ngày trả phòng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
                {bookinghotel &&
                  bookinghotel.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => this.handleEdit(item)}>
                        <td>{item.customerHt.name}</td>
                        <td>{item.customerHt.genderData.value}</td>
                        <td>{item.customerHt.phoneNumber}</td>
                        <td>{item.customerHt.email}</td>
                        <td>{item.customerHt.address}</td>
                        <td>{item.hotelData.name}</td>
                        <td>{item.datestart}</td>
                        <td>{item.dateend}</td>
                        <td>{item.statusHt.value}</td>

                        <td>
                          {item.statusId === "S2" ? (
                            <button className="duyet" onClick={() => this.handleEditBooking(item)}>
                              Duyệt
                            </button>
                          ) : item.statusId === "S3" ? (
                            <button
                              className="duyet"
                              onClick={() => this.handleDeleteBooking(item)}
                            >
                              Hủy
                            </button>
                          ) : item.statusId === "S4" ? (
                            <button className="duyet" onClick={() => this.handleDeleteBk(item)}>
                              Xóa
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookinghotel: state.admin.bookinghotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookingHotel: (id) => dispatch(actions.getBookingHotel(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookimghotel);
