const dupa = require("./orientDb");
let testQuery = "MATCH {class: Person, as: p}-ACTED_IN->{class: Movie, as: m}\n" +
    "RETURN $pathElements\n" +
    "limit 10"
dupa.queryNeoData("test", testQuery, true)


