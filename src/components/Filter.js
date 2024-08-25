import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/Filter.css';

function Filter({ onFilterChange }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState([]);
    const [selectedDegreeLevel, setSelectedDegreeLevel] = useState([]);

    const tagOptions = ['Culture & Community', 'Academic & Professional', 'Sports & Fitness', 'Arts & Performance', 'Social', 'Other'];
    const facultyOptions = ['Applied Science', 'Arts', 'Commerce', 'Economics', 'Forestry', 'Kinesiology', 'Land & Food Systems', 'Law', 'Science', 'Other', 'None'];
    const degreeLevelOptions = ['Undergraduate', 'Graduate'];

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBubbleClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const formatTagForFiltering = (tag) => {
        return tag.toLowerCase().replace(/ & /g, '-');
    };

    const handleTagChange = (tag) => {
        const formattedTag = formatTagForFiltering(tag);
        const updatedTags = selectedTags.includes(formattedTag)
            ? selectedTags.filter((t) => t !== formattedTag)
            : [...selectedTags, formattedTag];
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, selectedFaculty, selectedDegreeLevel);
    };

    const handleFacultyChange = (faculty) => {
        const formattedFaculty = formatTagForFiltering(faculty);
        const updatedFaculty = selectedFaculty.includes(formattedFaculty)
            ? selectedFaculty.filter((f) => f !== formattedFaculty)
            : [...selectedFaculty, formattedFaculty];
        setSelectedFaculty(updatedFaculty);
        onFilterChange(selectedTags, updatedFaculty, selectedDegreeLevel);
    };

    const handleDegreeLevelChange = (degree) => {
        const formattedDegree = formatTagForFiltering(degree);
        const updatedDegreeLevel = selectedDegreeLevel.includes(formattedDegree)
            ? selectedDegreeLevel.filter((d) => d !== formattedDegree)
            : [...selectedDegreeLevel, formattedDegree];
        setSelectedDegreeLevel(updatedDegreeLevel);
        onFilterChange(selectedTags, selectedFaculty, updatedDegreeLevel);
    };

    const removeTag = (tag) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
        onFilterChange(updatedTags, selectedFaculty, selectedDegreeLevel);
    };

    const removeFaculty = (faculty) => {
        const updatedFaculty = selectedFaculty.filter((f) => f !== faculty);
        setSelectedFaculty(updatedFaculty);
        onFilterChange(selectedTags, updatedFaculty, selectedDegreeLevel);
    };

    const removeDegree = (degree) => {
        const updatedDegreeLevel = selectedDegreeLevel.filter((d) => d !== degree);
        setSelectedDegreeLevel(updatedDegreeLevel);
        onFilterChange(selectedTags, selectedFaculty, updatedDegreeLevel);
    };

    return (
        <div className="filter-container">
            <div className="filter-bubble" onClick={handleBubbleClick} ref={dropdownRef}>
                Filter Events
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="filter-group">
                            <h4>Tags</h4>
                            {tagOptions.map((tag, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectedTags.includes(formatTagForFiltering(tag)) ? 'selected' : ''}`}
                                    onClick={() => handleTagChange(tag)}
                                >
                                    {tag}
                                    {selectedTags.includes(formatTagForFiltering(tag)) && <span className="checkmark">✔</span>}
                                </div>
                            ))}
                        </div>
                        <div className="filter-group">
                            <h4>Faculty</h4>
                            {facultyOptions.map((faculty, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectedFaculty.includes(formatTagForFiltering(faculty)) ? 'selected' : ''}`}
                                    onClick={() => handleFacultyChange(faculty)}
                                >
                                    {faculty}
                                    {selectedFaculty.includes(formatTagForFiltering(faculty)) && <span className="checkmark">✔</span>}
                                </div>
                            ))}
                        </div>
                        <div className="filter-group">
                            <h4>Degree Level</h4>
                            {degreeLevelOptions.map((degree, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectedDegreeLevel.includes(formatTagForFiltering(degree)) ? 'selected' : ''}`}
                                    onClick={() => handleDegreeLevelChange(degree)}
                                >
                                    {degree}
                                    {selectedDegreeLevel.includes(formatTagForFiltering(degree)) && <span className="checkmark">✔</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="selected-options">
                {selectedTags.map((tag, index) => (
                    <span key={index} className="selected-option">
                        {tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} <span className="remove-option" onClick={() => removeTag(tag)}>✖</span>
                    </span>
                ))}
                {selectedFaculty.map((faculty, index) => (
                    <span key={index} className="selected-option">
                        {faculty.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} <span className="remove-option" onClick={() => removeFaculty(faculty)}>✖</span>
                    </span>
                ))}
                {selectedDegreeLevel.map((degree, index) => (
                    <span key={index} className="selected-option">
                        {degree.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} <span className="remove-option" onClick={() => removeDegree(degree)}>✖</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

Filter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
