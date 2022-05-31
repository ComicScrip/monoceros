import React from "react";

export const email = "monoceros.wcs@gmail.com";
export const password = "Wcs2022!";

export const tokenToRefresh = {
  refresh:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1Mzk5MzE3NiwianRpIjoiYjk1YTg1YmUwNDY0NDMzYTgzNTZjNDgyYzBlNWJmMzAiLCJ1c2VyX2lkIjoxMDB9.P8dNlhD9OwF2cpb0m0KCXsazln5X3XaY1id23XQdFmo",
  access:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzOTI2MjA1LCJqdGkiOiIzMDc5YTQ4ZWNjMjk0MDA0OTZmMjMyMzBlZmMyN2EwOSIsInVzZXJfaWQiOjEwMH0.o724MZcuWU3dcpkC9beYSHeFoxDi68LlPvw5uB-dYMM",
};

export const API_BASE_URL = "https://devbackend.monoceros-sas.com/api";

const tokenContext = React.createContext();

export default tokenContext;
