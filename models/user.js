module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {});
  user.associate = function (models) {
    // associations can be defined here
    console.log(models);
  };
  return user;
};
