import React from "react";

export const email = "monoceros.wcs@gmail.com";
export const password = "Wcs2022!";

export let tokensTest = {
  refresh:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1NDE2MDgwNCwianRpIjoiNWFmYjM2OGM5NDgyNDY4NmEyYzQ3YzFiZTUwYTllNmEiLCJ1c2VyX2lkIjoxMDB9.nqauCoZGMXfMfPXxGzYVGA4ErL4Sp6v21INUI_douGU",
  access:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MDg4ODA0LCJqdGkiOiI0MGZjOTZhNjllYzQ0N2Y2OGJlMDA3OTVjZGM2NjdhZiIsInVzZXJfaWQiOjEwMH0.aIa4en_vXgSVYIbtn8g1NIDWtNSLzkSCDV-aQ-JsI7w",
};
export const API_BASE_URL = "https://devbackend.monoceros-sas.com/api";

const tokenContext = React.createContext();

export default tokenContext;
