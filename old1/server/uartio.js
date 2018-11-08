console.log('uart io loaded')

import uartio from 'serialport'
//uartio = require('serialport')
import async from 'async'


//리스트 얻기
uartio.list(function (err, ports) {
  ports.forEach(function(port) {

    console.log(port);
    /*console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);*/
  });
});