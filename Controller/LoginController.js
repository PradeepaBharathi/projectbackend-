import { ObjectId } from "mongodb";
import { client } from "../db.js";
import jwt from 'jsonwebtoken'
export function getUser(){
    return client
    .db("project")
    .collection("users")
    .find().toArray()
}

export function registerUser(data){
    return client
    .db("project")
    .collection("users")
    .insertOne(data)
}

export function getUserById(id){
    return client
    .db("project")
    .collection("users")
    .findOne({_id:new ObjectId(id)})
}

export  function getUserByEmail(email) {
    const query = { email: email };
    console.log("Query:", query);
    return client.db("project").collection("users").findOne(query);
   
  }
  

export async function generateToken(id,secret){
    console.log(id)
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'})
}