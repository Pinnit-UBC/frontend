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

  // useEffect Hooks
  useEffect(() => {
    const fetchXLSX = async () => {
      try {
        const response = await fetch('Pinnit Accounts.xlsx'); // IS IN \PUBLIC file. XLSX place there
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);

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
    setShowSheet2(false); // Hide Sheet 2 data
    setShowSheet1(true); // Show Sheet 1 data
  };

  const handleSheet2Filter = (faculty) => {
    setFilterSheet2(faculty);
    setShowSheet1(false); // Hide Sheet 1 data
    setShowSheet2(true); // Show Sheet 2 data
  };

  const categories = [
    { label: 'Academic & Professional', key: 'Academic & Professional' },
    { label: 'Arts & Performance', key: 'Arts & Performance' },
    { label: 'Fraternities & Sororities', key: 'Fraternities & Sororities' },
    { label: 'Culture & Community', key: 'Culture & Community' },
    { label: 'Health & Wellness', key: 'Health & Wellness' },
    { label: 'Social', key: 'Social' },
    { label: 'Sports & Fitness', key: 'Sports & Fitness' },
    { label: 'Varsity Clubs', key: 'Varsity Clubs' },
    { label: 'All Categories', key: 'all' }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      
      {/* Search for Category */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
          <span style={{ padding: '0 10px', whiteSpace: 'nowrap', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
            Search for Category
          </span>
          <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {categories.map((category, index) => (
            <div key={index} onClick={() => handleSheet1Filter(category.key)} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <img src="/PLACEHOLDER.png" alt={category.label} style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>{category.label}</div> {/* Increased font size */}
            </div>
          ))}
        </div>
      </div>

      {/* Search for Faculty */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
          <span style={{ padding: '0 10px', whiteSpace: 'nowrap', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
            Search for Faculty
          </span>
          <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div onClick={() => handleSheet2Filter('all')} style={{ textAlign: 'center', cursor: 'pointer' }}>
            <img src="/PLACEHOLDER.png" alt="All Faculties" style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>All Faculties</div> {/* Increased font size */}
          </div>
          {facultiesSheet2.map((faculty, index) => (
            <div key={index} onClick={() => handleSheet2Filter(faculty)} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <img src="/PLACEHOLDER.png" alt={faculty} style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>{faculty}</div> {/* Increased font size */}
            </div>
          ))}
        </div>
      </div>

      {/* Display Sheet 1 Data */}
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

      {/* Display Sheet 2 Data */}
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
