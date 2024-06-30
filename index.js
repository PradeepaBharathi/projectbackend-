import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './db.js'
import { user_router } from './Route/Loginroutes.js'
import { project_router } from './Route/project_routes.js'
import { isAuthenticated } from './auth/user_auth.js'


const app = express()
dotenv.config()

const PORT = process.env.PORT
dbConnection()
app.use(express.json())
app.use(cors())
app.use("/user",user_router)
app.use("/project",isAuthenticated,project_router)
app.get("/",async(req,res)=>{
    return res.status(200).json({message:"API working"})
})


app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`)
})