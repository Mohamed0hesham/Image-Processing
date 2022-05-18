"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let imageSpecs = {
  name: "",
  width: 0,
  height: 0,
};
const urlCheck = (req, res, next) => {
  let error = "";
  let queiry = req.query;
  if (!queiry.name) {
    error += "The Name is missing ";
  }
  if (!queiry.width) {
    error += "The width is missing ";
  }
  if (!queiry.height) {
    error += "The height is missing ";
  }
  if (error) {
    res.send(error);
  } else {
    imageSpecs.name = queiry.name;
    imageSpecs.width = queiry.width;
    imageSpecs.height = queiry.height;
    if (!isFinite(imageSpecs.height)) {
      error += "incorrect entry height";
    }
    if (!isFinite(imageSpecs.width)) {
      error += "incorrect entry width";
    }
    if (error) {
      res.send(error);
    } else {
      next();
    }
  }
};
exports.default = urlCheck;
