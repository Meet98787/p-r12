import React, { useEffect, useState } from "react";
import { app, auth, handleLogout } from "./firebase";
import { addDoc, deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";



function Home() {
  const db = getFirestore(app);
  const state = useSelector((state) => state.user);
  const [input, setInput] = useState()
  const [id, setId] = useState()
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    userlist()
  }, [state]);
  const userlist = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    const list = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const id = doc.id
      list.push({ id, ...data })
    });
    return dispatch({
      type: 'fetch',
      data: list
    })

  }
  const hendleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (edit && id) {
      try {
      const userfat = doc(db, "user", id)
      await updateDoc(userfat, input);
      setId(null)
      setInput(null)
      setEdit(null)
      }catch (e){
        console.error("Error update document: ", e);
      }

    } else {
      try {
        const docRef = await addDoc(collection(db, "user"), input);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
  const handleDelete = async (id) => {


    try {
      await deleteDoc(doc(db, "user", id));
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  }
  const handleEdit = async (id) => {
    const userfat = doc(db, "user", id)
    const userref = await getDoc(userfat)
    const user = userref.data()
    setInput(user)
    setId(id)
    setEdit(true)

  }

  return (
    <div>
      <h1 className="text-center">You are now login..</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">name</label>
        <input type="text" name="name" value={input ? input.name : ""} onChange={hendleChange} />
        <label htmlFor="">Email</label>
        <input type="text" name="email" value={input ? input.email : ""} onChange={hendleChange} />
        <button>{edit ? 'Update' : 'Add'}</button>
      </form>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {state && state.map(item => {
            return <tr>
              <td scope="row">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => handleEdit(item.id)}>Edit</button></td>
            </tr>
          }

          )}
          <tr>

          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
