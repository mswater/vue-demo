function chart(method) {
  let res = null;
  switch (method) {
    case "get":
      res = [50, 40, 36, 10, 10, 20];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
