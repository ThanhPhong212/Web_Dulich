const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",

  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
  FETCH_ALL_USER_FAILED: "FETCH_ALL_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",

  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED: "UPDATE_USER_FAILED",

  FETCH_TIME_SUCCESS: "FETCH_TIME_SUCCESS",
  FETCH_TIME_FAILED: "FETCH_TIME_FAILED",

  FETCH_ADDRESSID_SUCCESS: "FETCH_ADDRESSID_SUCCESS",
  FETCH_ADDRESSID_FAILED: "FETCH_ADDRESSID_FAILED",

  FETCH_PLACE_SUCCESS: "FETCH_PLACE_SUCCESS",
  FETCH_PLACE_FAILED: "FETCH_PLACE_SUCCESS",

  GET_TOUR_A1_SUCCESS: "GET_TOUR_A1_SUCCESS",
  GET_TOUR_A1_FAILED: "GET_TOUR_A1_FAILED",

  CREATE_TOUR_SUCCESS: "CREATE_TOUR_SUCCESS",
  CREATE_TOUR_FAILED: "CREATE_TOUR_FAILED",

  UPDATE_TOUR_SUCCESS: "UPDATE_TOUR_SUCCESS",
  UPDATE_TOUR_FAILED: "UPDATE_TOUR_FAILED",

  DELETE_TOUR_SUCCESS: "DELETE_TOUR_SUCCESS",
  DELETE_TOUR_FAILED: "DELETE_TOUR_FAILED",

  GET_TOUR_ALL_SUCCESS: "GET_TOUR_ALL_SUCCESS",
  GET_TOUR_ALL_FAILED: "GET_TOUR_ALL_FAILED",

  SAVE_INFO_TOUR_SUCCESS: "SAVE_INFO_TOUR_SUCCESS",
  SAVE_INFO_TOUR_FAILED: "SAVE_INFO_TOUR_FAILED",

  GET_INFO_TOUR_SUCCESS: "GET_INFO_TOUR_SUCCESS",
  GET_INFO_TOUR_FAILED: "GET_INFO_TOUR_FAILED",

  GET_TOP_TOUR_A1_SUCCESS: "GET_TOP_TOUR_A1_SUCCESS",
  GET_TOP_TOUR_A1_FAILED: "GET_TOP_TOUR_A1_FAILED",

  GET_TOP_TOUR_NAV_SUCCESS: "GET_TOP_TOUR_NAV_SUCCESS",
  GET_TOP_TOUR_NAV_FAILED: "GET_TOP_TOUR_NAV_FAILED",

  GET_TOP_TOUR_NAV_A2_SUCCESS: "GET_TOP_TOUR_NAV_A2_SUCCESS",
  GET_TOP_TOUR_NAV_A2_FAILED: "GET_TOP_TOUR_NAV_A2_FAILED",

  GET_DOMAIN_SUCCESS: "GET_DOMAIN_SUCCESS",
  GET_DOMAIN_FAILED: "GET_DOMAIN_FAILED",

  GET_DOMAIN_A2_SUCCESS: "GET_DOMAIN_A2_SUCCESS",
  GET_DOMAIN_A2_FAILED: "GET_DOMAIN_A2_FAILED",

  GET_TOUR_DOMAIN_SUCCESS: "GET_TOUR_DOMAIN_SUCCESS",
  GET_TOUR_DOMAIN_FAILED: "GET_TOUR_DOMAIN_FAILED",

  GET_TOUR_PLACE_SUCCESS: "GET_TOUR_PLACE_SUCCESS",
  GET_TOUR_PLACE_FAILED: "GET_TOUR_PLACE_FAILED",

  GET_PLACE_INFO_SUCCESS: "GET_PLACE_INFO_SUCCESS",
  GET_PLACE_INFO_FAILED: "GET_PLACE_INFO_FAILED",

  GET_TOURA2_SUCCESS: "GET_TOURA2_SUCCESS",
  GET_TOURA2_FAILED: "GET_TOURA2_FAILED",

  GET_PLACEA2_SUCCESS: "GET_PLACEA2_SUCCESS",
  GET_PLACEA2_FAILED: "GET_PLACEA2_FAILED",

  GET_TOP_TOUR_A2_SUCCESS: "GET_TOP_TOUR_A2_SUCCESS",
  GET_TOP_TOUR_A2_FAILED: "GET_TOP_TOUR_A2_FAILED",

  BOOKTOUR_SUCCESS: "BOOKTOUR_SUCCESS",
  BOOKTOUR_FAILED: "BOOKTOUR_FAILED",

  BOOKING_SUCCESS: "BOOKING_SUCCESS",
  BOOKING_FAILED: "BOOKING_FAILED",

  BOOKING_SUCCESS2: "BOOKING_SUCCESS2",
  BOOKING_FAILED2: "BOOKING_FAILED2",

  GET_TRAVEL_NEW_SUCCESS: "GET_TRAVEL_NEW_SUCCESS",
  GET_TRAVEL_NEW_FAILED: "GET_TRAVEL_NEW_FAILED",

  CREATE_TRAVEL_NEW_SUCCESS: "CREATE_TRAVEL_NEW_SUCCESS",
  CREATE_TRAVEL_NEW_FAILED: "CREATE_TRAVEL_NEW_FAILED",

  GET_INFO_TRAVEL_NEW_SUCCESS: "GET_INFO_TRAVEL_NEW_SUCCESS",
  GET_INFO_TRAVEL_NEW_FAILED: "GET_INFO_TRAVEL_NEW_FAILED",

  GET_TOP_TRAVEL_NEW_SUCCESS: "GET_TOP_TRAVEL_NEW_SUCCESS",
  GET_TOP_TRAVEL_NEW_FAILED: "GET_TOP_TRAVEL_NEW_FAILED",

  GET_HOTEL_SUCCESS: "GET_HOTEL_SUCCESS",
  GET_HOTEL_FAILED: "GET_HOTEL_FAILED",

  GET_TOP_HOTEL_SUCCESS: "GET_TOP_HOTEL_SUCCESS",
  GET_TOP_HOTEL_FAILED: "GET_TOP_HOTEL_FAILED",

  GET_BOOKING_HOTEL_SUCCESS: "GET_BOOKING_HOTEL_SUCCESS",
  GET_BOOKING_HOTEL_FAILED: "GET_BOOKING_HOTEL_FAILED",
});

export default actionTypes;