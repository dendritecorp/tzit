const TABLE_NAME = 'users'
const TABLE_COLUMNS_CREATE = '(email VARCHAR(100), password CHAR(64), salt CHAR(64), created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)'

const TABLE_COLUMNS_INSERT = '(email, password, salt, created_at)'

let Queries = {}
module.exports = Queries

Queries.createTable = `CREATE TABLE ${TABLE_NAME} ${TABLE_COLUMNS_CREATE}`

Queries.getTable = `SELECT * FROM ${TABLE_NAME}`

Queries.createUser = (email, password, salt, created_at) => `INSERT INTO ${TABLE_NAME} ${TABLE_COLUMNS_INSERT} VALUES ('${email}', '${password}', '${salt}', '${created_at}')`

Queries.userExists = (email) => `SELECT * FROM ${TABLE_NAME} WHERE email = '${email}'`

Queries.userLogIn = (email, password) => `SELECT * FROM ${TABLE_NAME} WHERE email = '${email}' AND password = '${password}'`

Queries.getUserSalt = (email) => `SELECT salt FROM ${TABLE_NAME} WHERE email = '${email}'`
