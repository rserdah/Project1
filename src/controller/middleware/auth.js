const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeService = require('../../service/EmployeeService');
const Employee = require('../../repository/class/Employee');
const logger = require('../../util/Logger');

const SALT_ROUNDS = 10;
const SECRET_KEY = 'your-secret-key';


async function register(req, res) {
    const { username, password } = req.body;

    // If the username is empty/undefined OR an existing user exists by the same, respond with error
    if(!username || await employeeService.getUserByUsername(username)) {
        res.status(409).json('Username taken');
        return;
    }
    else if(!password) {
        res.status(400).json('Missing password');
        return;
    }

    // Default role to employee if missing
    req.body.role ||= 'employee';

    req.body.password = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new Employee({ username: req.body.username, password: req.body.password, role: req.body.role });

    await employeeService.createEmployee(newUser);

    res.status(201).json({ message: 'User created', newUser });
}

async function authLogin(req, res) {
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

    if(!token) {
        logger.info('401 Unauthorized access');
        res.status(401).json({ message: 'Unauthorized access' });
        return;
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err || !user.role || !predicate(user.role)) {
            logger.info('403 Forbidden access');
            res.status(403).json({ message: 'Forbidden access' });
            return;
        }
        else {
            req.user = user;
            next();
        }
    });
}

function authEmployee(req, res, next) {
    authRole(req, res, next, role => 
        role === 'employee' || role === 'financeManager'
    );
}

async function authFinanceManager(req, res, next)
{
    authRole(req, res, next, role => 
        role === 'financeManager'
    );
}

module.exports = {
    register,
    authLogin,
    authEmployee,
    authFinanceManager
};