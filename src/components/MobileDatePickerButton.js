import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-mobile-datepicker';
import '../styles/MobileDatePickerButton.css';
import calendarIcon from '../assets/Calendar.png';

const monthMap = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
};

const dateConfig = {
    'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
    },
    'month': {
        format: value => monthMap[value.getMonth() + 1],
        caption: 'Mon',
        step: 1,
    },
    'date': {
        format: 'DD',
        caption: 'Day',
        step: 1,
    },
};

const MobileDatePickerButton = ({ selectedDate, setSelectedDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(new Date(selectedDate));
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        setTime(new Date(selectedDate));
    }, [selectedDate]);

    const handleClick = () => {
        setIsOpen(true);
        setShowPicker(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setTimeout(() => setShowPicker(false), 500); // Match the CSS transition duration
    };

    const handleSelect = (time) => {
        setTime(time);
        setSelectedDate(time.toISOString().split('T')[0]);
        setIsOpen(false);
        setTimeout(() => setShowPicker(false), 500); // Match the CSS transition duration
    };

    return (
        <div className="date-picker-button-container">
            <button className="mobile-date-picker-button" onClick={handleClick}>
                <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
            </button>
            {showPicker && (
                <div className={`date-picker-wrapper ${isOpen ? 'slide-up' : 'slide-down'}`}>
                    <div className="date-picker-inner-wrapper">
                        <DatePicker
                            value={time}
                            isOpen={isOpen}
                            onSelect={handleSelect}
                            onCancel={handleCancel}
                            confirmText="Submit"
                            cancelText="Cancel"
                            dateConfig={dateConfig}
                            theme="ios" // Assuming you are using a theme that supports customization
                            style={{ borderRadius: '20px 20px 0 0' }} // Inline style for rounding
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

MobileDatePickerButton.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};

export default MobileDatePickerButton;
