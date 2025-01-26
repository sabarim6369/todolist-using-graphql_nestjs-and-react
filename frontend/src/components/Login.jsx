import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation,gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const loginmutation=gql`
mutation Login($email:String!,$password:String!){
login(logininput:{email:$email,password:$password}){
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
const Login =() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [login, {data, loading, error} ] = useMutation(loginmutation);
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await login({
          variables: {
            email,
            password,
          },
        });
        if (response.data.login.success) {
          alert("Login successful");
          navigate('/Todo');
          console.log("User Details:", response.data.login.user);
        } else {
          alert(response.data.login.message);
        }
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-[60%] w-[30%] bg-gray-500 items-center rounded-2xl">
        <h1 className="text-white text-3xl font-bold text-center mt-7">
          Login
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
            type="password"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-[80%] ml-10 p-3 rounded-2xl mt-9 bg-blue-500 text-white"
          >
            Login
          </button>
          <h3 className="text-center mt-9">
            Dont have an account?
            <span>
              <Link to="/signup" className="ml-2 text-blue-900 underline">
                Signup
              </Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login