const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

// define the schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

userSchema.findById = function(cb) {
  return this.model('Users').find({ id: this.id }, cb);
};
// attach the schema to the user model
const User = mongoose.model('Users', userSchema);

//user list method to the model
exports.findByEmail = email => {
  return User.find({ email: email });
};
//findByID method to the model
exports.findById = id => {
  return User.findById(id).then(result => {
    if (!result) return null;
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};
//createUser method to the model
exports.createUser = userData => {
  const user = new User(userData);
  return user.save();
};
//user list method to the model
exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec()
      .then(users => {
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });
};
//user update method to the model
exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then(user => {
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        for (let i in userData) {
          user[i] = userData[i];
        }

        return user.save();
      })
      .then(updatedUser => {
        resolve(updatedUser);
      })
      .catch(err => {
        reject(err);
      });
  });
};
//user delete method to the model
exports.removeById = userId => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: userId })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};
