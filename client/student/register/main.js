$(document).ready(function () {

    const config = {
        apiKey: "AIzaSyB1KU4uBhahk89s_B8D2oydmKa23994B8c",
        authDomain: "campusbuddy-dd715.firebaseapp.com",
        databaseURL: "https://campusbuddy-dd715.firebaseio.com/",
        projectId: "campusbuddy-dd715"
    };

    firebase.initializeApp(config);


    $('#submit').click(function(){

        let name = $('#name').val()
        let rollNo = $('#rollNo').val().toString()
        let email = $('#email').val()
        let branch = $('#branch').val().toString()
        let sem = $('#sem').val().toString()

       if(name && rollNo && email && branch && sem){
          
        let $this = $(this)
        $this.addClass("is-loading");

        firebase.auth().createUserWithEmailAndPassword(email, "password").then(response => {
            if(response.user.uid){
                firebase.auth().currentUser.updateProfile({
                    displayName: name
                })
                console.log(response.user.uid);
                firebase.database().ref("users/"+response.user.uid).set({
                    branch: branch,
                    semester:sem,
                    rollNo: rollNo
                 });
                 $this.removeClass("is-loading")  
            }
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert('failed')
            $this.removeClass("is-loading")  
            // ...
          });
           
       }
        

    })

});