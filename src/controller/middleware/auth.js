const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeService = require('../../service/EmployeeService');

const SALT_ROUNDS = 10;
const SECRET_KEY = 'your-secret-key';


//Finish fixing this function
/*async function register(req, res) {
    let { username, password, role } = req.body;

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    const newUser = {id: users.length + 1, username, password, role};
    users.push(newUser);

    res.status(201).json({ message: 'User created', newUser });
}*/

async function authLogin(req, res)
{
    const { username, password } = req.body;
    
    const user = await employeeService.getUserByUsername(username);
    
    // bcrypt.compare takes plaintext as first param and hashed as second param
    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json('Invalid credentials');
    }
    else {
        let payload = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Make sure token is created before the presentation and has enough lifetime to last for the duration of the presentation
        let signOptions = {
            expiresIn: '15m'
        };

        //generate JWT
        const token = jwt.sign(payload, SECRET_KEY, signOptions);

        res.json({ message: `Signed in as ${username}`, token });
    }
}

/** Authorization function to be used to match acceptable roles, takes in a predicate callback that returns true if a role is valid
 * Example: predicate = (role) => role === 'employee' || role === 'financeManager';
 */
function authRole(req, res, next, predicate) {
    const authHeader = req.headers['authorization'];

    // Authentication header format convention: 'Bearer <token>'; This split returns the token value
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
    {
        res.status(401).json({ message: 'Unauthorized access' });
        return;
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err || !user.role || !predicate(user.role)) {
            res.status(403).json({ message: 'Forbidden access' });
            return;
        }

        req.user = user;
    });

    next();
}

function authEmployee(req, res, next) {
    authRole(req, res, next, role => 
        role === 'employee'
    );
}

function authFinanceManager(req, res, next)
{
    authRole(req, res, next, role => 
        role === 'employee' || role === 'financeManager'
    );
}

module.exports = {
    authLogin,
    authEmployee,
    authFinanceManager
};