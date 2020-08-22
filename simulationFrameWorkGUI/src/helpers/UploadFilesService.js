import axios from "../helpers/api";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
