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
const images_1 = __importDefault(require("../../routes/api/images"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(images_1.default);
describe("test the server end points for responding", () => {
    it("http://localhost:3000//api/images?name=fjord&width=500&height=300 should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?name=fjord&width=500&height=500");
        expect(response.status).toBe(200);
    }));
});
