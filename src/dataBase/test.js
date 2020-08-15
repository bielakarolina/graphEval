let isLoadedStackOverflow = false;
let isLoadedMoviesData= false;
let isLoadedBbcFoodData= false;

module.exports = {

    loadStackOverflowData: function (small=true) {
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

        let queryForDisplay = "Match (n)-[r]->(m) Return n,type(r),m limit 100";
        let queryForDisplayLarge = "Match (n)-[r]->(m) Return n,type(r),m limit 1000";
        let queryForDisplay1 = "MATCH (n)\n" +
            "RETURN n;";
        let queryTestForDisplay = "Match (n:User)-[r:PROVIDED]->(m:Answer)-[k]->(q:Question)-[h]->(t:Tag) Return n,type(r),m,type(k),q,type(h),t  limit 10";
        let queryTestForDisplayLarge = "Match (n:User)-[r:PROVIDED]->(m:Answer)-[k]->(q:Question)-[h]->(t:Tag) Return n,type(r),m,type(k),q,type(h),t  limit 5000";
        async function runQuery() {

            if(small) {

                return await neo.queryNeoData(queryTestForDisplay);
            }
            else {
                return await neo.queryNeoData(queryTestForDisplayLarge);
            }
        }

        return runQuery();
    },
    loadMoviesData: function (small = true) {
        const neo = require("./neo4j");
        const orient = require("./orientDb")
        let queryForDisplay = "MATCH (a)-[:ACTED_IN]->(m)<-[:DIRECTED]-(d) RETURN a,m,d LIMIT 10;";
        let queryTestForDisplay = "Match (n:Person)-[r:ACTED_IN]->(m:Movie) Return n,type(r),m limit 35";
        let queryTestForDisplayLarge = "Match (n:Person)-[r:ACTED_IN]->(m:Movie) Return n,type(r),m limit 1000";

        let orientQueryTest = ""

        async function runQuery() {
            if(small) {
                return await neo.queryNeoData(queryTestForDisplay)
            }
            else {
               return await neo.queryNeoData(queryTestForDisplayLarge);
            }
        }

        return runQuery();
    },

    loadBbcFoodData: function (small=true) {
            const neo = require("./neo4j");
            let queryForDisplay1 = "Match (n)-[r]->(m) Return n,type(r),m limit 1000";
            let queryForDisplay3 = "MATCH (n1)-[r]->(n2) RETURN n1, type(r), n2 LIMIT 30";
            let queryTestForDisplay = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(h:Author)-[w:WROTE]->(z:Recipe),(x:Recipe)-[k:DIET_TYPE]->(q:DietType) Where n =z and n=x Return n,type(r),m,h,type(w),z,x,type(k),q  limit 100";
            let queryTestForDisplayLarge = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(h:Author)-[w:WROTE]->(z:Recipe),(x:Recipe)-[k:DIET_TYPE]->(q:DietType) Where n =z and n=x Return n,type(r),m,h,type(w),z,x,type(k),q  limit 1000";
            let queryTestForDisplay1 = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(k:Recipe)-[d:KEYWORD]->(a:Keyword) where n<>k Return  n,type(r),k,type(d),a limit 10";
            async function runQuery() {

                if(small) {
                    return await neo.queryNeoData(queryTestForDisplay);
                }
                else {
                    return await neo.queryNeoData(queryTestForDisplayLarge);
                }
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