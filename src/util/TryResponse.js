const tryRes = async (res, tryCallback) => {
    try {
        await tryCallback();
    }
    catch(e) {
        try {
            const code = Number(e.message.split(' ')[0]) || 400;
            res.status(code).send(e.message);
        }
        catch(e) {
            res.status(400).send('Error');
        }
    }
};

module.exports = tryRes;