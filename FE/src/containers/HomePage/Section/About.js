import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
class About extends Component {
  render() {
    return (
      <div className="section_about">
        <div className="about_content">
          <div className="time">
            <div className="item">Thời gian làm việc</div>
            <p>Thứ 2-6: 8h30 - 17h30</p>
            <p>Thứ 7: 8h00 - 12h00</p>
            <p>CN và các ngày lễ: Nghỉ</p>
          </div>
          <div className="tour">
            <div className="item">Du lịch</div>
            <p>Du lịch trong nước</p>
            <p>Du lịch nước ngoài</p>
          </div>
          <div className="dichvu">
            <div className="item">Dịch vụ</div>
            <p>Khách sạn</p>
          </div>
          <div className="hotro">
            <div className="item">Hỗ trợ</div>
            <p>Câu hỏi thường gặp</p>
            <p>Chính sách bảo hiểm</p>
            <p>Thông tin liên hệ</p>
          </div>
          <div className="gt">
            <div className="item">Smile travel</div>
            <p>Giới thiệu SmileTravel</p>
            <p>Hình ảnh chuyến đi</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
