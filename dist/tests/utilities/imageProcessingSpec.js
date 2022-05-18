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
const imageProcessing_1 = __importDefault(require("../../routes/utilities/imageProcessing"));
describe("test the resizing function", () => {
    it("resizing function should return true if all the entries are valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const resizeImageReturn = yield (0, imageProcessing_1.default)({
            name: "fjord",
            width: "500",
            height: "500",
        });
        expect(resizeImageReturn).toBe(true);
    }));
    it("resizing function should return true if all the entries are valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const resizeImageReturn = yield (0, imageProcessing_1.default)({
            name: "anyName",
            width: "500",
            height: "500",
        });
        expect(resizeImageReturn).toBe(false);
    }));
});
