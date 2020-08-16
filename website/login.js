// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-analytics.js"></script>

// <script>
//     const firebase = require("firebase");
//     // Required for side-effects
//     require("firebase/firestore");

//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCIgPcCzPLI5LJdkEoOOohcpHd08f1hDU0",
//     authDomain: "hack20-286507.firebaseapp.com",
//     databaseURL: "https://hack20-286507.firebaseio.com",
//     projectId: "hack20-286507",
//     storageBucket: "hack20-286507.appspot.com",
//     messagingSenderId: "43543634063",
//     appId: "1:43543634063:web:084edd5156dab9b92510fa",
//     measurementId: "G-Q94P3TCT6D"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>





var db = firebase.firestore();


var user_email = 'kw@gmail.com';
var password = '123456';

var first_name = 'Kevin';
var last_name = 'Wang';
var field_of_study = 'Computer Science';
var class_standing = 'Junior';
var class_taking = ['CSE 142', 'FIN 451'];
var country_from = 'Taipei, Taiwan';


function signUp(user_email, password, first_name, last_name) {
    firebase.auth().createUserWithEmailAndPassword(user_email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });

    // store user data to firestore
    db.collection('AllUsers').doc(user_email).set({
        first_name: first_name,
        last_name: last_name,
        field_of_study: field_of_study,
        class_standing: class_standing,
        country_from: country_from,
        class_taking: class_taking
    })
}

function logIn(user_email, password) {
    firebase.auth().signInWithEmailAndPassword(user_email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });

    // fetch user data from firestore
    var userDoc = db.collection('AllUsers').doc(user_email);
    userDoc.get().then(function(doc) {
        if (doc !== null && doc.exists) {
            first_name = doc.get(first_name);
            last_name = doc.get(last_name);
            field_of_study = doc.get(field_of_study);
            class_standing = doc.get(class_standing);
            class_taking = doc.get(class_taking);
            country_from = doc.get(country_from);
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}