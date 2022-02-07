const { format } = require("date-fns");

const formatDate = (date) => {
  const dateObject = new Date(date);
  console.log("DateObject", dateObject);
  return format(dateObject, "EEEE MMMM do, yyyy @ hh:mm:ss aaaa");
};

module.exports = formatDate;
