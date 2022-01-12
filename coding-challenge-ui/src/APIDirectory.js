const baseUrl = `http://localhost:8080`;

export const getSales = (statusValue) => { return `${baseUrl}/sales?status=${statusValue}` }