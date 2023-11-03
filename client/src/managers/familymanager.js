const _apiUrl = "/api/familymembers"

export const GetFamilyMembers = () => {
    return fetch(_apiUrl).then((res)=>res.json())
}

export const DisplayGifts = (memberId) => {
    const apiUrl = `/api/familymembers/${memberId}`;

    return fetch(apiUrl)
        .then((res) => res.json())
        .catch((error) => console.error('Error fetching gifts:', error));
};


export const GetFamilyMembersById = (id) => {
    return fetch(`${_apiUrl}/${id}`)
    .then((res) => res.json())

};

export const GetBigFam = () => {
    const apiUrl = `/api/groupfamily`;
    return fetch(apiUrl)
    .then((res)=> res.json())
}

export const GetAllFamilies = () => {
    const apiUrl = `/api/family`;
    return fetch(apiUrl)
    .then((res) => res.json())
}

export const AddFamilyMembers = async ( FamilyMembersData  ) => {

    try {
        const response = await fetch("/api/FamilyMembers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FamilyMembersData),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error adding Family Members on response");
        }
        console.log("Family Members added successfully");
        return response;

    } catch (error) {
        console.error("Error adding Family Members: " + error);
    }
};

export const EditFamilyMember = async (id, FamilyMembersData) => {
    try {
        const response = await fetch(`${_apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FamilyMembersData),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Error updating Family Member on response");
        }
        console.log("Family Member updated successfully");
        return response;
    } catch (error) {
        console.error("Error updating Family Member: " + error);
    }
};


export const DeleteFamilyMember = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                console.log(`Family Member was deleted successfully.`);
            } else {
                throw new Error(`Error deleting Family Members.`);
            }
        })
        .catch((error) => {
            console.error("Network error: " + error);
        });
};
