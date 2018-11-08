import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //포트가 없으면
  if(ColStatus.find({name:'port01'} ).count() == 0 ) {
    ColStatus.insert({name:'port01',val:0})
    console.log('port01 created')
  }
  else {
    console.log('port01 already created')
    console.log(ColStatus.find({name:'port01'} ).fetch())
  }

});

Meteor.methods( {
    'port01/write' : function (obj) {

      console.log('write port01 ' + obj.val)

      ColStatus.update({name:'port01'},
        {
          $set : {val:obj.val}
        }
        );


      return {err:false}

    }

  }

)

