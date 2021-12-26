const {gql}=require("apollo-server-express")
const typeDefs=gql`
type User{
    _id:ID
    userName:String
    email:String
    bookCount:Init
    savedBooks:[Book]
}
type Auth{
    token:ID!
    user:User
}
type Book{
    bookId:String
    authors:[String]
    description:String
    title:String
    image:String
    link:String
}
type BookInput{
    bookId:String
    authors:[String]
    description:String
    title:String
    image:String
    link:String 
}
type Query{
me:User
}
type Mutation{
    login(email:String!,password:String!):Auth
    addUser(userName:String!,email:String!,password:String!):Auth
    saveBook(input:BookInput!):User
    removeBook(bookId:String!):User

}
`
module.exports=typeDefs