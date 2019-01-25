let subjectsIt = {
    1: ["Applied Mathematics", "Applied Physics", "Engineering Graphics", "English", "Programming in C"],
    2: ["Applied Mathematics", "Applied Physics", "Fundamentals of Computer Science and Technology", "Science, Technology & Society", "Basic Electrical Engineering", "Basic Mechanical Engineering"],
    3: ["Computer Organization", "Object Oriented Programming", "Data Structures & Algorithms", "Database Management System", "Digital Electronics", "Economics"],
    4: ["Management Information System", "Operating System", "Computer Networks", "Digital and Data Communication", "System Analysis and Design", "Human Computer Interaction"],
    5: ["Software Engineering", "Computer Graphics", "Analysis & Design of Algorithms", "Visual Programming", "Microprocessor", "Discrete Structures"],
    6: ["Object Oriented Software Engineering", "Web Technology", "Artificial Intelligence", "Computer Network Management", "Parallel Computing", "Core Java"],
    7: ["Natural Language Processing", "Modeling & Simulations", "e-Commerce & ERP", "Advance Java", "Wireless communication", "Professional Elective"],
    8: ["Multimedia Technology", "Information Systems Security", "Data Warehouse and Data Mining", "Open Elective", "Professional Elective"]
}
let semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
$(document).ready(function () {

    const config = {
        apiKey: "AIzaSyB1KU4uBhahk89s_B8D2oydmKa23994B8c",
        authDomain: "campusbuddy-dd715.firebaseapp.com",
        databaseURL: "https://campusbuddy-dd715.firebaseio.com/",
        projectId: "campusbuddy-dd715"
    };

    firebase.initializeApp(config);

    let id = null


    $('#assignmentList').on('click','.assignmentClick',function() {
        id = $(this).attr('id');
        $('.modal').addClass('is-active')

    })

    $('#submitRollNo').click(function(){
        if(id){
        let $this = $(this)
        $this.addClass("is-loading")
        firebase.database().ref(`assignment/${$('#dropBranch').val().toUpperCase()}/${$('#dropSem').val()}/${id}/submitted`).push({
          rollno: $('#rollNo').val()
        },error => {
            if (error) {
                alert(error)
                $this.removeClass("is-loading")                 
              } else {
                  alert("sucess")
                $this.removeClass("is-loading")
              }
        });
    }
    })


    $('.closeAttendance').click(function () {
        $('.modal').removeClass('is-active')
    })


})




let changeBranch = value => {

    if (value === "it" || value === "cse") {
        let options = `<option value="" disabled selected>Select</option>`
        semesters.forEach((element, index) => {
            options += `<option value="${index+1}">${element}</option>`
        })
        $("#dropSem").html(options);
    }
}


let changeSem = value => {

    

    let branch = $('#dropBranch').val()

    let array = branch === "it" ? subjectsIt[value] : subjectsCse[value]

   
    
    let options = `<option value="" disabled selected>Select</option>`
    array.forEach((element, index) => {
        options += `<option value="${element}">${element}</option>`
    })
    $("#dropSub").html(options);
}

let changeSubAttendance = value => {
    let subject = value
    let branch = $('#dropBranch').val().toUpperCase()
    let sem = $('#dropSem').val()
   
    let list = ``

    
    firebase.database().ref(`/assignment/${branch}/${sem}`).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          
            
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
            if(childData.subject === subject){
          list += ` <div class="column">
          <li >
          <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      ${childData.subject}
    </p>
            
  </header>
  <div class="card-content">
    <div class="content">
     ${childData.assignmentDetails}
    </div>
  </div>
  <footer class="card-footer">
    <a id="${childKey}"  href="#" class="assignmentClick card-footer-item">Submit Assignment</a>
  </footer>
</div>
          </li>
          </div>` 
            }
          // ...
        });

        $('#assignmentList').html(list)
      });


}