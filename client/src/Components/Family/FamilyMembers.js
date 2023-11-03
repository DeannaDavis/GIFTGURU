import React, { useEffect, useState } from "react";
import { DeleteFamilyMember, GetBigFam, GetFamilyMembers, GetFamilyMembersById, } from "../../managers/familymanager.js";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { GetFamilyMembersByUserId } from "../../managers/userfamilymanager.js";

export const FamilyMembers = ({ loggedInUser }) => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [selectedFamilyId, setSelectedFamilyId] = useState('');
    const [allFamilies, setAllFamilies] = useState([]);
    const [filteredFamilyMembers, setFilteredFamilyMembers] = useState([]);
    const navigate = useNavigate();

    function GetFamilyMembersData() {
        GetFamilyMembersByUserId(loggedInUser.id).then((sortedData) => {
            setFamilyMembers(sortedData);
            const familyArray =[]
            sortedData.map((data) => {
                familyArray.push(data.family)
            })
            setAllFamilies(familyArray)
            const memberArray= []
            sortedData.map((data)=>{
                for(const member of data.family.familyMembers){
                    memberArray.push(member)
                }
            })
            setFilteredFamilyMembers(memberArray)
        });
    }

    // function fetchAllFamilies() {
    //     GetBigFam().then((data) => {
    //         const matchingFamilies = data.filter((fam) => fam.userId === loggedInUser.id);
    //         const familyIds = matchingFamilies.map((fam) => fam.familyId);
    //         const uniqueFamilyIds = [...new Set(familyIds)];
    //         const familiesToShow = data.filter((fam) => uniqueFamilyIds.includes(fam.id));
    //         setAllFamilies(familiesToShow);
    //     });
    // }
    

    useEffect(() => {
        GetFamilyMembersData();
        //fetchAllFamilies(); 
        // GetFamilyMembers().then((res)=>{
        //     setFilteredFamilyMembers(res.filter((m)=> {
        //         return m.lastName !== "Sayre"
        //     }))
        // });
    }, []);

    const handleDelete = (fm) => {
        DeleteFamilyMember(fm.id).then(() => {
            GetFamilyMembersData();
        });
    };

    const handleHighlight = (index) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index].highlight = !updatedFamilyMembers[index].highlight;
        setFamilyMembers(updatedFamilyMembers);
    };

    function filterFamilyMembers (familyId) {
        GetFamilyMembersByUserId(loggedInUser.id).then((sortedData) => {
            setFamilyMembers(sortedData);
            const memberArray= []
            sortedData.map((data)=>{
                for(const member of data.family.familyMembers){
                    if(member.familyId === familyId){
                        memberArray.push(member)
                    }
                }
            })
            setFilteredFamilyMembers(memberArray)
         } )    
        }


    if(!filteredFamilyMembers)return 

    return (
        <div>
            <select value={selectedFamilyId} onChange={(e) => filterFamilyMembers(parseInt(e.target.value))}>
                <option disabled value="">
                    Select Family
                </option>
                {allFamilies.map((f) => (
                    <option key={f.id} value={f.id}>
                        {f.surname}
                    </option>
                ))}
            </select>
            <h1 className="Family-Header">Your Family List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Gifts</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFamilyMembers.map((fm, index) => (
                        <tr key={fm.id}>
                            <td>{fm.firstName}</td>
                            <td>{fm.lastName}</td>
                            <td>{fm.address}</td>
                            <td style={{ color: fm.highlight ? 'red' : 'black' }}>{fm.giftName}</td>
                            <td>
                                <Button onClick={() => handleDelete(fm)}>Delete</Button>
                                <Button onClick={() => navigate(`/edit-member/${fm.id}`)}>Edit</Button>
                                <Button onClick={() => handleHighlight(index)}>
                                    {fm.highlight ? 'Sorry, Did Not Buy' : 'Bought'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyMembers;



