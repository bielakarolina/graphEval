module.exports = {

    setupClient: function () {
        const TerminusClient = require('@terminusdb/terminus-client');
        const client = new TerminusClient.WOQLClient({
            server:"http://localhost/",
            dbid:"1",
            include_key:true
        });
        let woql = "{ \"triple\": [\"v:Subject\", \"v:Property\", \"v:Value\"] }";
        const opts={terminus:{encoding: "terminus:turtle",
            user_key: "mykey"}};

        client.select(woql, opts).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        });


    }

};
