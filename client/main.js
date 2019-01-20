
$(document).ready(function () {
    
    var config = {
        apiKey: "AIzaSyB1KU4uBhahk89s_B8D2oydmKa23994B8c",
        authDomain: "campusbuddy-dd715.firebaseapp.com",
        databaseURL: "https://campusbuddy-dd715.firebaseio.com/",
        projectId: "campusbuddy-dd715"
      };
    firebase.initializeApp(config);

      $('#noticeSubmit').click(function() {
        firebase.database().ref(`notice/${$('#dropBranch').val().toUpperCase()}/${$('#dropSem').val()}`).push({
          title: $('#noticeTitle').val(),
          body: $('#noticeBody').val()
        });
          })


          $('#assignSubmit').click(function(){
            firebase.database().ref(`assignment/${$('#dropBranch').val().toUpperCase()}/${$('#dropSem').val()}`).push({
                subject: $('#dropSub').val(),
                assignmentDetails: $('#assignDetail').val(),
                date: $('#date').val()
            });
          })

          $('#testSubmit').click(function(){
            firebase.database().ref(`test/${$('#dropBranch').val().toUpperCase()}/${$('#dropSem').val()}`).push({
                subject: $('#dropSub').val(),
                testDetails: $('#testDetails').val(),
                date: $('#date').val()
            });
          })

});


let semesters = ["1st" , "2nd" , "3rd" , "4th" , "5th" , "6th" , "7th" , "8th"]

let subjectsIt = {
    1:["Applied Mathematics","Applied Physics","Engineering Graphics","English","Programming in C"],
    2:["Applied Mathematics","Applied Physics","Fundamentals of Computer Science and Technology","Science, Technology & Society","Basic Electrical Engineering","Basic Mechanical Engineering"],
    3:["Computer Organization","Object Oriented Programming","Data Structures & Algorithms","Database Management System","Digital Electronics","Economics"],
    4:["Management Information System","Operating System","Computer Networks","Digital and Data Communication","System Analysis and Design","Human Computer Interaction"],
    5:["Software Engineering","Computer Graphics","Analysis & Design of Algorithms","Visual Programming","Microprocessor","Discrete Structures"],
    6:["Object Oriented Software Engineering","Web Technology","Artificial Intelligence","Computer Network Management","Parallel Computing","Core Java"],
    7:["Natural Language Processing","Modeling & Simulations","e-Commerce & ERP","Advance Java","Wireless communication","Professional Elective"],
    8:["Multimedia Technology","Information Systems Security","Data Warehouse and Data Mining","Open Elective","Professional Elective"]
}

let subjectsCse = {
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[]
}

let changeBranch = value => {
    if(value === "it" || value === "cse"){
        let options= `<option value="" disabled selected>Select</option>`
        semesters.forEach((element,index)  => {
            options += `<option value="${index+1}">${element}</option>`
        })
        $("#dropSem").html(options);
    }
}

let changeSem = value => {
    
 let branch = $('#dropBranch').val()

 let array = branch ===  "it" ? subjectsIt[value] : subjectsCse[value]
 

 let options= `<option value="" disabled selected>Select</option>`
 array.forEach((element,index)  => {
     options += `<option value="${element}">${element}</option>`
 })
 $("#dropSub").html(options);
}