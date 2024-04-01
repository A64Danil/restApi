let db = require('../services/db')
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
    update(mappedProperties) {

        const columns2params = [];

        const params2values = [];

        let index = 1;

        foreach ($mappedProperties as $column => value) {
            const param = ':param' . $index; // :param1

            // array
            const columns2params = $column . ' = ' . $param; // column1 = :param1

            // array
            const params2values[param] = value; // [:param1 => value1]

            index++;
        }

        const sql = 'UPDATE ' . static::getTableName() . ' SET ' . implode(', ', $columns2params) . ' WHERE id = ' . $this->id;

        const db = Db.getInstance();

        db.query(sql, params2values);

    }


    //private function
    insert(array) {
        const filteredProperties = array_filter($mappedProperties);

        const columns = [];

        const paramsNames = [];

        const params2values = [];

        foreach ($filteredProperties as $columnName => $value) {

            // TODO: is this push ???
            $columns[] = '`' . $columnName . '`';

            const paramName = ':' . $columnName;

            paramsNames.push(paramName);

            params2values[paramName] = value;

        }

        const columnsViaSemicolon = implode(', ', $columns);

        const paramsNamesViaSemicolon = implode(', ', paramsNames);


        const sql = 'INSERT INTO ' . static::getTableName() . ' (' . $columnsViaSemicolon . ') VALUES (' . $paramsNamesViaSemicolon . ');';



        const db = Db.getInstance();

        const result = db.queryId($sql, params2values, static::class);

        return result;
    }

    // public
    delete() {
        const db = Db.getInstance();

        db.query('DELETE FROM `' . static::getTableName() . '` WHERE id = :id', [':id' => $this->id]);

        this.id = null;

    }


    /**

     * @return static[]

     */
    // public static function
    findAll() {
        const db = Db.getInstance();

        return db.query('SELECT * FROM `' . static::getTableName() . '`;', [], static::class);
    }


    //public static function
    findOneByColumn(columnName, value) {
        const db = Db.getInstance();

        const result = db.query('SELECT * FROM `' . static::getTableName() . '` WHERE `' . $columnName . '` = :value LIMIT 1;', ':value' => $value],static::class);

        if (result.length === 0) {
            return null;
        }

        return result[0];

    }


    /**

     * @param int $id

     * @return static|null

     */

    //public static function
    getById(id) {

        const db = Db::getInstance();

        const entities = db.query('SELECT * FROM `' . static::getTableName() . '` WHERE id=:id;',  [':id' => $id],
        static::class);

        return entities ? entities[0] : null;

    }

    //abstract protected static function
    // TODO: why no body???
    getTableName() {

    }
}