const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeService = require('../../service/EmployeeService');
const Employee = require('../../repository/class/Employee');
const tryRes = require('../../util/TryResponse');
const logger = require('../../util/Logger');
const { SECRET_KEY } = require('../../repository/secrets');


async function register(req, res) {
    await tryRes(res, async () => {
        const newUser = new Employee({ username: req.body.username, password: req.body.password, role: req.body.role });

        await employeeService.createEmployee(newUser);

        res.status(201).json({ message: 'User created', newUser });
    });
}

async function authLogin(req, res) {
    const { username, password } = req.body;
    
    const user = await employeeService.getEmployeeByUsername(username);
    
    // bcrypt.compare takes plaintext as first param and hashed as second param
    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json('Invalid credentials');
    }
    else {
        let payload = {
            employeeId: user.employeeId,
            username: user.username,
            role: user.role
        };

        // Make sure token created for the presentation has enough lifetime to last for the duration of the presentation
        let signOptions = {
            expiresIn: '25m'
        };

        //generate JWT
        const token = jwt.sign(payload, SECRET_KEY, signOptions);

        res.json({ message: `Signed in as ${username}`, token, user: payload });
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
            res.status(403).json({ message: `Forbidden access${ user ? ` for ${user.role} users` : '' }` });
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