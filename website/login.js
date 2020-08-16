var firebaseConfig = {
  apiKey: '*****',
  authDomain: 'hack20-286507.firebaseapp.com',
  databaseURL: 'https://hack20-286507.firebaseio.com',
  projectId: 'hack20-286507',
  storageBucket: 'hack20-286507.appspot.com',
  messagingSenderId: '43543634063',
  appId: '1:43543634063:web:084edd5156dab9b92510fa',
  measurementId: 'G-Q94P3TCT6D',
};
firebase.initializeApp(firebaseConfig);
console.log('hi');
var db = firebase.firestore();

document.getElementById('user').addEventListener('submit', function (e) {
  e.preventDefault();
  var user_email = getInputVal('email').trim();
  var password = getInputVal('password').trim();
  console.log('about to login');
  // logIn(user_email, password);
  logIn(user_email, password);
});

function getInputVal(id) {
  var a = document.getElementById(id).value;
  console.log(a);
  return a;
}

// function loginSetUp() {

//   var user_email = getInputVal('email').trim();
//   var password = getInputVal('password').trim();

//   console.log('about to login');
//   logIn(user_email, password);
// }

function logIn(user_email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(user_email, password)
    .catch(function (error) {
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

  console.log('half way');

  // fetch user data from firestore
  var userDoc = db.collection('AllUsers').doc(user_email);
  userDoc
    .get()
    .then(function (doc) {
      if (doc !== null && doc.exists) {
        first_name = doc.get('first_name');
        last_name = doc.get('last_name');
        field_of_study = doc.get('field_of_study');
        class_standing = doc.get('class_standing');
        class_taking = doc.get('class_taking');
        country_from = doc.get('country_from');

        // alert('hi');
        window.location.href = 'index.html';
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
}
