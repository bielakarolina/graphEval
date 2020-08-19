var OrientDB = require('orientjs');
module.exports = {
    queryNeoData: async function (dbName, query, log = false) {
        let server = OrientDB({
            host: 'localhost',
            port: 2424,
            username: 'root',
            password: 'root'
        });


        var db = server.use({
            name: dbName,
            username: 'root',
            password: 'root'
        });

        console.log('Using Database:', db.name);

        let records = await db.query(query,
            {params:{},
                limit: 100
            }).then(
            function (players) {
                console.log(players);
            }
        );
        if (log) console.log(records)

        db.close();
        return records;
    },

    connectToOrientDb: async function (dbName, query) {
        const OrientDBClient = require('orientjs').OrientDBClient;

        let client;
        try {
            client = await OrientDBClient.connect({
                host: "localhost",
                port: 2424,
                username: 'root',
                password: 'root'
            });
            console.log("Connected");

            let pool = await client.sessions({
                name: "dbName",
                username: "admin",
                password: "admin",
                pool: {max: 10}
            });
// acquire a session from the pool
            let session = await pool.acquire();
            session.query("MATCH {class: Person, as: people} \n" +
                "RETURN people.name\n" +
                "LIMIT 10",
                {params: {name: "admin"}})
                .on("data", data => {
                    console.log(data);
                })
                .on('error', (err) => {
                    console.log(err);
                })
                .on("end", () => {
                    console.log("End of the stream");
                });
            await session.close();
// close the pool
            await pool.close();


        } catch (e) {
            console.log(e);
        }

        if (client) {
            await client.close();
            console.log("Disconnected");
        }

    }
};
