import sharp from "sharp";

export const resizeImage = async (from, to, size) => {
  try {
    await sharp(from)
      .resize({ width: 360, withoutEnlargement: true })
      .toFile(to);
  } catch (error) {
    console.log(error);
  }
};
