const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "transfer", "withdraw"],
      lowercase: true,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
    },
    // corresponding: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Transaction',
    //   validate: {
    //     validator: function(v) {
    //       if (this.type === "transfer") {
    //         if (mongoose.Types.ObjectId.isValid(v)) return true;
    //       }
    //     },
    //     message: "A transfer must have a corresponding transaction id"
    //   }
    // }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("transaction", transactionSchema);
