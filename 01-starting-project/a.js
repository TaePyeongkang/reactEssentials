function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];
console.log(reactDescriptions[genRandomInt(2)]);
