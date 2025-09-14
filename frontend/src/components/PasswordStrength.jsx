import React from 'react';

const PasswordStrength = ({ password }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;
    let feedback = [];

    if (pwd.length >= 8) {
      strength += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(pwd)) {
      strength += 1;
    } else {
      feedback.push('Lowercase letter');
    }

    if (/[A-Z]/.test(pwd)) {
      strength += 1;
    } else {
      feedback.push('Uppercase letter');
    }

    if (/\d/.test(pwd)) {
      strength += 1;
    } else {
      feedback.push('Number');
    }

    if (/[@$!%*?&]/.test(pwd)) {
      strength += 1;
    } else {
      feedback.push('Special character');
    }

    return { strength, feedback };
  };

  const { strength, feedback } = calculateStrength(password);
  
  const getStrengthLabel = () => {
    if (strength <= 1) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthClass = () => {
    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'fair';
    if (strength <= 4) return 'good';
    return 'strong';
  };

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div 
          className={`strength-fill ${getStrengthClass()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
      <div className="strength-info">
        <span className={`strength-label ${getStrengthClass()}`}>
          {getStrengthLabel()}
        </span>
        {feedback.length > 0 && (
          <div className="strength-feedback">
            Missing: {feedback.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;