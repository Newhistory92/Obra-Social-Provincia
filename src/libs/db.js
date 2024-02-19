import mysql from "serverless-mysql"

const {
    DB_USER, DB_PASSWORD
  } = process.env;

export const conn = mysql({
    config:{
    host:"localhost",
    user:"root",
    password:"4285041River/",
    port:3306,
    database:"Osp_db"

}
})
