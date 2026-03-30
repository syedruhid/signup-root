const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
};

export function passwordsMatchAndValid(newPassword: string, confirmPassword: string): boolean {
  return (
    newPassword.length > 0 &&
    isStrongPassword(newPassword) &&
    newPassword === confirmPassword
  );
};
