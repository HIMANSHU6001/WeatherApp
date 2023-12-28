// Task 1
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake'];
const logDiary = (array) => {
    for (const i of array) {
        console.log(i);
    }
}
// Task 2
const animal = {
  canJump: true
};

const bird = Object.create(animal);

bird.canFly = true;

bird.hasFeathers = true;

const birdcan = (obj) => {
    for (const i of Object.keys(obj)) {
        console.log(`${i}: ${obj[i]}`);
    }
}
// Task 3
const animalcan = (obj) => {
  for (const key in obj) {
      console.log(`${key}: ${obj[key]}`);
  }
}
// logDiary(dairy);
// birdcan(bird);
animalcan(bird);