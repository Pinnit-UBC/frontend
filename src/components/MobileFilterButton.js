import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import '../styles/MobileFilterButton.css';
import filterIcon from '../assets/Filter.png';

const tagOptions = ['Culture & Community', 'Academic & Professional', 'Sports & Fitness', 'Arts & Performance', 'Social', 'Other'];
const facultyOptions = ['Applied Science', 'Arts', 'Commerce', 'Economics', 'Forestry', 'Kinesiology', 'Land & Food Systems', 'Law', 'Science', 'Other', 'None'];
const degreeLevelOptions = ['Undergraduate', 'Graduate'];

function MobileFilterButton({ onFilterChange }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState([]);
    const [selectedDegreeLevel, setSelectedDegreeLevel] = useState([]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, selectedFaculty, selectedDegreeLevel);
    };

    const handleFacultyChange = (faculty) => {
        const updatedFaculty = selectedFaculty.includes(faculty)
            ? selectedFaculty.filter((f) => f !== faculty)
            : [...selectedFaculty, faculty];
        setSelectedFaculty(updatedFaculty);
        onFilterChange(selectedTags, updatedFaculty, selectedDegreeLevel);
    };

    const handleDegreeLevelChange = (degree) => {
        const updatedDegreeLevel = selectedDegreeLevel.includes(degree)
            ? selectedDegreeLevel.filter((d) => d !== degree)
            : [...selectedDegreeLevel, degree];
        setSelectedDegreeLevel(updatedDegreeLevel);
        onFilterChange(selectedTags, selectedFaculty, updatedDegreeLevel);
    };

    return (
        <div className="filter-button-container">
            <button className="mobile-filter-button" onClick={toggleDrawer(true)}>
                <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
            </button>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '80%',
                        backgroundColor: '#323131',
                        borderRadius: '0px 15px 15px 0px',
                        overflow: 'auto',
                        border: 'none',
                    },
                }}
            >
                <div className="filter-options-container">
                    <div className="filter-group">
                        <h4>Tags</h4>
                        {tagOptions.map((tag, index) => (
                            <div
                                key={index}
                                className={`dropdown-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagChange(tag)}
                            >
                                {tag}
                                {selectedTags.includes(tag) && <span className="checkmark">✔</span>}
                            </div>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Faculty</h4>
                        {facultyOptions.map((faculty, index) => (
                            <div
                                key={index}
                                className={`dropdown-item ${selectedFaculty.includes(faculty) ? 'selected' : ''}`}
                                onClick={() => handleFacultyChange(faculty)}
                            >
                                {faculty}
                                {selectedFaculty.includes(faculty) && <span className="checkmark">✔</span>}
                            </div>
                        ))}
                    </div>
                    <div className="filter-group">
                        <h4>Degree Level</h4>
                        {degreeLevelOptions.map((degree, index) => (
                            <div
                                key={index}
                                className={`dropdown-item ${selectedDegreeLevel.includes(degree) ? 'selected' : ''}`}
                                onClick={() => handleDegreeLevelChange(degree)}
                            >
                                {degree}
                                {selectedDegreeLevel.includes(degree) && <span className="checkmark">✔</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default MobileFilterButton;
