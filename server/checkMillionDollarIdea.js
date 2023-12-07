const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = Number(numWeeks) * Number(weeklyRevenue);

    if (!numWeeks || !weeklyRevenue || isNaN(totalValue) || totalValue < 1000000) {
        return res.status(400).send('Idea does not meet the minimum value of one million dollars.');
    }
    next();
};

module.exports = checkMillionDollarIdea;

