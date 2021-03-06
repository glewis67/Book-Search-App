import gql from "graphql-tag";

export const LOGIN_USER=gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
        user{
            _id
            userName
        }
    }
}`
export const ADD_USER=gql`
mutation addUser($userName:String!,$email:String!,$password:String!){
    addUser(userName:$userName,email:$email,password:$password){
        token
        user{
            _id
            userName
        }
    }
}`
export const SAVE_BOOK=gql`
mutation saveBook($input:BookInput!){
    saveBook(input:$input){
        _id
        userName
        email
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`
export const REMOVE_BOOK=gql`
mutation removeBook($bookId:String!){
    removeBook(bookId:$bookId){
        _id
        userName
        email
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`