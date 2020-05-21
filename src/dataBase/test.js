module.exports = {
    simpleVisData: function () {
        const neo = require("./neo4j");
        let queryConnes = "LOAD CSV WITH HEADERS FROM 'file:///conn.csv' AS line\n" +
            "Return line";
        let queryNodes = "LOAD CSV WITH HEADERS FROM 'file:///nodes.csv' AS line\n" +
            "Return line";

        async function runQuery() {
            let nodes = await neo.queryNeoData(queryNodes);
            let edges = await neo.queryNeoData(queryConnes);

            return {nodes: nodes, edges: edges}
        }

        return runQuery();

    },
    loadStackOverflowData: function () {
        const neo = require("./neo4j");

        let loadStackOverflowData = "WITH \"https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=creation&tagged=java&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf\" AS url\n" +
            "CALL apoc.load.json(url) YIELD value\n" +
            "UNWIND value.items AS q\n" +
            "MERGE (question:Question {id:q.question_id}) ON CREATE\n" +
            "  SET question.title = q.title, question.share_link = q.share_link, question.favorite_count = q.favorite_count\n" +
            "\n" +
            "FOREACH (tagName IN q.tags | MERGE (tag:Tag {name:tagName}) MERGE (question)-[:TAGGED]->(tag))\n" +
            "FOREACH (a IN q.answers |\n" +
            "   MERGE (question)<-[:ANSWERS]-(answer:Answer {id:a.answer_id})\n" +
            "   MERGE (answerer:User {id:a.owner.user_id}) ON CREATE SET answerer.display_name = a.owner.display_name\n" +
            "   MERGE (answer)<-[:PROVIDED]-(answerer)\n" +
            ")\n" +
            "WITH * WHERE NOT q.owner.user_id IS NULL\n" +
            "MERGE (owner:User {id:q.owner.user_id}) ON CREATE SET owner.display_name = q.owner.display_name\n" +
            "MERGE (owner)-[:ASKED]->(question)";

        let queryForDisplay = "Match (n)-[r]->(m) Return n,r,m limit 25";
        async function runQuery() {
            let loadData = await neo.queryNeoData(loadStackOverflowData);
            let testQuery = await neo.queryNeoData(queryForDisplay,true);

            return testQuery
        }

        return runQuery();
    },

    cleanNeo4JDataBase:function () {
        const neo = require("./neo4j");

        let cleanDataBaseStep1 = "match (a) -[r] -> () delete a, r";
        let cleanDataBaseStep2 = "match (a) delete a";

        async function runQuery() {
            let clean1 = await neo.queryNeoData(cleanDataBaseStep1);
            let clean2 = await neo.queryNeoData(cleanDataBaseStep2);

            return {nodes:clean1 , edges: clean2}
        }

        return runQuery();
    },
};