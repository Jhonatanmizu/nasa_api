const axios = require("axios");

class AxiosService {
  axiosInstance;
  constructor(baseURL = "", headers) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: headers
        ? headers
        : {
            "Content-Type": "application/json",
          },
    });
  }
  async handleGet(url) {
    this.axiosInstance.get(url);
  }

  async handlePost(url, body) {
    return await this.axiosInstance.post(url, body);
  }

  async handlePut(url, body) {
    return await this.axiosInstance.put(url, body);
  }

  async handleDelete(url) {
    return await this.axiosInstance.delete(url);
  }

  async handlePatch(url, body) {
    return await this.axiosInstance.patch(url, body);
  }
}

module.exports = AxiosService;
