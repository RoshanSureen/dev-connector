export default {
  isEmpty: params => {
    return (
      params === undefined ||
      params === null ||
      (typeof params === "object" && Object.keys(params).length === 0) ||
      (typeof params === "string" && params.trim().length === 0)
    );
  }
};
