const levelToExperiece = (level) =>
  10 + 10 * level + Math.floor(20 * level ** 2);
const test = [1, 2, 3, 4, 5, 10, 11, 15, 20];

export default function handler({ res, req }) {
  test.forEach((e) => {
    console.log(e, levelToExperiece(e));
  });
}
