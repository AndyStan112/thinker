import { totalExperienceAtom } from "./atoms";
import { levelToExp } from "./constants";
export const getTotalExperienceNeeded = (level: number) => levelToExp[level];
export const getCurrentExperienceNeeded = (totalExperience: number) => {
  const level = getLevel(totalExperience);
  return level ? levelToExp[level] - levelToExp[level - 1] : levelToExp[0];
};
export const getCurrentExperiece = (totalExperience: number) => {
  const level = getLevel(totalExperience);
  return totalExperience - getTotalExperienceNeeded(level - 1);
};
export const getLevel = (totalExperience: number) =>
  levelToExp.findIndex((experience) => experience > totalExperience);

//const getTotalExperienceNeeded = (level) => 15 +25 * Math.floor(level ** 2);
export const getExpFromDiff = (totalExperience: number, difficulty: number) =>
  Math.ceil(
    (getCurrentExperienceNeeded(totalExperience) *
      (difficulty + 1) *
      1.17 ** difficulty) /
      30
  );

export const isInRange = (date, startDate, endDate) => {
  if (startDate.getTime() == endDate.getTime()) {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    console.log(new Date(date).getTime(), new Date(startDate).getTime());
    return (
      (new Date(date).getTime() >= new Date(startDate).getTime() )&&
      (new Date(date).getTime() < nextDay.getTime())
    );
  } else {
    console.log("colo");
    return (
      new Date(date).getTime() <= new Date(endDate).getTime() &&
      new Date(date).getTime() >= new Date(startDate).getTime()
    );
  }
};
