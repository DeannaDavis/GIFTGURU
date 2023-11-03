const _apiUrl = "/api/family/user";

export const GetFamiliesByUserId = (userId) => {
    return fetch(`${_apiUrl}/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching families:', error);
            throw error;
        });
};

export const GetFamilyMembersByUserId = (userId) => {
    return fetch(`api/family/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching families:', error);
            throw error;
        });
};

