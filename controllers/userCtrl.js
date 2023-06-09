const userCtrl ={
   reisterUser: (req,res) => {
        res.json({msg: "sign up succ"})
    },
    loginUser: (req,res) => {
    res.json({msg: "Login a User"})
}
}
module.exports=userCtrl