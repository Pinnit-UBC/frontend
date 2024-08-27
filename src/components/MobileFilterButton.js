import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import '../styles/MobileFilterButton.css';
import filterIcon from '../assets/Filter.png';
import Filter from './Filter'; // Import the Filter component

function MobileFilterButton({ onFilterChange }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
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
                        backgroundColor: '#393838',
                        borderRadius: '0px 15px 15px 0px',
                        overflow: 'auto',
                        border: 'none',
                    },
                }}
            >
                <div className="drawer-header">
                    <button className="custom-close-button" onClick={toggleDrawer(false)}>
                        &times;
                    </button>
                </div>
                <Filter onFilterChange={onFilterChange} /> {/* Render the Filter component */}
            </Drawer>
        </div>
    );
}

export default MobileFilterButton;
