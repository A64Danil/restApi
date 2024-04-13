const { conn } = require("../services/db");
let { ucFirst, lcFirst } = require('../../utils/helpers')

class ActiveRecordEntity {

    /** @var int */
    id;


    constructor() {
        this.id = 0;
    }


    /**

     * @return int

     */

    getId() {
        return this.id;
    }

    __set(name, value) {
        const camelCaseName = this[this.underscoreToCamelCase(name)];
        this[camelCaseName] = value;
    }

    // Privat?
    underscoreToCamelCase(source){
        const res = source.split('_').filter(s => s.length).map(ucFirst);
        res[0] = lcFirst(res[0]);
        return res.join('')
    }

    // private
    camelCaseToUnderscore(source) {
        return source.replace( /([A-Z])/g, "_$1").toLowerCase();
    }

    //private
    mapPropertiesToDbFormat() {
        const properties = Object.keys(this)
        const mappedProperties = [];

        for (let property of properties) {
            const propertyNameAsUnderscore = this.camelCaseToUnderscore(property);
            mappedProperties[propertyNameAsUnderscore] = this[property];
        }

        return mappedProperties;
    }


    save() {
        const mappedProperties = this.mapPropertiesToDbFormat();

        if (this.id !== null) {
            this.update(mappedProperties);
            return 1;
        } else {
            return this.insert(mappedProperties);
        }

    }


    // private function
    static async update(id, props) {
        delete props.id;
        // console.log('props')
        // console.log(props)
        const columns2params = [];
        const values = [];

        for (let column in props) {
            const value = props[column];
            columns2params.push(column + ' = ?'); // column1 = ?
            values.push(value); // [value1]
        }
        console.log(columns2params, values);

        const query = 'UPDATE ' + this.getTableName() + ' SET ' + columns2params.join(', ') + ' WHERE id = ? LIMIT 1;'
        console.log(query)
        const [rows, fields] = await conn.query(query,[...values, id]);

        return rows;
    }


    //private function
    insert(mappedProperties) {
        // TODO: callback fn for filter???
        const filteredProperties = mappedProperties.filter();

        const columns = [];

        const paramsNames = [];

        const params2values = {};

        for (let columnName in filteredProperties) {
            let value = filteredProperties[columnName];

            // TODO: is this push ???
            columns.push('`' + columnName + '`');

            const paramName = ':' . columnName;

            paramsNames.push(paramName);

            params2values[paramName] = value;

        }

        console.log(columns);
        console.log(paramsNames);
        console.log(params2values);

        const columnsViaSemicolon = columns.join(', ');

        const paramsNamesViaSemicolon = paramsNames.join(', ');


        const sql = 'INSERT INTO ' + this.getTableName() + ' (' + columnsViaSemicolon + ') VALUES (' + paramsNamesViaSemicolon + ');';


        // const db = Db.getInstance();

        // const result = db.queryId($sql, params2values, this.constructor);

        // return result;

        return [columnsViaSemicolon, paramsNamesViaSemicolon]
    }

    // public
    delete() {
        // const db = Db.getInstance();

        // db.query('DELETE FROM `' + this.getTableName() + '` WHERE id = :id', [':id' => this.id]);

        this.id = null;

    }


    /**

     * @return static[]

     */
    // public static function
    static async findAll() {
        // const [rows, fields] = await conn.query("SELECT * FROM " + this.getTableName());
        const [rows] = await conn.query("SELECT * FROM " + this.getTableName());
        return rows;
    }


    //public static function
    static async findOneByColumn(columnName, value) {
        // const result = db.query('SELECT * FROM `' + this.getTableName() + '` WHERE `' + columnName + '` = :value LIMIT 1;',[':value' => value], this.constructor);
        const [rows] = await conn.query('SELECT * FROM `' + this.getTableName() + '` WHERE `' + columnName + '` = ? LIMIT 1;',[value]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];

    }


    /**

     * @param int $id

     * @return static|null

     */
    static async getById(id) {
        const [rows] = await conn.query('SELECT * FROM `' + this.getTableName() + '` WHERE id=?;',  [id]);
        return rows ? rows[0] : null;
    }

    //abstract protected static function
    static getTableName() {
        throw new Error('You have to implement the method getTableName!');
    }
}

module.exports = {
    ActiveRecordEntity
}