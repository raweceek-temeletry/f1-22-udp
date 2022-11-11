import {F122UDP} from '../src/F1_22_UDP.js';


const f122 = new F122UDP({address: "192.168.88.114"});
f122.start();

f122.on("participants",data => {
  var header = data.m_header;
var playerIndex = data.m_header.m_playerCarIndex;
var player = data.m_participants[playerIndex];
console.log(player);

});


// ony for library development purposes
// process exit on ctrl+c
process.on('SIGINT', () => {
    process.exit(1);
});