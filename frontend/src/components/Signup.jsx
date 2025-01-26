import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation,gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
const signupmutation=gql`
mutation signup($email:String!,$name:String!,$password:String!){
signup(signupinput:{email:$email,username:$name,password:$password}){
user{
id
email
username
}
message
status
success
}
}
`
const Signup = () => {
  const[signup,{data,loading,error}]=useMutation(signupmutation)
  const navigate=useNavigate()
    const [email, setEmail] = useState('')
        const [name, setName] = useState()
        const [password, setPassword] = useState('')
        const [confirmPassword, setconfirmPassword] = useState('')
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }
        
          try {
            const response=await signup({
              variables:{
                email,
                name,
                password
              }
            })
            if(response.data.signup.success){
              alert("Signup successful")
              navigate('/')

              console.log("User Details:",response.data.signup.user)
            }
            alert('Signup Successful!');
            setEmail('');
            setPassword('');
            setconfirmPassword('');
            console.log(email, password);
          } catch (err) {
            console.log(err);
          }
        };
        
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-[70%] w-[30%] bg-gray-500 items-center rounded-2xl">
        <h1 className="text-white text-3xl font-bold text-center mt-7">
          Signup
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9"
            placeholder="create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9 bg-blue-500 text-white"
          >
            Signup
          </button>
          <h3 className="text-center mt-9">
            Already have an account?
            <span>
              <Link to="/" className="ml-2 text-blue-900 underline">
                Login
              </Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Signup