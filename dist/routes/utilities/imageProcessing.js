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
const sharp_1 = __importDefault(require("sharp"));
//the image resizing function the takes in the image specs object
//and resizing the image by using 3rd party module "Sharp"
function resizeImage(imageSpecs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)(`./images/${imageSpecs.name}.jpg`)
                .resize({
                width: parseInt(imageSpecs.width),
                height: parseInt(imageSpecs.height),
            })
                .toFile(`./thumbImages/${imageSpecs.name}-resized.jpg`);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.default = resizeImage;
