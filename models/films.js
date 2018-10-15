const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  diaryFilms: { type: Array, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// filmSchema.index({ name: 1, userID: 1 }, { unique: true }); -- TODO: not sure what this does

filmSchema.set('timestamps', true);
filmSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Film', filmSchema);
