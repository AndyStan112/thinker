import { signIn } from 'next-auth/react';

export const getTotalExperienceNeeded = (level: number) =>
  30 * Math.floor(level ** 2.3);
export const getCurrentExperienceNeeded = (level: number) =>
  getTotalExperienceNeeded(level) - getTotalExperienceNeeded(level - 1);
export const getCurrentExperiece = (level: number, totalExperience: number) => {
  totalExperience - getTotalExperienceNeeded(level - 1);
};
