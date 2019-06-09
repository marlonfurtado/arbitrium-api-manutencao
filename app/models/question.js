module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('question', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        interview_id: { type: DataTypes.INTEGER, allowNull: false },
        event_id: { type: DataTypes.INTEGER, allowNull: false },
        question_appears_datetime: { type: DataTypes.DATE, allowNull: true },
        answered_question_datetime: { type: DataTypes.DATE, allowNull: true },
        choice: { type: DataTypes.ENUM('F', 'W'), allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
    }, { underscored: true });
    return Question;
}