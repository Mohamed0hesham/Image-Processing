import images from "../../routes/api/images";
import supertest from "supertest";

const request = supertest(images);

describe("test the server end points for responding", () => {
  it("http://localhost:3000//api/images?name=fjord&width=500&height=300 should return status 200", async () => {
    const response = await request.get(
      "/api/images?name=fjord&width=500&height=500"
    );
    expect(response.status).toBe(200);
  });
});
