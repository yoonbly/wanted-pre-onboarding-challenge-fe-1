const emailValid = (email: string) => {
  const isEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return isEmail.test(email);
};
const passwordValid = (password: string) => {
  const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g;
  return isPassword.test(password);
};

export { emailValid, passwordValid };
