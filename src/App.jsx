import { useState, useEffect } from 'react';
import './App.css';



const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/api_practice/studentAPi.php/showstudent')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const editData = (id, updatedTitle) => {
    fetch(`http://localhost/api_practice/studentAPi.php/updatestudent?id=1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name:"Steve Smith",
        email: "smith123@gmail.com",
        phone:  9002503534
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? updatedItem : item))
        );
        console.log(data);
      })
      .catch((error) => console.error('Error editing data:', error));
  };

  const deleteData = (id) => {
    fetch(`http://localhost/api_practice/studentAPi.php/deletestudent?id=1`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => editData(item.id, 'Updated Title')}>Edit</button>
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default App;
