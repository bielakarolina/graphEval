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
        let queryTestForDisplay = "Match (n:User)-[r:PROVIDED]->(m:Answer)-[k]->(q:Question)-[h]->(t:Tag) Return n,type(r),m,type(k),q,type(h),t ";
        async function runQuery() {
            let loadData = await neo.queryNeoData(loadStackOverflowData);
            let testQuery = await neo.queryNeoData(queryTestForDisplay);

            return testQuery
        }

        return runQuery();
    },

    loadBbcFoodData: function () {
            const neo = require("./neo4j");
            let createIndexes = "CREATE INDEX ON :Recipe(id) CREATE INDEX ON :Ingredient(name) CREATE INDEX ON :Keyword(name) CREATE INDEX ON :DietType(name) CREATE INDEX ON :Author(name) CREATE INDEX ON :Collection(name);"
            let loadBbcFoodData = ":params jsonFile => \"https://raw.githubusercontent.com/mneedham/bbcgoodfood/master/stream_all.json\";\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.title AS title,\n" +
                                              "       value.page.article.description AS description,\n" +
                                              "       value.page.recipe.cooking_time AS cookingTime,\n" +
                                              "       value.page.recipe.prep_time AS preparationTime,\n" +
                                              "       value.page.recipe.skill_level AS skillLevel\n" +
                                              "MERGE (r:Recipe {id: id})\n" +
                                              "SET r.cookingTime = cookingTime,\n" +
                                              "    r.preparationTime = preparationTime,\n" +
                                              "    r.name = title,\n" +
                                              "    r.description = description,\n" +
                                              "    r.skillLevel = skillLevel;\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.article.author AS author\n" +
                                              "MERGE (a:Author {name: author})\n" +
                                              "WITH a,id\n" +
                                              "MATCH (r:Recipe {id:id})\n" +
                                              "MERGE (a)-[:WROTE]->(r);\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.recipe.ingredients AS ingredients\n" +
                                              "MATCH (r:Recipe {id:id})\n" +
                                              "FOREACH (ingredient IN ingredients |\n" +
                                              "  MERGE (i:Ingredient {name: ingredient})\n" +
                                              "  MERGE (r)-[:CONTAINS_INGREDIENT]->(i)\n" +
                                              ");\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.recipe.keywords AS keywords\n" +
                                              "MATCH (r:Recipe {id:id})\n" +
                                              "FOREACH (keyword IN keywords |\n" +
                                              "  MERGE (k:Keyword {name: keyword})\n" +
                                              "  MERGE (r)-[:KEYWORD]->(k)\n" +
                                              ");\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.recipe.diet_types AS dietTypes\n" +
                                              "MATCH (r:Recipe {id:id})\n" +
                                              "FOREACH (dietType IN dietTypes |\n" +
                                              "  MERGE (d:DietType {name: dietType})\n" +
                                              "  MERGE (r)-[:DIET_TYPE]->(d)\n" +
                                              ");\n" +
                                              "CALL apoc.load.json($jsonFile) YIELD value\n" +
                                              "WITH value.page.article.id AS id,\n" +
                                              "       value.page.recipe.collections AS collections\n" +
                                              "MATCH (r:Recipe {id:id})\n" +
                                              "FOREACH (collection IN collections |\n" +
                                              "  MERGE (c:Collection {name: collection})\n" +
                                              "  MERGE (r)-[:COLLECTION]->(c)\n" +
                                              ");";

            let queryForDisplay = "Match (n)-[r]->(m) Return n,r,m limit 25";
            let queryTestForDisplay = "Match (n:Recipe)-[r:KEYWORD]->(m:Keyword),(h:Author)-[w:WROTE]->(z:Recipe),(x:Recipe)-[k:DIET_TYPE]->(q:DietType) Where n =z and n=x Return n,type(r),m,h,type(w),z,x,type(k),q  limit 1000";
            async function runQuery() {
                //let indexes = await neo.queryNeoData(createIndexes);
                //let loadData = await neo.queryNeoData(loadBbcFoodData);
                let testQuery = await neo.queryNeoData(queryTestForDisplay);

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