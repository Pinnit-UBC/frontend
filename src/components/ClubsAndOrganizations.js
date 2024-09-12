import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Vars for holding sheet data and display data
function ClubsAndOrganizations() {
  const [sheet1Data, setSheet1Data] = useState([]);
  const [sheet2Data, setSheet2Data] = useState([]);
  const [filteredSheet1Data, setFilteredSheet1Data] = useState([]);
  const [filteredSheet2Data, setFilteredSheet2Data] = useState([]);
  const [filterSheet1, setFilterSheet1] = useState('all');
  const [filterSheet2, setFilterSheet2] = useState('all');
  const [facultiesSheet1, setFacultiesSheet1] = useState([]);
  const [facultiesSheet2, setFacultiesSheet2] = useState([]);
  const [showSheet1, setShowSheet1] = useState(true);
  const [showSheet2, setShowSheet2] = useState(true);

  // ===============================
  // useEffect Hooks
  // ===============================

  // Uses our XLSX import to fetch & load .xlsx file
  useEffect(() => {
    const fetchXLSX = async () => {
      try {
        const response = await fetch('Pinnit Accounts.xlsx'); // IS IN \PUBLIC file. XLSX place there
        if (!response.ok) 
        {
          throw new Error('Network response was not ok.');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);

        if (sheet1.length === 0 || sheet2.length === 0) {
          console.error('Error: XLSX file is empty or contains no valid data.');
        }

        setSheet1Data(sheet1);
        setSheet2Data(sheet2);
        setFilteredSheet1Data(sheet1);
        setFilteredSheet2Data(sheet2);

        const uniqueFacultiesSheet1 = Array.from(new Set(sheet1.map(club => club['Faculty'])));
        const uniqueFacultiesSheet2 = Array.from(new Set(sheet2.map(club => club['Faculty'])));
        
        setFacultiesSheet1(uniqueFacultiesSheet1);
        setFacultiesSheet2(uniqueFacultiesSheet2);
      } catch (error) {
        console.error('Error fetching or parsing XLSX:', error);
      }
    };

    fetchXLSX();
  }, []);

  // Sheet filtering hide / show code
  // Note: Without these it will not toggle (should be like XOR?)
  useEffect(() => {
    if (filterSheet1 === 'all') {
      setFilteredSheet1Data(sheet1Data);
    } else {
      setFilteredSheet1Data(sheet1Data.filter(club => club['Faculty'] === filterSheet1));
    }
  }, [filterSheet1, sheet1Data]);

  useEffect(() => {
    if (filterSheet2 === 'all') {
      setFilteredSheet2Data(sheet2Data);
    } else {
      setFilteredSheet2Data(sheet2Data.filter(club => club['Faculty'] === filterSheet2));
    }
  }, [filterSheet2, sheet2Data]);

  const handleSheet1Filter = (faculty) => {
    setFilterSheet1(faculty);
    setShowSheet2(false); // 
    setShowSheet1(true); 
  };

  const handleSheet2Filter = (faculty) => {
    setFilterSheet2(faculty);
    setShowSheet1(false); 
    setShowSheet2(true); 
  };



  // ===============================
  // Actual Display Code
  // ===============================

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Clubs and Organizations</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Sheet 1 Filters</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => handleSheet1Filter('all')}
            style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}
          >
            All
          </button>
          {facultiesSheet1.map((faculty, index) => (
            <button
              key={index}
              onClick={() => handleSheet1Filter(faculty)}
              style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}
            >
              {faculty}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Sheet 2 Filters</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => handleSheet2Filter('all')}
            style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}
          >
            All
          </button>
          {facultiesSheet2.map((faculty, index) => (
            <button
              key={index}
              onClick={() => handleSheet2Filter(faculty)}
              style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer' }}
            >
              {faculty}
            </button>
          ))}
        </div>
      </div>

      {showSheet1 && filteredSheet1Data.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Sheet 1 Data</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredSheet1Data.map((club, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '300px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h3>{club['Account Title']}</h3>
                <p><strong>Faculty:</strong> {club['Faculty']}</p>
                {club['Image Link'] && (
                  <img src={club['Image Link']} alt={club['Account Title']} style={{ maxWidth: '100%', borderRadius: '5px' }} />
                )}
                <p><strong>Account Link:</strong> <a href={club['Account Link']} target="_blank" rel="noopener noreferrer">{club['Account Link']}</a></p>
                <p><strong># of followers:</strong> {club['# of followers']}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSheet2 && filteredSheet2Data.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Sheet 2 Data</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredSheet2Data.map((club, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '300px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h3>{club['Account Title']}</h3>
                <p><strong>Faculty:</strong> {club['Faculty']}</p>
                {club['Image Link'] && (
                  <img src={club['Image Link']} alt={club['Account Title']} style={{ maxWidth: '100%', borderRadius: '5px' }} />
                )}
                <p><strong>Account Link:</strong> <a href={club['Account Link']} target="_blank" rel="noopener noreferrer">{club['Account Link']}</a></p>
                <p><strong># of followers:</strong> {club['# of followers']}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubsAndOrganizations;
