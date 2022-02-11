exports.getHome = (req, res) => {
    res.status(200).json({ ok: true, message: 'Welcome to the home page' });
};