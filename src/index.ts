// import dotenv from "dotenv";

// dotenv.config();
// const port = process.env.PORT || 3000;

// import api from './routes/api';

// api.listen(port, () => {
//   console.log(`[server]: Server running on *:${port}`);
// });

const fs = require("fs");


import blocosDerua from "./crawler/blocosDeRuaBh";

(async () => {
  const blocos = await blocosDerua();
  // create CSV file

  const SEPARATOR = ',';

  let csv =  ['Nome', 'Data', 'Hora', 'Endereço', 'Link'].join(SEPARATOR) + '\n';
  csv += blocos?.map(bloco => {
    // sanitize
    return [`"${bloco.title}"`, bloco.date, bloco.time, `"${bloco.address}"`, `"${bloco.link}"`].join(SEPARATOR);
  }).join('\n');

  fs.writeFileSync('./blocos.csv', csv);
  
})();

