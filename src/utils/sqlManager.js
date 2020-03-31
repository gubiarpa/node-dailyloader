const sql = require("mssql");

// config for your database
const executeQuery = (dbConfig, query) => {

    sql.connect(dbConfig, (err) => {
    
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
            
        // query to the database and get the records
        request.query(query, (err, recordset) => {
            if (err) console.log(err);
            return recordset;
        });
    });

}

// connect to your database

module.exports = executeQuery;