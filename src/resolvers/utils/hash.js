const bcrypt = require('bcrypt');

const encrypt = async (data) => bcrypt.hash(String(data), 10);
const compare = async (element1, element2) => bcrypt.compare(element1, element2);

module.exports = {
  encrypt,
  compare,
};
