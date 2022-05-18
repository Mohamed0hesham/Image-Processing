import express from "express";

//function that is used as a middleWare for validating the request url query
//it only calls the next function when the query url is valid
const urlCheck = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  let error = "";
  const queiry = req.query;

  //this part checks for the existence of the three required query params
  if (!queiry.name) {
    error += "The Name is missing "
  }
  if (!queiry.width) {
    error += "The width is missing ";
  }
  if (!queiry.height) {
    error += "The height is missing ";
  }

  //sends the error of existed
  if (error) {
    res.send(error);
  }
  //this else checks on the values of the query params to be valid
  else {
    //validating the height value to be a positive number
    if (!isFinite(queiry.height as unknown as number)) {
      error += "incorrect entry height ";
    }
    //validating the width value to be a positive number
    if (!isFinite(queiry.width as unknown as number)) {
      error += "incorrect entry width";
    }
    //sends the error of existed
    if (error) {
      res.send(error);
    }
    //moving on to end this middleWare
    else {
      next();
    }
  }
};

export default urlCheck;
