var dict = new Object();

const username = 'AC74ef2d1e4d27646ccbe4f55653abd18f';
const password = '118138ce318de7de1e387e402c5f1822';
const param = username + ':' + password;
let url = 'https://video.twilio.com/v1/Rooms?Status=in-progress&PageSize=20';
let headers = new Headers();
<<<<<<< HEAD
headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
=======
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// setInterval(getRooms, 1500);

>>>>>>> 27860440872fc3e59741a8c580746bd528911f18

// setInterval(getRooms, 1500);
getRooms();
var HTMLtemplate =
  '<div class="col-xl-3 col-md-6 mb-4"><a href="participants.html"><div class="card border-left-info shadow h-100 py-2"><div class="card-body h-100"><div class="row no-gutters align-items-center h-100"><div class="col mr-2 h-100 d-flex flex-column justify-content-between"><div class="text-lg font-weight-bold text-info my-2 text-center">Room Name:<span class="h1 font-weight-bold">Business</span></div><div><div class="h5 mb-2 mt-3 font-weight-bold text-gray-800 text-center">Capacity: 18/50</div><div class="progress"><div class="progress-bar bg-info progress-bar-striped progress-bar-animated"style="width: 48%;"></div></div></div></div></div></div></div></a></div>';
var colors = 'dark,success,info,warning,danger,primary';
var colorsArr = colors.split(',');
var colorIndex = 0;
async function getRooms() {
  var allRooms = [];
  var response = await fetch(url, { method: 'GET', headers: headers });
  var data = await response.json();
  var room_count = data.rooms.length;
  for (i = 0; i < data.rooms.length; i++) {
    console.log('i: ' + i);
    var currRoom = data.rooms[i];

    var return_arr = [];
    var part_response = await fetch(currRoom.links.participants, {
      method: 'GET',
      headers: headers,
    });
    var part_json = await part_response.json();
    console.log(part_json);

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
    console.log('allRooms counts: ' + allRooms.length);
  }

  console.log('before displayRoomData()');
  displayRoomData(allRooms);
}

function displayRoomData(allRooms) {
  console.log('display data...:' + allRooms.length);
  for (i = 0; i < allRooms.length; i++) {
    console.log(allRooms[i]);
    if (allRooms.length != 0) {
      console.log(dict[allRooms[i].room_name]);
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
      var color = colorsArr[colorIndex];
      colorIndex = (colorIndex + 1) % 6;
      var percentage =
        (100 * dict[allRooms[i].room_name].length) / allRooms[i].max_count;
      var HTML =
        '<div class="col-xl-3 col-md-6 mb-4"><a href="participants.html"><div class="card border-left-' +
        color +
        ' shadow h-100 py-2"><div class="card-body h-100"><div class="row no-gutters align-items-center h-100"><div class="col mr-2 h-100 d-flex flex-column justify-content-between"><div class="text-lg font-weight-bold text-' +
        color +
        ' my-2 text-center">Room Name:<br><span class="h1 font-weight-bold">' +
        room_name +
        '</span></div><div><div class="h5 mb-2 mt-3 font-weight-bold text-gray-800 text-center">Occupancy: ' +
        volume +
        '</div><div class="progress"><div class="progress-bar bg-' +
        color +
        ' progress-bar-striped progress-bar-animated"style="width: ' +
        percentage +
        '%;"></div></div></div></div></div></div></div></a></div>';
      var box = document.getElementById('room-container');
      box.innerHTML = HTML + box.innerHTML;
    }
  }
  allRooms = [];
  dict = {};
  console.log(allRooms);
  console.log(dict);
  displayRoomData(room_count, allRooms);
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
