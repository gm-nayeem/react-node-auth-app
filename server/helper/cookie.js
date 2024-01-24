const setAccessTokenCookie = (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    });
}

module.exports = {
    setAccessTokenCookie
}