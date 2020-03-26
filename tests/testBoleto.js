const starkbank = require('../starkbank');
const exampleProject = require('./utils/user').exampleProject;
const generateExampleBoletosJson = require('./utils/boleto').generateExampleBoletosJson;
const user = exampleProject


setTimeout(() => {
    boleto = starkbank.boleto.get('6573629986832384', user)
    console.log(1)
    console.log(boleto)
    console.log(2)
}, 4000);

let boletos = generateExampleBoletosJson(n = 5);
boletos = starkbank.boleto.create(boletos, user);

for (let boleto of boletos) {
    console.log(boleto);
}
boletos = starkbank.boleto.query();

for (let boleto of boletos) {
    console.log(boleto);
}