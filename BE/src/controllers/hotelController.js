import hotelService from "../services/hotelService";

let createHotel = async (req, res) => {
  let createHotel = await hotelService.createHotelService(req.body);
  return res.status(200).json(createHotel);
};

let editHotel = async (req, res) => {
  let editHotel = await hotelService.editHotelService(req.body);
  return res.status(200).json(editHotel);
};

let deleteHotel = async (req, res) => {
  let deleteHotel = await hotelService.deleteHotelService(req.body.id);
  return res.status(200).json(deleteHotel);
};

let getHotel = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      data: [],
    });
  }
  let data = await hotelService.getHotelService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    data,
  });
};

let getTopHotel = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      data: [],
    });
  }
  let data = await hotelService.getTopHotelService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    data,
  });
};
let bookingHotel = async (req, res) => {
  let bookhotel = await hotelService.bookhotelService(req.body);
  return res.status(200).json(bookhotel);
};
let getBookingHotel = async (req, res) => {
  try {
    let info = await hotelService.getInfoBookHoteltopur(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  createHotel: createHotel,
  editHotel: editHotel,
  deleteHotel: deleteHotel,
  getHotel: getHotel,
  getTopHotel: getTopHotel,
  bookingHotel: bookingHotel,
  getBookingHotel: getBookingHotel,
};
