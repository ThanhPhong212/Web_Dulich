import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  createHotelService,
  getHotelService,
  editHotelService,
  deleteHotelService,
} from "../../../../services/userService";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelArr: "",
      selectedOption: "",

      id: "",
      imgHTML: "",
      imgMark: "",
      imghtlHTML: "",
      imghtlMark: "",
      name: "",
      address: "",
      convenientHTML: "",
      convenientMark: "",
      roomHTML: "",
      roomMark: "",
      overviewHTML: "",
      overviewMark: "",
      phoneNumber: "",
      price: "",
      hide: 1,
    };
  }

  async componentDidMount() {
    this.props.getHotel("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.hotel !== this.props.hotel) {
      let arrTour = this.buildInputSelect(this.props.hotel);
      this.setState({
        hotelArr: arrTour,
      });
    }
  }

  buildInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    let res = await getHotelService(selectedOption.value);
    if (res) {
      this.setState({
        id: res.data.id,
        imgHTML: res.data.imgHTML,
        imgMark: res.data.imgMark,
        imghtlHTML: res.data.imghtlHTML,
        imghtlMark: res.data.imghtlMark,
        name: res.data.name,
        address: res.data.address,
        convenientHTML: res.data.convenientHTML,
        convenientMark: res.data.convenientMark,
        roomHTML: res.data.roomHTML,
        roomMark: res.data.roomMark,
        overviewHTML: res.data.overviewHTML,
        overviewMark: res.data.overviewMark,
        phoneNumber: res.data.phoneNumber,
        price: res.data.price,
        hide: 2,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleAnhDD = ({ html, text }) => {
    this.setState({
      imgHTML: html,
      imgMark: text,
    });
  };

  handleAnhks = ({ html, text }) => {
    this.setState({
      imghtlHTML: html,
      imghtlMark: text,
    });
  };

  handleTiennghi = ({ html, text }) => {
    this.setState({
      convenientHTML: html,
      convenientMark: text,
    });
  };

  handleLoaiphong = ({ html, text }) => {
    this.setState({
      roomHTML: html,
      roomMark: text,
    });
  };
  handleMota = ({ html, text }) => {
    this.setState({
      overviewHTML: html,
      overviewMark: text,
    });
  };

  new = () => {
    this.setState({
      imgHTML: "",
      imgMark: "",
      imghtlHTML: "",
      imghtlMark: "",
      name: "",
      address: "",
      placeId: "",
      domainId: "",
      convenientHTML: "",
      convenientMark: "",
      roomHTML: "",
      roomMark: "",
      overviewHTML: "",
      overviewMark: "",
      phoneNumber: "",
      price: "",
      hide: 1,
    });
  };

  save = async () => {
    if (this.state.name === "") {
      toast.warn("Hãy điền đầy đủ thông tin !");
    } else {
      let res = await createHotelService({
        imgHTML: this.state.imgHTML,
        imgMark: this.state.imgMark,
        imghtlHTML: this.state.imghtlHTML,
        imghtlMark: this.state.imghtlMark,
        name: this.state.name,
        address: this.state.address,
        convenientHTML: this.state.convenientHTML,
        convenientMark: this.state.convenientMark,
        roomHTML: this.state.roomHTML,
        roomMark: this.state.roomMark,
        overviewHTML: this.state.overviewHTML,
        overviewMark: this.state.overviewMark,
        phoneNumber: this.state.phoneNumber,
        price: this.state.price,
      });
      if (res.errCode === 0) {
        window.location.reload();
        toast.success("Lưu thành công!");
      } else {
        toast.warn("Lưu thất bại!");
      }
    }
  };
  update = async () => {
    let res = await editHotelService({
      id: this.state.id,
      imgHTML: this.state.imgHTML,
      imgMark: this.state.imgMark,
      imghtlHTML: this.state.imghtlHTML,
      imghtlMark: this.state.imghtlMark,
      name: this.state.name,
      address: this.state.address,
      convenientHTML: this.state.convenientHTML,
      convenientMark: this.state.convenientMark,
      roomHTML: this.state.roomHTML,
      roomMark: this.state.roomMark,
      overviewHTML: this.state.overviewHTML,
      overviewMark: this.state.overviewMark,
      phoneNumber: this.state.phoneNumber,
      price: this.state.price,
    });
    if (res.errCode === 0) {
      toast.success("Lưu thành công!");
    } else {
      toast.warn("Lưu thất bại!");
    }
  };
  deletec = async () => {
    let res = await deleteHotelService({
      id: this.state.id,
    });
    if (res.errCode === 0) {
      toast.success("Xóa thành công");
      this.new();
      window.location.reload();
    } else {
      toast.warn("Xóa thất bại!");
      console.log(res.errCode);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="title-info-tour mt-5 text-center ">QUẢN LÝ KHÁCH SẠN</div>
          <div className="row my-5">
            {/*hình đại diện khách sạn*/}
            <div className="col-7 mt-5">
              <label>Ảnh đại diện khách sạn:</label>
              <MdEditor
                className="mt-2"
                style={{ height: "340px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleAnhDD}
                value={this.state.imgMark}
              />
            </div>
            {/*thông tin khách sạn*/}
            <div className="col-5 mt-5">
              <div className="col-12">
                <label>Chọn khách sạn để xem thông tin:</label>
                <Select
                  className="col-12 mt-2"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.hotelArr}
                />
                <label className="mt-3">Tên Khách sạn:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
                <label className="mt-3">Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
                <label className="mt-3">Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
                <label className="mt-3">Giá:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.price}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "price");
                  }}
                />
                {/*buton*/}
                <div className="col-12 mt-3">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      this.new();
                    }}
                    hidden={this.state.hide !== 2}
                  >
                    Thêm khách sạn mới
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.save();
                    }}
                    hidden={this.state.hide !== 1}
                  >
                    Lưu khách sạn
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.update();
                    }}
                    hidden={this.state.hide !== 2}
                  >
                    Lưu khách sạn
                  </button>

                  <button
                    className="btn btn-primary mx-2"
                    hidden={this.state.hide !== 2}
                    onClick={() => this.deletec()}
                  >
                    Xóa Khách sạn
                  </button>
                </div>
              </div>
            </div>
            {/*các hình ảnh của khách sạn*/}
            <div className="col-12 mt-4">
              <label>Một số hình ảnh của khách sạn:</label>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleAnhks}
                value={this.state.imghtlMark}
              />
            </div>

            {/*các tiện nghi của khách sạn*/}
            <div className="col-12 mt-4">
              <label>Tiện nghi:</label>
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleTiennghi}
                value={this.state.convenientMark}
              />
            </div>
            {/*các loai phòng của khách sạn*/}
            <div className="col-12 mt-4">
              <label>Các loại phòng:</label>
              <MdEditor
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleLoaiphong}
                value={this.state.roomMark}
              />
            </div>
            {/*Thông tin chung của khách sạn*/}
            <div className="col-12 mt-4">
              <label>Thông tin khách sạn:</label>
              <MdEditor
                style={{ height: "600px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleMota}
                value={this.state.overviewMark}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hotel: state.admin.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotel: (id) => dispatch(actions.getHotel(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
