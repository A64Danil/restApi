const { conn } = require("../services/db");
let { ucFirst, lcFirst } = require('../../utils/helpers')

class ActiveRecordEntity {

    /** @var int */
    id;


    // constructor() {
    //     this.id = 0;
    // }


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

    // Privat
    underscoreToCamelCase(source){
        const res = source.split('_').filter(s => s.length).map(ucFirst);
        res[0] = lcFirst(res[0]);
        return res.join('')
    }

    // private
    camelCaseToUnderscore(source) {
        return source.replace( /([A-Z])/g, "_$1").toLowerCase();
    }


    async save() {
        if (this.id) {
            return await this.#update();
        } else {
            return await this.#insert();
        }
    }


    // private function
    async #update() {
        const id = this.id;
        delete this.id;
        const columns2params = [];
        const values = [];

        for (let column in this) {
            const value = this[column];
            columns2params.push(column + ' = ?'); // column1 = ?
            values.push(value); // [value1]
        }
        const query = 'UPDATE ' + this.getTableName() + ' SET ' + columns2params.join(', ') + ' WHERE id = ? LIMIT 1;'
        const [rows, fields] = await conn.query(query,[...values, id]);
        // TODO: продумать как обрабатывать ответ от сервера
        return rows;
    }


    //private function
    async #insert() {
        const columns = [];
        const valuePlaceholders = [];
        const values = [];

        for (let column in this) {
            const value = this[column];
            columns.push(column); // column1
            valuePlaceholders.push("?") // ?
            values.push(value); // [value1]
        }
        // console.log(columns, valuePlaceholders, values);

        const query = 'INSERT INTO ' + this.getTableName() + ' (' + columns + ') VALUES (' + valuePlaceholders + ');';
        const [rows, fields] = await conn.query(query,[...values]);
        // TODO: отсылать не все поля?
        return this
    }

    // public
    async delete() {
        console.log('delete');
        const query = 'DELETE FROM `' + this.getTableName() + '` WHERE id = ?';
        const [rows, fields] = await conn.query(query, this.id);

        return rows
    }


    /**

     * @return static[]

     */
    // public static function
    static async findAll() {
        const [rows] = await conn.query("SELECT * FROM " + this.getTableName());
        const classInstances = rows.map(row => new this(row));
        return classInstances;
    }

    // TODO: are we need fineAllByColumn?
    //public static function
    static async findOneByColumn(columnName, value) {
        const [rows] = await conn.query('SELECT * FROM `' + this.getTableName() + '` WHERE `' + columnName + '` = ? LIMIT 1;',[value]);

        if (rows.length === 0) {
            return null;
        }

        const classInstance = new this(rows[0]);
        return classInstance;

    }


    /**

     * @param int $id

     * @return static|null

     */
    static async getById(id) {
        const [rows] = await conn.query('SELECT * FROM `' + this.getTableName() + '` WHERE id=?;',  [id]);
        const classInstances = rows.map(row => new this(row));
        return classInstances ? classInstances[0] : null;
    }

    //abstract protected static function
    static getTableName() {
        throw new Error('You have to implement the method getTableName!');
    }
}

module.exports = {
    ActiveRecordEntity
}