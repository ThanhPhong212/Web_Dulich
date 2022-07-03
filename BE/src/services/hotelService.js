import db from "../models";

let checkHotel = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let travelnew = await db.Hotel.findOne({
        where: { name: name },
      });
      if (travelnew) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createHotelService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkHotel(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
        });
      } else {
        await db.Hotel.create({
          imgHTML: data.imgHTML,
          imgMark: data.imgMark,
          imghtlHTML: data.imghtlHTML,
          imghtlMark: data.imghtlMark,
          name: data.name,
          address: data.address,
          convenientHTML: data.convenientHTML,
          convenientMark: data.convenientMark,
          roomHTML: data.roomHTML,
          roomMark: data.roomMark,
          overviewHTML: data.overviewHTML,
          overviewMark: data.overviewMark,
          phoneNumber: data.phoneNumber,
          price: data.price,
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editHotelService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: " Missing  required parameters!",
        });
      }
      let hotel = await db.Hotel.findOne({
        where: { id: data.id },
      });
      if (hotel) {
        hotel.imgHTML = data.imgHTML;
        hotel.imgMark = data.imgMark;
        hotel.imghtlHTML = data.imghtlHTML;
        hotel.imghtlMark = data.imghtlMark;
        hotel.name = data.name;
        hotel.address = data.addres;
        hotel.placeId = data.placeId;
        hotel.domainId = data.domainId;
        hotel.convenientHTML = data.convenientHTML;
        hotel.convenientMark = data.convenientMark;
        hotel.roomHTML = data.roomHTML;
        hotel.roomMark = data.roomMark;
        hotel.overviewHTML = data.overviewHTML;
        hotel.overviewMark = data.overviewMark;
        hotel.phoneNumber = data.phoneNumber;
        hotel.price = data.price;
        await hotel.save();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Travelnew not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteHotelService = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        errMessage: " Missing required parameters!",
      });
    }
    try {
      let hotel = await db.Hotel.findOne({
        where: { id: id.id },
      });
      if (hotel) {
        await hotel.destroy();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Travelnew isn't exist!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getHotelService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotel = "";
      if (id === "ALL") {
        hotel = await db.Hotel.findAll({});
      }
      if (id && id !== "ALL") {
        hotel = await db.Hotel.findOne({
          where: { id: id },
        });
      }
      resolve(hotel);
    } catch (e) {
      reject(e);
    }
  });
};
let getTopHotelService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotel = "";
      if (id === "ALL") {
        hotel = await db.Hotel.findAll({
          limit: 8,
        });
      }
      resolve(hotel);
    } catch (e) {
      reject(e);
    }
  });
};

let bookhotelService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.hotelId) {
        resolve({
          errCode: 1,
          message: "mising parameter",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            roleId: "R3",
            gender: data.gender,
          },
          raw: true,
        });
        if (user && user[0]) {
          let Bookhotel = await db.Bookhotel.findOne({
            where: {
              customerId: user[0].id,
              hotelId: data.hotelId,
            },
          });
          if (Bookhotel) {
            if (Bookhotel.statusId === "S3" || Bookhotel.statusId === "S4") {
              await db.Bookhotel.create({
                customerId: user[0].id,
                hotelId: data.hotelId,
                statusId: "S2",
                datestart: data.datestart,
                dateend: data.dateend,
                yeucau: data.yeucau,
              });
            }
            if (Bookhotel.statusId === "S2") {
              resolve({
                errCode: 2,
              });
            }
          } else {
            await db.Bookhotel.create({
              customerId: user[0].id,
              hotelId: data.hotelId,
              statusId: "S2",
              datestart: data.datestart,
              dateend: data.dateend,
              yeucau: data.yeucau,
            });
          }
        }
      }
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoBookHoteltopur = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter! ",
        });
      } else {
        if (id === "ALL") {
          let data = await db.Bookhotel.findAll({
            include: [
              {
                model: db.Hotel,
                as: "hotelData",
                attributes: ["name"],
              },
              {
                model: db.Allcode,
                as: "statusHt",
                attributes: ["value"],
              },
              {
                model: db.User,
                as: "customerHt",
                attributes: ["name", "address", "phoneNumber", "email", "gender"],
                include: [
                  {
                    model: db.Allcode,
                    as: "genderData",
                    attributes: ["value"],
                  },
                ],
              },
            ],
            nest: true,
            raw: true,
          });
          if (!data) data = {};
          resolve({
            errCode: 0,
            data: data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createHotelService: createHotelService,
  editHotelService: editHotelService,
  deleteHotelService: deleteHotelService,
  getHotelService: getHotelService,
  getTopHotelService: getTopHotelService,
  bookhotelService: bookhotelService,
  getInfoBookHoteltopur: getInfoBookHoteltopur,
};
