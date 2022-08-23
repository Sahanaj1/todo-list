import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./Homepage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';


export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const[complete,setComplete]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };
const handleComp=(uid)=>{
  remove(ref(db, `/${auth.currentUser.uid}/${uid}`));

}

  return (
    <div className="homepage">
    

     
      <input
        className="add-edit-input"
        type="text"
        placeholder="Add your todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      
      <div className="container2">

     
      {todos.map((todo) => (
        <div className="todo">
          <h2>{todo.todo}</h2>
          <EditIcon
            
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <DeleteIcon
            
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
          <CheckIcon
          fontSize="large"
          onClick= {()=>handleComp(todo.uidd)}
          className="delete-button"
        />
        </div>
         
      ))}
     </div>
      {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
      <div className="logout-text" onClick={handleSignOut}  >
      Logout
      </div>
      <LogoutIcon onClick={handleSignOut} className="logout-icon" /> 
    </div>
    
  );
}