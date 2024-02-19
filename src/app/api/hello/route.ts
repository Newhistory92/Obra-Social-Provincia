import { database } from "@/app/store";
import { rejects } from "assert";
import { resolve } from "path";

export const getproyec = async()=>{
    try{
        return (await new Promise ((resolve, rejects)=>{
            database.query(
                "SELECT * FROM afiliado", (err,data)=> (err ? rejects(err): resolve(data))
            )
        })) 
    } 
    catch (error){
console.log(error)
    }

}