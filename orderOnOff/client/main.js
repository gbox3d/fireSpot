import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

let _templete = Template.controlPanel;

let devicesList = new ReactiveVar()

_templete.onCreated(function () {

  Meteor.call('device/list',{},(err,_)=>{
      console.log(err,_)

    let _list = []
    for(var key in _.devices) {
      console.log(key)
      _list.push({
        _id : key,
        info : _.devices[key]
      })
    }

    devicesList.set(_list);

    }
  )



})

_templete.onRendered(function () {


})



_templete.events({

  "click .powerOn"(evt,instance) {

    let _devId = instance.find('.devices select').value

    Meteor.call('gpio/write',{
        port:3,
        val:1,
        deviceId:_devId
      },
      (err,_)=> {
        console.log(_)
    })

  },
  "click .powerOff"(evt,instance) {

    let _devId = instance.find('.devices select').value

    Meteor.call('gpio/write',
      {
        port:3,val:0,
        deviceId : _devId
      },
      (err,_)=> {
        console.log(_)

      }
      )
  }

})

_templete.helpers({
  "devicesList"() {

    console.log(devicesList.get())
    return devicesList.get()
  }

})