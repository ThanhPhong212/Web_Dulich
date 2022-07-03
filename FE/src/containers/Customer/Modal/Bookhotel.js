import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import DatePicker from "react-flatpickr";
import moment from "moment";
import { dateFormat } from "../../../utils";
import { bookinghotelService } from "../../../services/userService";
class Bookhotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      gender: "M",
      dateend: new Date(),
      datestart: new Date(),
      yeucau: "",
      genderArr: "",
      hide: 1,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let arrgender = this.props.gender;
      this.setState({
        genderArr: arrgender,
      });
    }
  }
  hotelinfo = (item) => {
    // this.props.history.push(``);
  };

  IsInvalidEmail = (the_email) => {
    var at = the_email.indexOf("@");
    var dot = the_email.lastIndexOf(".");
    var space = the_email.indexOf(" ");
    if (
      at !== -1 && //có ký tự @
      at !== 0 && //ký tự @ không nằm ở vị trí đầu
      dot !== -1 && //có ký tự .
      dot > at + 1 &&
      dot < the_email.length - 1 && //phải có ký tự nằm giữa @ và . cuối cùng
      space === -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  is_phonenumber = (phonenumber) => {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phonenumber.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  };

  handelBookhotel = async () => {
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.phonenumber === "" ||
      this.state.yeucau === ""
    ) {
      toast.info("Hãy nhập đầy đủ thông tin!");
      return;
    }
    let checkEmail = this.IsInvalidEmail(this.state.email);
    let checkPhone = this.is_phonenumber(this.state.phoneNumber);
    if (checkEmail === false) {
      toast.info("Email không đúng định dạng");
      return;
    }
    if (checkPhone === false) {
      toast.info("Số điện thoại không đúng định dạng");
      return;
    }
    const startdate = this.state.datestart;
    const enddate = this.state.dateend;
    let datestart = moment(startdate.toString()).format(dateFormat.SEND_TO_SERVER);
    let dateend = moment(enddate.toString()).format(dateFormat.SEND_TO_SERVER);

    let date = dateend.slice(0, 2) - datestart.slice(0, 2);
    let month = dateend.slice(3, 5) - datestart.slice(3, 5);
    if (month === 0) {
      if (date < 0) {
        toast.warn("Ngày trả phòng phải lớn hơn ngày đặt phòng!");
      } else {
        let { infoBookhotel } = this.props;
        let res = await bookinghotelService({
          hotelId: infoBookhotel.id,
          name: this.state.name,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          gender: this.state.gender,
          datestart: datestart,
          dateend: dateend,
          yeucau: this.state.yeucau,
        });

        if (res.errCode === 0) {
          toast.success("Đăng ký thành công!");
          this.setState({
            hide: 0,
          });
        } else {
          toast.error("Đăng ký không thành công!");
        }
      }
    } else {
      let { infoBookhotel } = this.props;
      let res = await bookinghotelService({
        hotelId: infoBookhotel.id,
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        datestart: this.state.datestart,
        dateend: this.state.dateend,
        yeucau: this.state.yeucau,
      });

      if (res.errCode === 0) {
        toast.success("Đăng ký thành công!");
        this.setState({
          hide: 0,
        });
      } else {
        toast.error("Đăng ký không thành công!");
      }
    }
  };

  handleOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let { isOpenModal, isCloseModal } = this.props;
    let { genderArr, gender } = this.state;

    return (
      <Modal isOpen={isOpenModal} className={"booking_container"} size="lg" centered>
        <div className="booking_content">
          <div className="booking_header">
            <div className="title_booking">Đặt khách sạn</div>
            <div className="closeModal" onClick={isCloseModal}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="booking_body container"></div>
          <div className="support row">
            <div className="col-8 mt-3">
              <label>Họ và tên:</label>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "name");
                }}
                value={this.state.name}
              />
            </div>
            <div className="col-8 mt-3">
              <label>Email:</label>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="col-8 mt-3">
              <label>Địa chỉ:</label>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="col-6 mt-3">
              <label>Số điện thoại:</label>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="col-2 mt-3">
              <label>Giới tính:</label>
              <select
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "gender");
                }}
                value={gender}
              >
                {genderArr &&
                  genderArr.length > 0 &&
                  genderArr.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-8 mt-3">
              <label>Ngày nhận phòng:</label>
              <DatePicker
                className="mt-2"
                onChange={(date) => {
                  this.setState({
                    datestart: date,
                  });
                }}
                value={this.state.datestart}
                options={{
                  minDate: "today",
                  altFormat: "d/m/Y",
                  altInput: true,
                  locale: "vn",
                }}
              />
            </div>
            <div className="col-8 mt-3">
              <label>Ngày trả phòng:</label>
              <DatePicker
                className="mt-2"
                onChange={(date) => {
                  this.setState({
                    dateend: date,
                  });
                }}
                value={this.state.dateend}
                options={{
                  minDate: "today",
                  altFormat: "d/m/Y",
                  altInput: true,
                  locale: "vn",
                }}
              />
            </div>
            <div className="col-8 mt-3">
              <label>Yêu cầu phòng:</label>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangInput(event, "yeucau");
                }}
                value={this.state.yeucau}
              />
            </div>
          </div>
          <div className="thanhcong text-center" hidden={this.state.hide !== 0}>
            <p>
              <i>Hệ thống đã xác nhận đặt phòng thành công.</i>
              <i>Chúng tôi sẽ liên hệ quý khách trong vòng 24h</i>
              <i>Xin chân thành cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</i>
            </p>
          </div>
          <div className="booking_footer">
            <button className="btn btn-info" onClick={() => this.handelBookhotel()}>
              đăng ký
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gender: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookhotel);
