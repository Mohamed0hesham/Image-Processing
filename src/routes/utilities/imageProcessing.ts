import sharp from "sharp";

//the image resizing function the takes in the image specs object
//and resizing the image by using 3rd party module "Sharp"
async function resizeImage(imageSpecs: {
  name: string;
  width: string;
  height: string;
}): Promise<boolean> {
  try {
    await sharp(`./images/${imageSpecs.name}.jpg`)
      .resize({
        width: parseInt(imageSpecs.width),
        height: parseInt(imageSpecs.height),
      })
      .toFile(`./thumbImages/${imageSpecs.name}-resized.jpg`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default resizeImage;
