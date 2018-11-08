import { Meteor } from 'meteor/meteor';

import '../lib/collections'

const dgram = require( "dgram" );
const udp_socket = dgram.createSocket( "udp4" );

const udpDataPort = 2012

let workSensorData

Meteor.startup(() => {
  console.log('version 0.01')
  // code to run on server at startup

  udp_socket.on( "message", Meteor.bindEnvironment(( msg, rinfo )=> {

    //console.log( 'remote :' + rinfo.address + ':' + rinfo.port + ' - ' + msg );

    let _packet = msg.toString()
    let __ = _packet.split('}')


    let _jsonObj = JSON.parse(__[0] + '}')

    _jsonObj.at = new Date()

    workSensorData = _jsonObj
    console.log(workSensorData)
    sensorData.insert(workSensorData)

  }));

  udp_socket.bind(udpDataPort,function () {
    console.log('bind success : ' + udpDataPort)
  } );

});

