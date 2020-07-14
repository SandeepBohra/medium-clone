export default () => {
  return localStorage.getItem("token")
    ? {
        "Content-Type": "application/json;charset=UTF-8",
        authorization: `Token ${localStorage.getItem("token")}`
      }
    : {};
};
