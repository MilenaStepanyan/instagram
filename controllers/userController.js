import pool from "../lib/db.js";

export const userUpdate = async(req,res) =>{
    const {id} = req.params
    const {profile_picture,bio} = req.body
    try{
       const [updatedProfile] =await pool.query(
        `UPDATE users SET bio=?,profile_picture=?WHERE id =?`,[bio,profile_picture,id]
    )   
    if(updatedProfile.affectedRows===0){
        return res.status(404).json({msg:"User not found"})
    }
    return res.status(200).json({msg:"User updated succesfully"})
    }catch(Err){
        res.status(500).json({msg:"Something went wrong"},Err)
    }
  
}
// export const getUser = async(req,res)=>{
    
// }