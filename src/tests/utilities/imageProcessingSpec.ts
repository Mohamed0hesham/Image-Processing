import resizeImage from "../../routes/utilities/imageProcessing";

describe("test the resizing function", () => {
  it("resizing function should return true if all the entries are valid", async () => {
    const resizeImageReturn = await resizeImage({
      name: "fjord",
      width: "500",
      height: "500",
    });
    expect(resizeImageReturn).toBe(true);
  });
  it("resizing function should return true if all the entries are valid", async () => {
    const resizeImageReturn = await resizeImage({
      name: "anyName",
      width: "500",
      height: "500",
    });
    expect(resizeImageReturn).toBe(false);
  });
});
