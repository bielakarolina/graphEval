const neo4j = require('neo4j-driver');
module.exports = {

    queryNeoData: async function (query,log=false) {
        let uri = 'neo4j://localhost:7687';
        let user = "neo4j";
        let password = "root";
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        const session = driver.session();
        const fields = [];
        const allFields = [];

        try {
                const {records} = await session.run(query);
                records.forEach(record => {
                    fields.push(record._fields[0]);
                    allFields.push(record._fields)
                });
                if(log) console.log(allFields)
            } finally {
                session.close();
                driver.close();
            }
        return allFields;



        // try {
        //     const {records} = await session.run(query);
        //     records.forEach(record => {
        //         fields.push(record._fields[0]);
        //         allFields.push(record._fields)
        //     });
        //     if(log) console.log(allFields)
        // } finally {
        //     session.close();
        //     driver.close();
        // }
        // return fields;
    },





};
// on application exit:
