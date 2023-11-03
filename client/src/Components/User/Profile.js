import React, { useState, useEffect } from 'react';
import { GetUserProfile } from '../../managers/userProfileManager.js';

const Profile = ({ loggedInUser }) => {
    const [userProfile, setUserProfile] = useState({});
    const [gifts, setGifts] = useState([
        { id: 1, name: 'RareBeauty Blush'},
        { id: 2, name: 'Vejas Shoes'},
    ]);

    const [giftNames, setGiftNames] = useState(gifts.map(gift => gift.name));
    const [editMode, setEditMode] = useState(Array(gifts.length).fill(false));

    const handleEditGift = (index) => {
        const updatedGiftNames = [...giftNames];
        updatedGiftNames[index] = gifts[index].name;
        setGiftNames(updatedGiftNames);
        const updatedEditMode = [...editMode];
        updatedEditMode[index] = !editMode[index];
        setEditMode(updatedEditMode);
    };

    return (
        <div className='Profile-Div'>
            <h2>User Profile</h2>
            <p>First Name: {loggedInUser.firstName}</p>
            <p>Last Name: {loggedInUser.lastName}</p>
            <p>Address: {loggedInUser.address}</p>
            <div>
                <h3>Gifts</h3>
                <ul>
                    {gifts.map((gift, index) => (
                        <li key={gift.id}>
                            <div>
                                <img src={gift.image} alt={gift.name} />
                            </div>
                            <div>
                                {editMode[index] ? (
                                    <input
                                        type='text'
                                        value={giftNames[index]}
                                        onChange={(e) => {
                                            const updatedGiftNames = [...giftNames];
                                            updatedGiftNames[index] = e.target.value;
                                            setGiftNames(updatedGiftNames);
                                        }}
                                    />
                                ) : (
                                    <p>Name: {giftNames[index]}</p>
                                )}
                                <button onClick={() => handleEditGift(index)}>
                                    {editMode[index] ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;



