var allRooms = [];
var dict = new Object();

const username = 'AC74ef2d1e4d27646ccbe4f55653abd18f';
const password = '118138ce318de7de1e387e402c5f1822';
const param = username + ':' + password;
let url = 'https://video.twilio.com/v1/Rooms?Status=in-progress&PageSize=20';
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// setInterval(getRooms, 1500);


async function getRooms() {
    var response = await fetch(url, {method:'GET', headers: headers});
    var data = await response.json();

    for (i = 0; i < data.rooms.length; i++) {
        var currRoom = data.rooms[i];
        

        var return_arr = [];
        var part_response = await fetch(currRoom.links.participants, {method:'GET', headers: headers});
        var part_json = await part_response.json();

        var part_arr = part_json.participants;
        for (i = 0; i < part_arr.length; i++) {
            if (part_arr[i].status === 'connected') {
                var stringArray = part_arr[i].identity.split(/(\s+)/);
                return_arr.push(new Participant(stringArray[0], stringArray[1]));
            }
        }
        dict[currRoom.unique_name] = return_arr;
        allRooms.push(new Room(currRoom.unique_name, currRoom.status, currRoom.max_participants));
    }
    displayRoomData();
}

function displayRoomData() {
    console.log('display data...');

    for (i = 0; i < allRooms.length; i++) {
        console.log(allRooms[i]);

        if (allRooms.length != 0){
            console.log(dict[allRooms[i].room_name]);

        
            console.log("Participant Count for Room " + allRooms[i].room_name + ": " + 
                dict[allRooms[i].room_name].length + "/" + allRooms[i].max_count);
        }
        
        
        
    }
    allRooms = [];
    dict = {};
    console.log(allRooms);
    console.log(dict);
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