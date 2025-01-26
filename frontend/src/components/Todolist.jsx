import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const user_query = gql`
  query finduserbyid($id: ID) {
    finduserbyid(id: $id) {
      user {
        todo
      }
    }
  }
`;

const add_query = gql`
  mutation addtodo($id: ID, $todo: String) {
    addtodo(id: $id, todo: $todo) {
      user {
        id
        email
        username
      }
      message
      status
      success
    }
  }
`;
const deletequery=gql`
    mutation deletetodo($id:ID,$index:Int){
     deletetodo(id:$id,index:$index){
        user{
            id
            email
            username
            todo
        }
        message
        status
        success

}
    }
`
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { data, loading, error } = useQuery(user_query, {
    variables: { id: '679606236400983cc56af2f3' }
  });

  const [addtodo, { data1, loading1, error1 }] = useMutation(add_query);
const[deletetodo,{data2,loading2,error2}]=useMutation(deletequery);
  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      try {
        const response = await addtodo({
          variables: {
            id: '679606236400983cc56af2f3',
            todo: inputValue.trim()
          }
        });
        if (response.data.addtodo.success) {
          setTodos([...todos, inputValue.trim()]); // Update local state with new todo
          setInputValue('');
        }
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };
  const deletetodos = async (index) => {
    try{
        const response=await deletetodo({
            variables:{
                id:'679606236400983cc56af2f3',
                index:index
            }
        })
        if(response.data.deletetodo.success){
            setTodos(todos.filter((_,i)=>i!==index))
        }

    }
    catch(err){
        console.error('Error deleting todo:',err)
    }




  }
  useEffect(() => {
    if (data) {
      setTodos(data.finduserbyid.user.todo); // Load todos from query data
    }
  }, [data]);

  if (loading || loading1) return <p>Loading...</p>;
  if (error || error1) return <p>Error: {error?.message || error1?.message}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md w-[80%] sm:w-[50%] md:w-[40%]">
        <input
          type="text"
          placeholder="Enter a todo..."
          aria-label="Todo input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddTodo}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      {todos.length > 0 && (
        <div className="mt-6 w-[80%] sm:w-[50%] md:w-[40%] bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Your Todos:</h2>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-300 last:border-none text-gray-700"
            >
              {index + 1}. {todo}
              <div className="flex justify-end">
  <button className="p-2 bg-blue-400 rounded" onClick={()=>{deletetodos(index)}}>Delete</button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todolist;
