const starkbank = require('../starkbank');
const user = require('./utils/user').exampleProject;
const generateExampleBoletosJson = require('./utils/boleto.js').generateExampleBoletosJson;


(async () => {
    let boletos = generateExampleBoletosJson(5);
    boletos = await starkbank.boleto.create(boletos, user);
    console.log(boletos)
    // for (let i of boletos){
    //     console.log(boleto)
    // }
    // boleto = await starkbank.boleto.get('6573629986832384', user)
    // console.log(boleto)
})();
//
//
// for (let boleto of boletos) {
//     console.log(boleto);
// }
// boletos = starkbank.boleto.query();
//
// for (let boleto of boletos) {
//     console.log(boleto);
// }