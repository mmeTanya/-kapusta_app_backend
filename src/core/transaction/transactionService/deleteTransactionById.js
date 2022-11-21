const {Transaction} = require('../transactionModel');

const deleteTransactionById = id => {
    const result = Transaction.findByIdAndRemove(id);
    return result;
}

module.exports = deleteTransactionById;