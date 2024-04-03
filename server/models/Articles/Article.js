const ActiveRecordEntity = require('../ActiveRecordEntity')

// use MyProject\Models\Users\User;

class Article extends ActiveRecordEntity {

    @name


    @text


    @authorId


    @createdAt


    /**
     * Get a name. (public function)
     * @return {string} An article name.
     */
    getName() {
        return this.name;
    }

    /**
     * Set a name. (public function)
     * @param {string} value - New name for article.
     * @return {void}
     */
    setName(value) {
        this.name = value;
    }


    /**
     * Get a text. (public function)
     * @return {string} An article text.
     */
    getText() {
        return this.text;
    }

    /**
     * Set a text. (public function)
     * @param {string} value
     * @return {void}
     */
    setText(value) {
        this.text = value;
    }

    /**
     * Get an author. (public function)
     * @return {User} An article author (type USER).
     */
    getAuthor() {
        return User.getById(this.authorId);
    }


    /**
     * Set a new author. (public function)
     * @param (User) author
     * @return {void}
     */
    setAuthor(author){
        this.authorId = author.getId();
    }

    /**
     * Get table name. (protected static function)
     * @return {string}
     */
    getTableName() {
        return 'articles';
    }

}