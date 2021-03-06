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
      toast.warn("H??y ??i???n ?????y ????? th??ng tin !");
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
        toast.success("L??u th??nh c??ng!");
      } else {
        toast.warn("L??u th???t b???i!");
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
      toast.success("L??u th??nh c??ng!");
    } else {
      toast.warn("L??u th???t b???i!");
    }
  };
  deletec = async () => {
    let res = await deleteHotelService({
      id: this.state.id,
    });
    if (res.errCode === 0) {
      toast.success("X??a th??nh c??ng");
      this.new();
      window.location.reload();
    } else {
      toast.warn("X??a th???t b???i!");
      console.log(res.errCode);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="title-info-tour mt-5 text-center ">QU???N L?? KH??CH S???N</div>
          <div className="row my-5">
            {/*h??nh ?????i di???n kh??ch s???n*/}
            <div className="col-7 mt-5">
              <label>???nh ?????i di???n kh??ch s???n:</label>
              <MdEditor
                className="mt-2"
                style={{ height: "340px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleAnhDD}
                value={this.state.imgMark}
              />
            </div>
            {/*th??ng tin kh??ch s???n*/}
            <div className="col-5 mt-5">
              <div className="col-12">
                <label>Ch???n kh??ch s???n ????? xem th??ng tin:</label>
                <Select
                  className="col-12 mt-2"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.hotelArr}
                />
                <label className="mt-3">T??n Kh??ch s???n:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
                <label className="mt-3">?????a ch???:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
                <label className="mt-3">S??? ??i???n tho???i:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
                <label className="mt-3">Gi??:</label>
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
                    Th??m kh??ch s???n m???i
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.save();
                    }}
                    hidden={this.state.hide !== 1}
                  >
                    L??u kh??ch s???n
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.update();
                    }}
                    hidden={this.state.hide !== 2}
                  >
                    L??u kh??ch s???n
                  </button>

                  <button
                    className="btn btn-primary mx-2"
                    hidden={this.state.hide !== 2}
                    onClick={() => this.deletec()}
                  >
                    X??a Kh??ch s???n
                  </button>
                </div>
              </div>
            </div>
            {/*c??c h??nh ???nh c???a kh??ch s???n*/}
            <div className="col-12 mt-4">
              <label>M???t s??? h??nh ???nh c???a kh??ch s???n:</label>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleAnhks}
                value={this.state.imghtlMark}
              />
            </div>

            {/*c??c ti???n nghi c???a kh??ch s???n*/}
            <div className="col-12 mt-4">
              <label>Ti???n nghi:</label>
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleTiennghi}
                value={this.state.convenientMark}
              />
            </div>
            {/*c??c loai ph??ng c???a kh??ch s???n*/}
            <div className="col-12 mt-4">
              <label>C??c lo???i ph??ng:</label>
              <MdEditor
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleLoaiphong}
                value={this.state.roomMark}
              />
            </div>
            {/*Th??ng tin chung c???a kh??ch s???n*/}
            <div className="col-12 mt-4">
              <label>Th??ng tin kh??ch s???n:</label>
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
