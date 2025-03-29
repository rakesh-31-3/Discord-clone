export const isAuthenticated = () => {
  const token = document.cookie.includes("token=");
  console.log(token);
  return token;
};
