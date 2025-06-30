import Event from "./Events.model.js";

export async function GetEvents(req,res) {
    try{
        const {courseId} = req.params ;
        
        const course = await Event.findById(courseId).populate("assignments");

        if(!course){
            return res.status(400).send({message:""})
        }

        res.status(200).json({assignments : course.assignments});
    } catch(err){
        res.status(500).send({error:err.message});
    }
}
