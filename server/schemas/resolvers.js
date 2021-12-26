const {AuthenticationError}=require("apollo-server-express")
const {signToken}=require("../utils/auth")
const {User,Book}=require("../models")

const resolvers={
    Query:{
        me:async(parent,args,context)=>{
            if(context.user){
                const userData=await User.findOne({_id:context.user._id}).select("-__v-password")
                return userData
            }
            throw new AuthenticationError("not login")
        }
    },
    Mutation:{
        addUser:async(parent,args)=>{
            const user=await User.create(args)
            const token=signToken(user)
            return{token,user}
        },
        login:async(parent,{email,password})=>{
            const user=await User.findOne({email})
            if(!user){
                throw new AuthenticationError("incorrectCredentials")
            }
            const correctPw=await user.isCorrectPassword(password)
            if(!correctPw){
                throw new AuthenticationError("incorrectCredentials")
            }
            const token=signUser(user)
            return{token,user}
        },
        saveBook:async(parent,{input},context)=>{
            if(context.user){
                const updatedUser=await User.findByIdAndUpdate(
                {_id:context.user._id},
                {$push:{savedBooks:input}},
                {new:true}    
                )
                return updatedUser
            }
            throw new AuthenticationError("not login")
        },
        removeBook:async(parent,{bookId},context)=>{
            if(context.user){
                const updatedUser=await User.findByIdAndUpdate(
                {_id:context.user._id},
                {$pull:{savedBooks:{bookId}}},
                {new:true}    
                )
                return updatedUser
            }
            throw new AuthenticationError("not login")  
        }
    }
}
module.exports=resolvers