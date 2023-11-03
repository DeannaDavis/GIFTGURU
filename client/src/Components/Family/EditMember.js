import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetFamilyMembersById } from '../../managers/familymanager.js';

const EditMember = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        giftName: ''
    });

    let {id} = (useParams())


    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        GetFamilyMembersById(id).then(setFormData)
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            fetch(`/api/familymembers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setSuccessMessage('Member updated successfully');
                })
                .catch(error => {
                    console.error('Error updating member:', error);
                    setSuccessMessage('Failed to update member');
                });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Edit Family Member</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Gift"
                    name="giftName"
                    value={formData.giftName}
                    onChange={handleChange}
                />
                <button type="submit">Edit</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default EditMember;


