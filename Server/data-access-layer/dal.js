const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "john",
    password: "q1w2e3",
    database: "PortfolioProject"
});
connection.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("We're connected to webService on MySQL.");
});

function executeAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
module.exports = {
    executeAsync
};
