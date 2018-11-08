import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../lib/collections'
import './main.html';


Meteor.startup(function () {


  console.log('client start version 0.01')

  // window.dataGetTimerHandler =  Meteor.setInterval(function () {
  //     Meteor.call('add/sensorData')
  //   },
  //   5000)

})


let __templete = Template.mainView

__templete.onCreated(function () {



})

__templete.events({

})

__templete.helpers({
  "getSensorDataList"() {
    return sensorData.find({},
      {
        sort : {at : -1}
      })
  }

})