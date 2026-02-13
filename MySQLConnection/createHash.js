const bcrypt = require("bcryptjs");

bcrypt.hash("lisa.a@123", 10).then((hash) => {
  console.log(hash);
});
