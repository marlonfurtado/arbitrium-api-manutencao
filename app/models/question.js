module.exports = function(sequelize, Sequelize) {
    var Question = sequelize.define('question', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        interview_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        event_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        question_appears_datetime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        answered_question_datetime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        choice: {
            type: Sequelize.ENUM('F', 'W'),
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    }, {
        underscored: true
    });

    return Question;
}