import moment from "moment";

export const getNewLabelStatus = (createdTime) => {
  var a = moment(createdTime);
  var b = moment();
  let difference = b.diff(a);
  // console.log("difference", difference);
  return difference < 1800000;
};
