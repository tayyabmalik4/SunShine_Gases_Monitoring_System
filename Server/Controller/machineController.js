import machine from "../model/machineModel.js";

export const machinePostController = async ( req, res) =>{

    const machinebody = req.body;
    // console.log("Machine Data is :" , machinebody)
    const newmachine = new machine(machinebody)
    try {
        await newmachine.save()
        console.log("Machine Data is Posted SuccessFully")
        res.status(200).json(newmachine)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}


export const machineGetController = async ( req,res )=>{
    try {
        // const machinedata = await machine.find({AreaRef : "634e490830581b67e4673517"}).populate('AreaRef');
        const machinedata = await machine.find({});
        // console.log("Machine Data is Fatched SuccessFully")
        res.status(201).json(machinedata)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}