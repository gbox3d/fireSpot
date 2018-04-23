## fire spot

meteor 를 응용해서 만들어본 IOT 프레임워크 입니다.
<br>

##### 서버측 중요코드

``` js


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


```

몽고디비에 있는 port01 에 값을 갱신합니다. 콜랙션 이름은 ColStatus 입니다.  