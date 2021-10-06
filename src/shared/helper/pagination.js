const ParseNum = require("./parse-number");

const Paginate = (_page, _size) => {
    const currentPage = _page * 1 || 1;
    const limit = _size * 1 || 9;
    const skip = (currentPage - 1) * limit;
    const parseNumLimit = ParseNum(limit);
    const parseNumSkip = ParseNum(skip);

    return { skip: parseNumSkip, limit: parseNumLimit };
};

module.exports = Paginate;
