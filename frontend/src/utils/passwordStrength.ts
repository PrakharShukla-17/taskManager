export type PasswordStrength = 'weak' | 'moderate' | 'strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  checks: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function getPasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    length:    password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number:    /[0-9]/.test(password),
    special:   /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  let strength: PasswordStrength = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 2) strength = 'moderate';
  return { strength, score, checks };
}
