
  1 db.createUser(
  2 {
  3   user : "admin",
  4   pwd :"admin",
  5   roles: [
  6   {
  7     role : "readWrite",
  8     db : "database"
  9     }
 10     ]
 11   }
 12   )
