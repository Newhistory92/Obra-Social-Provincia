import mysql from "serverless-mysql"



export const conn = mysql({
    config:{
    host:"localhost",
    user:"root",
    password:"4285041River/",
    port:3306,
    database:"osp_db"

}
})
