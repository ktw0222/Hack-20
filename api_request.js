var allRooms = [];
const username = 'AC74ef2d1e4d27646ccbe4f55653abd18f';
const password = '55def9e66fc6fd145bce654977d55fce';
const param = username + ':' + password;
let url = 'https://video.twilio.com/v1/Rooms?Status=in-progress&PageSize=20';
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));


getRooms();



async function getRooms() {
    var response = await fetch(url, {method:'GET', headers: headers});
    var data = await response.json();

    for (i = 0; i < data.rooms.length; i++) {
        var currRoom = data.rooms[i];
        allRooms.push(new Room(currRoom.unique_name, currRoom.status, currRoom.links.participants))
    }
    displayRoomData();
}

function displayRoomData() {
    console.log('display data...');
    console.log(allRooms)
    allRooms = [];
}


function get_participant_data() {
    for (i = 0; i < allRooms.length; i++) {
        
    }
}







class Room {
    constructor(room_name, status, participant_link) {
        this.room_name = room_name;
        this.status = status;
        this.participant_link = participant_link;
    }
}