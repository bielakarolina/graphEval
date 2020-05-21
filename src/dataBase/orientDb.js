var OrientDB = require('orientjs');



let s = async function() {
     let s = OrientDB({
        host:       'localhost',
        port:       2425,
        username:   'root',
        password:   'root_passwd'
    });
    return s;
};

let server = s();

var db = server.create({
    name:    'BaseballStats',
    type:    'graph',
    storage: 'plocal'
})
    .then(
        function(create){
            console.log('Created Database:', create.name);
        }
    );


var db = server.use('BaseballStats')
console.log('Using Database:', db.name);
server.close()