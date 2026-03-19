// import Employee from "./employees.js";
// import Profile from "./profile.js";
// import Role from "./role.js";
// import Skill from "./skill.js";
// import User from "./user.js";
// import UserSkill from "./user_skill.js";

// //one to one
// User.hasOne(Profile, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// Profile.belongsTo(User, { foreignKey: "userId" });

// // one to many
// Role.hasMany(User, { foreignKey: "roleId" ,
//     onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });
// User.belongsTo(Role, { foreignKey: "roleId" });

// //Junction table -many to many
// User.hasMany(UserSkill, { foreignKey: "userId" });
// UserSkill.belongsTo(User, { foreignKey: "userId" });

// Skill.hasMany(UserSkill, { foreignKey: "skillId" });
// UserSkill.belongsTo(Skill, { foreignKey: "skillId" });

// Employee.hasMany(Employee, {
//   as: "subordinates",
//   foreignKey: "manager_id",
// });

// Employee.belongsTo(Employee, {
//   as: "manager",
//   foreignKey: "manager_id",
// });


