import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getProject(){
    return client
    .db("project")
    .collection("project")
    .find().toArray()
}

export function addProject(data){
    return client
    .db("project")
    .collection("project")
    .insertOne(data)
}

export function getProjectById(id){
    return client
    .db("project")
    .collection("project")
    .findOne({_id: new ObjectId(id)})
}

export function editProjectById(id,data){
    return client
    .db("project")
    .collection("project")
    .findOneAndUpdate({_id : new ObjectId(id)},{$set:data})
}
export function deleteProject(id){
    return client
    .db("project")
    .collection("project")
    .findOneAndDelete({_id: new ObjectId(id)})
}