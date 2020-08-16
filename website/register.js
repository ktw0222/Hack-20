var firebaseConfig = {
  apiKey: 'AIzaSyCIgPcCzPLI5LJdkEoOOohcpHd08f1hDU0',
  authDomain: 'hack20-286507.firebaseapp.com',
  databaseURL: 'https://hack20-286507.firebaseio.com',
  projectId: 'hack20-286507',
  storageBucket: 'hack20-286507.appspot.com',
  messagingSenderId: '43543634063',
  appId: '1:43543634063:web:084edd5156dab9b92510fa',
  measurementId: 'G-Q94P3TCT6D',
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

console.log('hi');

document
  .getElementById('user-reg')
  .addEventListener('submit', getAttributeswhenRegister());

function getInputVal(id) {
  var a = document.getElementById(id).value;
  console.log(a);
  return a;
}
function getAttributeswhenRegister() {
  var user_email = getInputVal('Email');
  var password = getInputVal('Password');
  var first_name = getInputVal('FirstName');
  console.log(first_name);
  var last_name = getInputVal('LastName');
  var field_of_study = getInputVal('Major');
  var class_standing = getInputVal('Standing');
  var class_taking = getInputVal('Classes');
  var country_from = getInputVal('Home');

  if (user_email === '') {
    return;
  }
  //   var user_email = 'abcde@gmail.com';
  //   var password = '12345678';
  //   var first_name = '123';
  //   var last_name = '123';
  //   var field_of_study = '123';
  //   var class_standing = '123';
  //   var class_taking = 'CSE333, CSE473, ECON300';
  //   var country_from = '123';

  // First Name, Last Name, Class, Major, Classes, Home, Email, Password
  var i = 0;
  var class_array = class_taking.split(',');
  var index = 0;

  signUp(
    user_email,
    password,
    first_name,
    last_name,
    class_standing,
    field_of_study,
    class_array,
    country_from
  );
}

function signUp(user_email, password, fm, lm, cs, fos, ct, cf) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user_email, password)
    .catch(function (error) {
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
  console.log('halfway');
  // store user data to firestore
  db.collection('AllUsers')
    .doc(user_email)
    .set({
      first_name: fm,
      last_name: lm,
      field_of_study: fos,
      class_standing: cs,
      country_from: cf,
      class_taking: ct,
    })
    .then(function () {
      console.log('Status saved!');
    })
    .catch(function (error) {
      console.log(error);
    });
}
