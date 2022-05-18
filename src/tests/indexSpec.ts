import app from "../index";
import supertest from "supertest";

const request = supertest(app);

describe("test the server end points for responding", () => {
  it("/api should return status 200", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
});