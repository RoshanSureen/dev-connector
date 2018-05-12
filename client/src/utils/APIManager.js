import axios from "axios";
import Promise from "bluebird";

export default {
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(response => {
          if (response.data.confirmation !== "success") {
            reject(response);
            return;
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get: url => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.data.confirmation !== "success") {
            reject(response);
            return;
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete: url => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then(response => {
          if (response.data.confirmation !== "success") {
            reject(response);
            return;
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
