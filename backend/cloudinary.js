import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dfaqpyjpr",
  api_key: "822847586559999",
  api_secret: "CvEfozxSKnUoJf0mEOoOZySZ99k", // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded successfully", response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
export default uploadOnCloudinary;