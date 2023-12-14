import React, { useEffect, useState } from "react";
import { app,auth, handleLogout } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 



function Home() {
  const db = getFirestore(app);
  const [user,setuser]=useState()
  useEffect(() => {
    console.log(user)
   userlist()
  },);
  const userlist = async() =>{
    const querySnapshot = await getDocs(collection(db, "user"));
    const list = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const id = doc.id
      list.push({id,...data})
    });
    setuser(list)
  }

  return (
    <div>
      <h1 className="text-center">You are now login..</h1>
      <table class="table table-hover">
        <thead>
          <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">email</th>
          </tr>
        </thead>
        <tbody>
          {user&&user.map(item=>{
            return <tr>
              <td scope="row">{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
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
