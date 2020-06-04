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
        console.log("duuuuupa")
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

        let queryForDisplay = "Match (n)-[r]->(m) Return n,type(r),m limit 25";
        let queryTestForDisplay = "Match (n:User)-[r:PROVIDED]->(m:Answer)-[k]->(q:Question)-[h]->(t:Tag) Return n,type(r),m,type(k),q,type(h),t ";
        async function runQuery() {
            let loadData = await neo.queryNeoData(loadStackOverflowData,true);
            let testQuery = await neo.queryNeoData(queryForDisplay);

            return testQuery
        }

        return runQuery();
    }, loadMoviesData: function () {
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

        let queryForDisplay = "Match (n)-[r]->(m) Return n,r,m limit 10";
        let queryTestForDisplay = "Match (n:User)-[r:PROVIDED]->(m:Answer)-[k]->(q:Question)-[h]->(t:Tag) Return n,type(r),m,type(k),q,type(h),t ";
        async function runQuery() {
            let loadData = await neo.queryNeoData(loadStackOverflowData);
            let testQuery = await neo.queryNeoData(queryForDisplay);
            await this.cleanNeo4JDataBase();
            return testQuery
        }

        return runQuery();
    },

    loadBbcFoodData: function () {
            const neo = require("./neo4j");
            let queryForDisplay1 = "Match (n)-[r]->(m) Return n,type(r),m limit 1000";
            let queryForDisplay3 = "MATCH (n1)-[r]->(n2) RETURN n1, type(r), n2 LIMIT 30";
            let queryTestForDisplay = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(h:Author)-[w:WROTE]->(z:Recipe),(x:Recipe)-[k:DIET_TYPE]->(q:DietType) Where n =z and n=x Return n,type(r),m,h,type(w),z,x,type(k),q  limit 1000";
            let queryTestForDisplay1 = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(k:Recipe)-[d:KEYWORD]->(a:Keyword) where n<>k Return  n,type(r),k,type(d),a limit 10";
            async function runQuery() {
                let testQuery = await neo.queryNeoData(queryForDisplay3);
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