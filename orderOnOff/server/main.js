import { Meteor } from 'meteor/meteor';


const dgram = require( "dgram" );
const udp_socket = dgram.createSocket( "udp4" );

const udpDataPort = 2013

var theApp = {
  remote : {}

}
global.theApp = theApp

theApp.remote = {
  devices : {}

}

Meteor.startup(() => {
  // code to run on server at startup

  console.log('version 0.01')
  // code to run on server at startup

  udp_socket.on( "message", Meteor.bindEnvironment(( msg, rinfo )=> {

    //console.log( 'remote :' + rinfo.address + ':' + rinfo.port + ' - ' + msg );
    try {
      let _obj = JSON.parse(msg)
      theApp.remote.devices[_obj._id] = {
        ip : rinfo.address,
        port : rinfo.port,
        lastSignalAt : new Date()
      }

    }
    catch (e) {

      console.log(e)

    }

    //theApp.remote.devices[] = rinfo;

  }));

  udp_socket.bind(udpDataPort,function () {
    console.log('bind success : ' + udpDataPort)
  } );


});

Meteor.methods({
  "gpio/write"({port,val,deviceId}) {
    if(theApp.remote.devices[deviceId]) {

      let _devObj = theApp.remote.devices[deviceId]

      let _cmd = {
        cmd: "eval",
        code: "gpio.write("+port +","+ val +")"
      }
      let _packet = JSON.stringify(_cmd)

      udp_socket.send(new Buffer(_packet), 0,
        _packet.length,
        _devObj.port,
        _devObj.address
      )
    }
    return {result:"ok"}
  },
  "device/list"() {
    //console.log('test')

    return {result: "ok",devices: theApp.remote.devices}
  }
})
