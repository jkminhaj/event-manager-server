import User from "./Users.model.js";

export async function GetEvfadents(req,res) {
    try{
        const {courseId} = req.params ;
        
        const course = await User.findById(courseId).populate("assignments");

        if(!course){
            return res.status(400).send({message:""})
        }

        res.status(200).json({assignments : course.assignments});
    } catch(err){
        res.status(500).send({error:err.message});
    }
}