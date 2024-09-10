import axios from "axios";

export const uploadFileToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  try {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    await axios.put(presignedUrl, file, options);
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file to S3:", error);
  }
};

const handleFileUpload = async (file: File, filename: string) => {
  try {
    const { data } = await axios.get("/api/get-upload-url", {
      params: { key: filename, contentType: file.type },
    });

    const presignedUrl = data.url;

    await uploadFileToS3(presignedUrl, file);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
