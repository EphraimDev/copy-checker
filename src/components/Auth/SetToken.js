export const setToken = (token, firstname, lastname) => {
    localStorage.setItem('x-access-token', token);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname)
} 