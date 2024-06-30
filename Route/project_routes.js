import express from 'express'
import { addProject,  deleteProject,  editProjectById, getProject, getProjectById } from '../Controller/project_controller.js'

const router = express.Router()

router.get("/all-project",async(req,res)=>{
    try {
        const existingProjects = await getProject()
        if(existingProjects.length==0){
            return res.status(400).json({message:"No Projects available"})
        }
        return res.status(200).json({data:existingProjects})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.post("/add-project",async(req,res)=>{
    try {
        const {projectname,startby,dueby,status} = req.body
        if(!projectname || !startby || !dueby || !status){
            return res.status(400).json({ message: "Please fill all the details" });
        }
        const newProject = await addProject( {projectname,startby,dueby,status})
        if(!newProject.acknowledged){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(200).json({data:{projectname,startby,dueby,status},result:newProject})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


router.get("/project/:id",async(req,res)=>{
    try {
        const {id} = req.params

        const project = await getProjectById(id)
        if(!project){
            return res.status(400).json({ message: "Project not available" });
        }
        return res.status(200).json({data:project,fetched:"success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


router.put("/edit/:id",async(req,res)=>{
    try {
        const{id} = req.params
        const updatedProject = req.body

        if(!id || !updatedProject){
            return res.status(400).json({message:"Wrong request"})
        }
        const editProject  = await editProjectById(id,updatedProject)
            if(!editProject){
                return res.status(400).json({message:"error occured"})
            }     
            return res.status(201).json({data:updatedProject,status:editProject})  
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


export const project_router = router