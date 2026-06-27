export interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ProfileErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
}

export const validatePasswordUpdate = (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): PasswordErrors => {
  const errors: PasswordErrors = {};

  if (!currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required';
  } else if (newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateProfile = (data: {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string;
}): ProfileErrors => {
  const errors: ProfileErrors = {};

  if (!data.firstName) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (data.phoneNumber && !/^\+?[\d\s-]{10,}$/.test(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  if (!data.department) {
    errors.department = 'Department is required';
  }

  return errors;
};