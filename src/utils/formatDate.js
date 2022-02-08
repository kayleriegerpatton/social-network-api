const { format } = require("date-fns");

const formatDate = (date) => {
  const dateObject = new Date(date);
  return format(dateObject, "EEEE MMMM do, yyyy @ hh:mm:ss aaaa");
};

module.exports = formatDate;
