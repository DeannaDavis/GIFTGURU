const _apiUrl = "/api/userprofile"

export const GetUserProfile = (id) => {
    return fetch(`${_apiUrl}/profile/${id}`)
}