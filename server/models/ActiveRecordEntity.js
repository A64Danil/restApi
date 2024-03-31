let db = require('../services/db')

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
        // TODO: перебрать
        // return lcfirst(str_replace('_', '', ucwords($source, '_')));
    }



    // private
    camelCaseToUnderscore(source) {
        // TODO: перебрать
        // return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $source));
    }

    //private
    mapPropertiesToDbFormat() {
        // TODO: перебрать

        // ReflectionObject позволяет получить информацию о методах, свойствах и других деталях объекта, таких как его класс, родительские классы, интерфейсы, установленные свойства и методы и многое другое. Он предоставляет мощные возможности для интроспекции (изучения) объектов во время выполнения программы, что может быть полезно для отладки, анализа кода, создания динамических структур данных и других задач.
        //
        //     Пример использования ReflectionObject может включать получение списка методов и их атрибутов для объекта, получение списка свойств объекта и их значений, а также выполнение других операций, которые требуют знания структуры объекта во время выполнения.
        const reflector = new ReflectionObject(this);

        const properties = reflector.getProperties();



        const mappedProperties = [];

        foreach ($properties as $property) {

            const propertyName = $property.getName();

            const propertyNameAsUnderscore = this[this.camelCaseToUnderscore(propertyName)];

            mappedProperties[propertyNameAsUnderscore] = this[propertyName];

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