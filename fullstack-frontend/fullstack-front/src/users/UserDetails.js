import { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = ({ newUser }) => { 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [newUser]); 

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data.filter(user => user.id === newUser.id)); 
  };

  return (
    <div className="container">
      <div className="py-4 ">
        <table className="table shadow border">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { name, total } = user;
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;


