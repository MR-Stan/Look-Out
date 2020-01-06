module.exports = function (sequelize, DataTypes) {

  // create table for user
  const User = sequelize.define("User", {

    // autoincrementing primary key (id)
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    // username - need to restrict duplication
    username: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: {
          args: [6, 32],
          msg: "Username must be between 6 and 32 characters"
        }
      }
    },

    // user's first name
    firstname: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: {
          args: [2, 32],
          msg: "First name must be between 2 and 32 characters"
        }
      }
    },

    // user's last name
    lastname: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: {
          args: [2, 32],
          msg: "Last name must be between 2 and 32 characters"
        }
      }
    },

    // password hashed by npm bcrypt
    userpw: {
      type: DataTypes.STRING,
      notNull: true,
      // validate: {
      //   len: {
      //     args: [4, 50],
      //     msg: "Password must be between 4 and 50 characters"
      //   }
      // }
    },

    // user's email address 
    email: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: {
          args: [6, 50],
          msg: "Email must be between 6 and 50 characters"
        },
        isEmail: {
          msg: "Must be in email format (foo@bar.com)"
        }
      }
    },

    // most recent 'default' location, overwritten each time user logs in
    defaultlocation: DataTypes.STRING,
    // UPDATE

    // user's favorites
    favorites: DataTypes.STRING,
    // UPDATE

  });

  return User;
};
