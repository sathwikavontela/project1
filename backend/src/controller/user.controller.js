import { User } from "../models/user.model.js";
const createAccount = async(req,res)=>{
    try {

        const {username,password,email,role,department} = req.body;
        //console.log(username,password,email,role,department);
        if(!username || !password || !email || !role || !department)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        ///console.log(username);
        const isuserExists = await User.findOne({ username });
        // console.log(isuserExists);
        // console.log("jhello");
        if(isuserExists)
        {
            return res.status(401).json({message:"user already exists"});
        }
        const newUser = await User.create({username,password,email,role,department});
        
        if(!newUser)
        {
            return res.status(400).json({message:"error while creating the user"});
        }
        res.status(200).json({User:newUser});
    }
    catch (error) {
        return res.status(500).json({error:error.message});
    }
}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        //console.log(username,password);
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({ username });
        //console.log(userExists);
        if (!userExists) {
            return res.status(401).json({ message: "User does not exist" });
        }

        const isPasswordValid = await userExists.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Your username or password is incorrect" });
        }

        const userToken = await userExists.generateAccessToken();
        //console.log(userToken);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };
        return res.status(200)
            .cookie("userToken", userToken, options)
            .json({
                user: {
                    _id: userExists._id,
                    username: userExists.username,
                    email: userExists.email,
                },
            });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id);
    const options = {
        path: '/',
        secure: true,
        sameSite: 'None',
    };
    res.clearCookie('userToken', options); 
    return res.status(200).json({ message: 'Logged out successfully' });
};


const getAllUsers = async (req, res) => {
    try {
      const allUsers = await User.find({}, { password: 0 });
      //console.log(allUsers); 
      return res.status(200).json({ users: allUsers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching users" });
    }
  };
  



export {createAccount,loginUser,getAllUsers,logoutUser}

