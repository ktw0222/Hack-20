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


const username = 'AC74ef2d1e4d27646ccbe4f55653abd18f';
const password = '118138ce318de7de1e387e402c5f1822';
const param = username + ':' + password;
let url = 'https://video.twilio.com/v1/Rooms?Status=in-progress&PageSize=20';
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
var id = localStorage.getItem('clickedRoom');
if (id === 'add') {
  document.getElementById('par-header').innerHTML +=
    'To create a new room, simply just enter a new room name!';
} else {
  document.getElementById('par-header').innerHTML += 'Welcome to Room: ' + id;
}
getRooms();
var HTMLtemplate = '';

var participants_arr = [];

async function getRooms() {
  var response = await fetch(url, { method: 'GET', headers: headers });
  var data = await response.json();
  for (i = 0; i < data.rooms.length; i++) {
    var currRoom = data.rooms[i];


    if (currRoom.unique_name === id) {
      var part_response = await fetch(currRoom.links.participants, {
        method: 'GET',
        headers: headers,
      });
      var part_json = await part_response.json();

      var part_arr = part_json.participants;
      for (j = 0; j < part_arr.length; j++) {
        if (part_arr[j].status === 'connected') {
          var stringArray = part_arr[j].identity.split(' ');
          participants_arr.push(new Participant(stringArray[0], stringArray[1]));
        }
      }
      break;
    }
  }
  console.log(participants_arr);
  displayPartData();
}

function displayPartData() {

  for (i = 0; i < participants_arr.length; i++) {
    var first_name = '';
    var last_name = '';
    var field_of_study = '';
    var class_standing = '';
    var class_taking = '';
    var country_from = '';

    var userDoc = db.collection('AllUsers').doc(participants_arr[i].email);
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

        console.log(first_name);
        console.log(last_name);
        console.log(field_of_study);
        console.log(class_standing);
        console.log(class_taking);
        console.log(country_from);

      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
  }


  // var userDoc = db.collection('AllUsers').doc(user_email);
  // userDoc
  //   .get()
  //   .then(function (doc) {
  //     if (doc !== null && doc.exists) {
  //       first_name = doc.get('first_name');
  //       last_name = doc.get('last_name');
  //       field_of_study = doc.get('field_of_study');
  //       class_standing = doc.get('class_standing');
  //       class_taking = doc.get('class_taking');
  //       country_from = doc.get('country_from');

  //       // alert('hi');
  //       window.location.href = "index.html";
  //     } else {
  //       console.log('No such document!');
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log('Error getting document:', error);
  //   });


  var HTML =
    '<tr><td>Kevin Wang</td><td>Junior</td><td>Computer Science</td><td>CSE333, CSE473, ECON300, AMATH383, MATH407</td><td>Taipei, Taiwan</td></tr>';
  var box = document.getElementById('box');
  box.innerHTML = HTML + box.innerHTML;







  
  // for (i = 0; i < allRooms.length; i++) {
  //   if (allRooms.length != 0) {
  //     console.log(
  //       'Participant Count for Room ' +
  //         allRooms[i].room_name +
  //         ': ' +
  //         dict[allRooms[i].room_name].length +
  //         '/' +
  //         allRooms[i].max_count
  //     );
  //     var room_name = allRooms[i].room_name;
  //     var volume =
  //       dict[allRooms[i].room_name].length + '/' + allRooms[i].max_count;
  //     var percentage =
  //       (100 * dict[allRooms[i].room_name].length) / allRooms[i].max_count;
  //     var HTML =
  //       '<tr><td>Kevin Wang</td><td>Junior</td><td>Computer Science</td><td>CSE333, CSE473, ECON300, AMATH383, MATH407</td><td>Taipei, Taiwan</td></tr>';
  //     var box = document.getElementById('box');
  //     box.innerHTML = HTML + box.innerHTML;
  //   }
  // }
}

class Room {
  constructor(room_name, status, max_count) {
    this.room_name = room_name;
    this.status = status;
    this.max_count = max_count;
  }
}

class Participant {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    // this.first_name = '';
    // this.last_name = '';
    // this.field_of_study = '';
    // this.class_standing = '';
    // this.class_taking = '';
    // this.country_from = '';
  }


}
