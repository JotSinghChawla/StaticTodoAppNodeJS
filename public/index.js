let close = document.getElementById('close');
let list = document.getElementById('list');
let enter = document.getElementById('enter');
let url = "http://localhost:3000";

let db = [];

async function fetchDB() {
    const response = (await fetch(url+'/db.json')).json()
    .then( res => res)
    .catch( err => console.log('Error: ', err));
    return response;
}

function deleteTask( event ) {
    let key = event.target.getAttribute('key');
    let x =0;
    db.forEach( element => {
        if( element.id == key) {
            db.splice(x, 1);
            // break;               // break doesn't work on forEach()
        }
        x++;
    })
    fetch(url+'/db.json', { method: "POST", headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify( db )})
        .then( res => res)
        .then( res => console.log( res))
        .catch( err => console.log('Error: ', err));
    // db = fetchDB(); 
    location.reload(); 
};

function changeStatus( event ) {
    let key = event.target.getAttribute('key');
    db.forEach( element => {
        if( element.id == key) {
            element.completed = !element.completed;
            // break;               // break doesn't work on forEach()
        }
    })
    fetch(url+'/db.json', { method: "POST", headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify( db )})
        .then( res => res)
        .then( res => console.log( res))
        .catch( err => console.log('Error: ', err));
    location.reload();                  // To add a line-through css in checked items
};


function addTask( event ) {
    const data = {};
    data.id = Math.floor(Math.random() * 100000);
    data.name = enter.value;                // Refer line 3
    data.completed = false;
    db.push( data );
    fetch(url+'/db.json', { method: "POST", headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify( db )})
        .then( res => res)
        .then( res => console.log( res))
        .catch( err => console.log('Error: ', err));
    // location.reload();               // Here onsubmit automatically reloading the page
}

function addList( db ) {
    let newItem = document.createElement('li');
    let addRow = "";
    db.forEach(element => {
        addRow += `<li ${element.completed? 'class="checked"' : '' } >${element.name}<div id='end'><input ${element.completed ? "checked" : ""} key=${element.id} onclick="changeStatus(event)" type="checkbox" /> <span key=${element.id} onclick="deleteTask(event)" id='close' class="fa fa-window-close"></span>  </div> </li> <hr />`;
    });
    newItem.innerHTML = addRow;
    document.getElementById('list').appendChild(newItem);

}

document.addEventListener('DOMContentLoaded', async () => {
    res = await fetchDB();
    db = res;
    // console.log(db);
    addList(db);
});
