import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function ClubsAndOrganizations() {
  const [sheet1Data, setSheet1Data] = useState([]);
  const [sheet2Data, setSheet2Data] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultiesSheet1, setFacultiesSheet1] = useState([]);
  const [facultiesSheet2, setFacultiesSheet2] = useState([]);
  const [viewCategory, setViewCategory] = useState(true);

  // Load XLSX data
  useEffect(() => {
    const fetchXLSX = async () => {
      try {
        const response = await fetch('Pinnit Accounts.xlsx'); // Assuming file is in public directory
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]); // Faculties & Programs
        const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]); // Faculty & Academic

        setSheet1Data(sheet1);
        setSheet2Data(sheet2);

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

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setViewCategory(false);
    if (category === 'all') {
      // If "All Categories" is selected, show all data from sheet1
      setFilteredData(sheet1Data);
    } else {
      const filtered = sheet1Data.filter(club => club['Faculty'] === category);
      setFilteredData(filtered);
    }
  };

  // Handle faculty selection
  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(faculty);
    setViewCategory(false);
    if (faculty === 'all') {
      // If "All Faculties" is selected, show all data from sheet2
      setFilteredData(sheet2Data);
    } else {
      const filtered = sheet2Data.filter(club => club['Faculty'] === faculty);
      setFilteredData(filtered);
    }
  };

  // Handle back button to go to the main view
  const handleBackClick = () => {
    setViewCategory(true);
    setSelectedCategory(null);
    setSelectedFaculty(null);
    setFilteredData([]);
  };

  // Updated order of categories, with "All Categories" first, and "Culture & Community" before "Fraternities & Sororities"
  const categories = [
    { label: 'All Categories', key: 'all' },
    { label: 'Culture & Community', key: 'Culture & Community' },
    { label: 'Fraternities & Sororities', key: 'Fraternities & Sororities' },
    { label: 'Arts & Performance', key: 'Arts & Performance' },
    { label: 'Health & Wellness', key: 'Health & Wellness' },
    { label: 'Social', key: 'Social' },
    { label: 'Sports & Fitness', key: 'Sports & Fitness' },
    { label: 'Varsity Clubs', key: 'Varsity Clubs' }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Back button */}
      {!viewCategory && (
        <button onClick={handleBackClick} style={{ marginBottom: '20px' }}>
          Back
        </button>
      )}

      {/* Category View */}
      {viewCategory && (
        <>
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
                <div key={index} onClick={() => handleCategoryClick(category.key)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <img
                    src="/PLACEHOLDER.png"
                    alt={category.label}
                    style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>{category.label}</div>
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
              {/* "All Faculties" option */}
              <div onClick={() => handleFacultyClick('all')} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <img
                  src="/PLACEHOLDER.png"
                  alt="All Faculties"
                  style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>All Faculties</div>
              </div>

              {/* Individual Faculties */}
              {facultiesSheet2.map((faculty, index) => (
                <div key={index} onClick={() => handleFacultyClick(faculty)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <img
                    src="/PLACEHOLDER.png"
                    alt={faculty}
                    style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', wordWrap: 'break-word' }}>{faculty}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Display Filtered Data */}
      {!viewCategory && filteredData.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2>{selectedCategory || selectedFaculty} Data</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredData.map((club, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  width: '300px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3>{club['Account Title']}</h3>
                <p><strong>Faculty:</strong> {club['Faculty']}</p>
                {club['Username'] && (
                  <img
                    src={`/assets/PFP/${club['Username']}.jpg`}
                    alt={club['Account Title']}
                    style={{ maxWidth: '100%', borderRadius: '5px' }}
                  />
                )}
                <p>
                  <strong>Account Link:</strong>{' '}
                  <a href={club['Account Link']} target="_blank" rel="noopener noreferrer">
                    {club['Account Link']}
                  </a>
                </p>
                <p>
                  <strong># of followers:</strong> {club['# of followers']}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data */}
      {!viewCategory && filteredData.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>No data available for {selectedCategory || selectedFaculty}</p>
        </div>
      )}
    </div>
  );
}

export default ClubsAndOrganizations;
