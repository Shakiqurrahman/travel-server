const setToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    
    res.status(statusCode).json({
        user,
        token,
    });
};

module.exports = setToken;
