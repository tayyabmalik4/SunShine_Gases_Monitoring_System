import authh from "../model/loginModel.js";


export const signupController = async  (req,res)=>{

    const signup = req.body;
    // console.log("User Data is: ", signup)
    const newUser = new authh(signup)
    
    try {
        await newUser.save()
        // console.log("User Inserted SuccessFully")
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const loginController =  async (req,res)=>{
    const logindata = req.body;
    // console.log(logindata.username,"password", logindata.password)
    const backusername = logindata.username
    const backpassword = logindata.password
    try {
        const logindata = await authh.find({username : backusername , password : backpassword})
        // console.log("Auth Data is Fatched SuccessFully")
        res.status(201).json(logindata)
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}