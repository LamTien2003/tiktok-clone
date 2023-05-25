export const setTokens = (tokens) => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
};
export const getTokens = () => JSON.parse(localStorage.getItem('tokens') || null);
export const deleteToken = () => localStorage.removeItem('tokens');
