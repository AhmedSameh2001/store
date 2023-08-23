const mongoose = require("mongoose");

const dbConnection = () => {
  //connect with mongo db
   mongoose
   .connect(process.env.URI)
   .then((conn) => {
     console.log(`Database Connected : ${conn.connection.host}`);
  });
  // .catch((err)=>{
  //   console.log(`error database connection ${err}`)
  // })
};

module.exports = dbConnection;