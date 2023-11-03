import React, { useEffect, useState } from 'react';
import { GetBigFam } from '../../managers/familymanager.js';

const CreateMember = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        giftName: '',
        familyId: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const [bigFam, setBigFam] = useState([]);
    useEffect(() => {
        GetBigFam().then(data => setBigFam(data || []));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/familymembers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage('Member created successfully');
                } else {
                    setSuccessMessage('Failed to create member');
                }
                return response.json();
            })
            .catch(error => console.error('Error:', error));
    };

    const handleFamilyChange = (event) => {
        const { value } = event.target;
        const selectedFamily = bigFam.find(family => family.surname === value);
        setFormData(prevState => ({
            ...prevState,
            familyId: selectedFamily.id
        }));
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
            <h2>Create New Family Member</h2>
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
                    placeholder="Gift(s) They Want"
                    name="giftName"
                    value={formData.giftName}
                    onChange={handleChange}
                />
                {/* Dropdown menu for selecting the family */}
                <select name="family" onChange={(e)=>{
                    const clone = structuredClone(formData)
                    clone.familyId=e.target.value
                    setFormData(clone)
                }}>
                    <option value=""hidden>Select Family</option>
                    {bigFam.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.surname}
                        </option>
                    ))}
                </select>
                <button type="submit">Create</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default CreateMember;





