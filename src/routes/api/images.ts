import express from "express";
import path from "path";
import { promises as fsPromises } from "fs";
import resizeImage from "../utilities/imageProcessing";
import urlValidation from "../utilities/urlValidation";
import cache from "memory-cache";
import _ from "lodash";

//creating images router
const images = express.Router();

//getting the absolute path of the thumbImages directroy
const thumbImagePath = path.resolve(__dirname, "../../../thumbImages");

//definging an object that will hold the query entered in request the url
const imageSpecs = {
  name: "", //name of the image
  width: "", //width of the image
  height: "", //height of the image
};

//images main route that contains a middleWare to validate the query of the url
images.get("/", urlValidation, (req, res) => {
  //a variable that holds the request query
  const queiry = req.query;

  //a variable that hold the chached request and if not found
  //it will be set to an empty object to avoid being null
  const cachedQuery = cache.get("req") || {};

  //checking the request for repetition
  if (_.isEqual(cachedQuery, queiry)) {
    console.log("same request");
    //sends the existing thumb image
    res.sendFile(`${thumbImagePath}/${imageSpecs.name}-resized.jpg`);
  } else {
    //setting the new query values to the imageSpecs object
    imageSpecs.name = queiry.name as string;
    imageSpecs.width = queiry.width as string;
    imageSpecs.height = queiry.height as string;

    //accessing the requested image by name to check whether it exists or not
    fsPromises
      .access(`./images/${imageSpecs.name}.jpg`)
      .then(async () => {
        console.log("Image exists, resizing in progress...");

        //adding the request to the chache for not being processed again
        cache.put("req", req.query);

        //an async function that awaits the image to be processed
        //by calling the image processing function
        await resizeImage(imageSpecs);
        res.sendFile(`${thumbImagePath}/${imageSpecs.name}-resized.jpg`);
      })
      .catch(() => {
        res.send("this image does not exist!");
      });
  }
});

export default images;
