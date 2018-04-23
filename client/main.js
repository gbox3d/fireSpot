import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  //this.subscribe('ColStatus/all')
  let that = this;
  //https://docs.meteor.com/api/collections.html#Mongo-Cursor-observeChanges
  const cursor = ColStatus.find();
  const handle = cursor.observeChanges({
    added(id,fileds) {
      //서버쪽에서 추가하는 코드 : MsgLog.insert({text:'hello world'})
      console.log('observe add ' + id)
      that.counter.set(that.counter.get() + 1);

    },
    changed(id,fileds) {
      //MsgLog.update({_id:'xRrDwofPCwD8AZGjG'},{$set:{text:'hi'}})
      console.log('observe change ' + id)
    },
    removed(id) {
      //MsgLog.remove({})
      console.log('observe remove ' + id)
      that.counter.set(that.counter.get() - 1);
    }
  })


});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  'port01' : function () {
    return ColStatus.find({name:'port01'}).fetch()[0].val
  }
});

Template.hello.events({
  /*
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  */

  'click #btn-on' (event, instance) {

    Meteor.call('port01/write',{msg:'test',val:1},function (err,result) {

      console.log(result)

    })

  },
  'click #btn-off' (event, instance) {
    Meteor.call('port01/write',{msg:'test',val:0},function (err,result) {

      console.log(result)

    })

  }
});
