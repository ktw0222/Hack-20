// var db = firebase.firestore();
document
  .getElementById('user-reg')
  .addEventListener('submit', () => getAttributeswhenRegister());

function getAttributeswhenRegister() {
  var user_email = '';
  var password = '';

  var first_name = '';
  var last_name = '';
  var field_of_study = '';
  var class_standing = '';
  var class_taking = '';
  var country_from = '';
  var x = document.getElementById('user-reg');
  // First Name, Last Name, Class, Major, Classes, Home, Email, Password
  first_name = x.elements[0].value;
  last_name = x.elements[1].value;
  class_standing = x.elements[2].value;
  field_of_study = x.elements[3].value;
  class_taking = x.elements[4].value;
  var i = 0;
  var class_array = new Array();
  var index = 0;
  while (class_taking.length > i) {
    var c = '';
    while (class_taking.length > i && class_taking.charAt(i) != ',') {
      var char = class_taking.charAt(i);
      c += char;
      i++;
    }
    class_array[index] = c;
    index++;
  }
  country_from = x.elements[5].value;
  user_email = x.elements[6].value;
  password = x.elements[7].value;
  console.log(user_email);

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

function signUp(
  user_email,
  password,
  first_name,
  last_name,
  class_standing,
  field_of_study,
  class_taking,
  country_from
) {
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

  // store user data to firestore
  db.collection('AllUsers').doc(user_email).set({
    first_name: first_name,
    last_name: last_name,
    field_of_study: field_of_study,
    class_standing: class_standing,
    country_from: country_from,
    class_taking: class_taking,
  });
}

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

  // fetch user data from firestore
  var userDoc = db.collection('AllUsers').doc(user_email);
  userDoc
    .get()
    .then(function (doc) {
      if (doc !== null && doc.exists) {
        first_name = doc.get(first_name);
        last_name = doc.get(last_name);
        field_of_study = doc.get(field_of_study);
        class_standing = doc.get(class_standing);
        class_taking = doc.get(class_taking);
        country_from = doc.get(country_from);
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
}
