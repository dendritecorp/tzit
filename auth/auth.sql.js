const TABLE = 'users'

const TABLE_COLUMNS_CREATE = '(email VARCHAR(100), name VARCHAR(140), uuid uuid, password VARCHAR(255), created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)'
const TABLE_COLUMNS = '(email,name,uuid, password, created_at)'

let Queries = {}
module.exports = Queries

Queries.createTable = `CREATE TABLE ${TABLE} ${TABLE_COLUMNS_CREATE}`

Queries.getTable = `SELECT * from ${TABLE} WHERE deleted_at IS NULL`;

Queries.get = (email) => `SELECT * FROM ${TABLE} WHERE email = '${email}'`

Queries.create = (email, name, uuid, password) => `INSERT INTO ${TABLE} ${TABLE_COLUMNS} VALUES ('${email}','${name}','${uuid}','${password}', '${(new Date()).toISOString()}')`

Queries.delete = (uuid, deleted_at) => `UPDATE ${TABLE} SET deleted_at = ('${deleted_at}') WHERE uuid = ${uuid} `

Queries.update = (uuid, name, password) => `UPDATE ${TABLE} SET name = ('${name}'), password = ('${password}'), updated_at = ('${(new Date()).toISOString()}') WHERE uuid = ${uuid}`
