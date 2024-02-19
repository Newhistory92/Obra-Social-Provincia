import { createConnection } from 'mysql';
var connection = createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '4285041River/',
  database : 'osp_db'
});
 
connection.connect();
console.log("conectado a la base de datos")
connection.on("err",(err:any) => {
  if (err){
    console.log(err);
    connection.end()
  }
})
export const database= connection;