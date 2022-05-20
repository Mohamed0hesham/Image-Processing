"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
const urlValidation_1 = __importDefault(require("../utilities/urlValidation"));
//creating images router
const images = express_1.default.Router();
//getting the absolute path of the thumbImages directroy
const thumbImagePath = path_1.default.resolve(__dirname, '../../../thumbImages');
//definging an object that will hold the query entered in request the url
const imageSpecs = {
    name: '',
    width: '',
    height: '', //height of the image
};
//images main route that contains a middleWare to validate the query of the url
images.get('/', urlValidation_1.default, (req, res) => {
    //a variable that holds the request query
    const queiry = req.query;
    //a variable that hold the chached request and if not found
    //it will be set to an empty object to avoid being null
    // const cachedQuery = cache.get('req') || {}
    fs_1.promises
        .access(`./thumbImages/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`)
        .then(() => {
        res.sendFile(`${thumbImagePath}/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`);
    })
        .catch(() => {
        //setting the new query values to the imageSpecs object
        imageSpecs.name = queiry.name;
        imageSpecs.width = queiry.width;
        imageSpecs.height = queiry.height;
        //accessing the requested image by name to check whether it exists or not
        fs_1.promises
            .access(`./images/${imageSpecs.name}.jpg`)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Image exists, resizing in progress...');
            //adding the request to the chache for not being processed again
            // cache.put('req', req.query)
            //an async function that awaits the image to be processed
            //by calling the image processing function
            yield (0, imageProcessing_1.default)(imageSpecs);
            res.sendFile(`${thumbImagePath}/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`);
        }))
            .catch(() => {
            res.send('this image does not exist!');
        });
    });
    //checking the request for repetition
    // if (_.isEqual(cachedQuery, queiry)) {
    //     console.log('same request')
    //     //sends the existing thumb image
    //     res.sendFile(`${thumbImagePath}/${imageSpecs.name}-resized.jpg`)
    // } else {
    // }
});
exports.default = images;
