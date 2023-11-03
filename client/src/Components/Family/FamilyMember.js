import React, { useState, useEffect } from 'react';
import { GetFamilyMembers } from '../../managers/familymanager.js';

const FamilyMember = ({ id, userEmail }) => {
    const [familyMember, setFamilyMember] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newGift, setNewGift] = useState('');
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const fetchFamilyMember = async () => {
            try {
                const data = await GetFamilyMembers(userEmail);
                console.log('Fetched data:', data);
                setFamilyMember(data.find(member => member.id === id));
                if (data && data.Gifts) {
                    setGifts(data.find(member => member.id === id).Gifts);
                }
            } catch (error) {
                console.error('Error fetching family member:', error);
                setError('Error fetching family member. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id && userEmail) {
            fetchFamilyMember();
        }
    }, [id, userEmail]);

    const handleGiftChange = (e) => {
        setNewGift(e.target.value);
    };

    const handleAddGift = () => {
        if (newGift.trim() !== '') {
            setGifts([...gifts, newGift]);
            setNewGift('');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p>First Name: {familyMember.FirstName}</p>
            <p>Last Name: {familyMember.LastName}</p>
            <p>Address: {familyMember.Address}</p>
            <p>Gifts:</p>
            <ul>
                {gifts.map((gift, index) => (
                    <li key={index}>{gift}</li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Add Gift"
                    value={newGift}
                    onChange={handleGiftChange}
                />
                <button onClick={handleAddGift}>Add</button>
            </div>
        </div>
    );
};

export default FamilyMember;







