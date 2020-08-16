var dict = new Object();

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
async function getRooms() {
  var allRooms = [];
  var response = await fetch(url, { method: 'GET', headers: headers });
  var data = await response.json();
  for (i = 0; i < data.rooms.length; i++) {
    var currRoom = data.rooms[i];
    var return_arr = [];
    var part_response = await fetch(currRoom.links.participants, {
      method: 'GET',
      headers: headers,
    });
    var part_json = await part_response.json();

    var part_arr = part_json.participants;
    for (j = 0; j < part_arr.length; j++) {
      if (part_arr[j].status === 'connected') {
        var stringArray = part_arr[j].identity.split(' ');
        return_arr.push(new Participant(stringArray[0], stringArray[1]));
      }
    }
    dict[currRoom.unique_name] = return_arr;
    allRooms.push(
      new Room(currRoom.unique_name, currRoom.status, currRoom.max_participants)
    );
  }

  displayPartData(allRooms);
}

function displayPartData(allRooms) {
  for (i = 0; i < allRooms.length; i++) {
    if (allRooms.length != 0) {
      console.log(
        'Participant Count for Room ' +
          allRooms[i].room_name +
          ': ' +
          dict[allRooms[i].room_name].length +
          '/' +
          allRooms[i].max_count
      );
      var room_name = allRooms[i].room_name;
      var volume =
        dict[allRooms[i].room_name].length + '/' + allRooms[i].max_count;
      var percentage =
        (100 * dict[allRooms[i].room_name].length) / allRooms[i].max_count;
      var HTML =
        '<tr><td>Kevin Wang</td><td>Junior</td><td>Computer Science</td><td>CSE333, CSE473, ECON300, AMATH383, MATH407</td><td>Taipei, Taiwan</td></tr>';
      var box = document.getElementById('box');
      box.innerHTML = HTML + box.innerHTML;
    }
  }
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
  }
}
