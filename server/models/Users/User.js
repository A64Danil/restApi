const { ActiveRecordEntity } = require('../ActiveRecordEntity')
//const AppError = require('../../../utils/appError')
// namespace MyProject\Models\Users;

// use MyProject\Exceptions\InvalidArgumentException;


class User extends ActiveRecordEntity {
    
    #name

    #nickname

    #email

    #isConfirmed

    #role

    #passwordHash

    #authToken

    #createdAt

    /**
     * Get a name. (public function)
     * @return {string} The nname.
     */
    getName() {
        return this.#name;

    }

    /**
     * Get a nickname. (public function)
     * @return {string} The nickname.
     */
    getNickname() {
        return this.#nickname;

    }

    /**
     * Get an email. (public function)
     * @return {string} The email.
     */
    getEmail() {
        return this.#email;
    }
    
    /**
     * Get a token. (public function)
     * @return {string} Auth token.
     */
    getAuthToken() {
        return this.#authToken;
    }


    /**
     * Get table name. (protected static function)
     * @return {string}
     */
    static getTableName(){
        return 'users';
    }

    /**
     * Register user. (public static function)
     * @param (userData) object
     * @return {User} Current user.
     */
    static signUp(userData) {

        if (!userData.#nickname) {
            // throw new InvalidArgumentException('Не передан nickname');
        }


        // TODO: перебрать
        // if (!preg_match('/^[a-zA-Z0-9]+$/', $userData['nickname'])) {
        //     throw new InvalidArgumentException('Nickname может состоять только из символов латинского алфавита и цифр');
        //
        // }



        if (!userData.#email) {
            // throw new InvalidArgumentException('Не передан email');
        }


        // TODO: перебрать
        // if (!filter_var($userData['email'], FILTER_VALIDATE_EMAIL)) {
        //     throw new InvalidArgumentException('Email некорректен');
        // }



        if (!userData.password) {
            // throw new InvalidArgumentException('Не передан password');
        }



        if (userData.password.length < 8) {
            // throw new InvalidArgumentException('Пароль должен быть не менее 8 символов');
        }


        if (this.findOneByColumn('nickname', userData.#nickname) !== null) {
            // throw new InvalidArgumentException('Пользователь с таким nickname уже существует');
        }



        if (this.findOneByColumn('email', userData.#email) !== null) {
            throw new InvalidArgumentException('Пользователь с таким email уже существует');
        }

        const user = new User();

        user.#nickname = userData['nickname'];

        user.#email = userData['email'];

        // TODO: password_hash
        // user.#passwordHash = password_hash(userData['password'], PASSWORD_DEFAULT);

        user.#isConfirmed = 0;

        user.#role = 'user';

        // TODO: sha1
        user.#authToken = sha1(random_bytes(100)) . sha1(random_bytes(100));

        user.id = user.save();

        console.log(user);

        return user;

    }

    /**
     * Activate just registred user. (public function)
     * @return {void}.
     */
    activate() {
        this.#isConfirmed = 1;
        this.save();
    }

    /**
     * Login user. (public static function)
     * @param (loginData) object
     * @return {User} Current user.
     */
    static login(loginData) {

        if (!loginData.#email) {
            // throw new InvalidArgumentException('Не передан email');
        }



        if (loginData.password) {
            // throw new InvalidArgumentException('Не передан password');
        }

        
        const user = User.findOneByColumn('email', loginData.#email);

        if (user === null) {
            // throw new InvalidArgumentException('Нет пользователя с таким email');
        }


        // TODO: перебрать password_verify
        // if (!password_verify($loginData['password'], user.getPasswordHash())) {
        //     throw new InvalidArgumentException('Неправильный пароль');
        // }

        
        if (!user.#isConfirmed) {
            throw new InvalidArgumentException('Пользователь не подтверждён');
        }
        
        user.#refreshAuthToken();
        user.save();
        
        return user;

    }

    /**
     * Logout user. (public static function)
     * @param (user) User
     * @return {void}
     */
    static logout(user) {
        user.#authToken = '';
        user.save();
    }

    /**
     * Get password hash. (public function)
     * @param (user) User
     * @return {string} Password hash
     */
    getPasswordHash(){
        return this.#passwordHash;
    }

    /**
     * Get password hash. (privat function)
     * @param (user) User
     * @return {string} Password hash
     */
    #refreshAuthToken() {
        this.#authToken = sha1(random_bytes(100)) . sha1(random_bytes(100));
    }
}

module.exports = {
    User
}