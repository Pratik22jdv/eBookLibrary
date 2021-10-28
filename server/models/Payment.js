const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			require: true,
		},
		productId: {
			type: String,
			require: true,
		},
		TransactionData: {
			type: String,
			require: true,
			// it is stored after JSON.stringify
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
