import React, { useState } from 'react';
import axios from 'axios';
import './UniTable.css';

const UniTable = () => {
  const [universities, setUniversities] = useState([]);

  const loadUniversities = async () => {
    try {
      const response = await axios.get('http://universities.hipolabs.com/search?country=Australia');
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching the university data', error);
    }
  };

  return (
    <div className="uni-table-container">
      <div className="buttons">
        <button onClick={loadUniversities}>LOAD</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university, index) => (
            <tr key={index}>
              <td>{university.name}</td>
              <td>{university.country}</td>
              <td><a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniTable;