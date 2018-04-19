module.exports = function(sequelize, Sequelize) {
    var Hour = sequelize.define('hour', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        activity_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        day_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hour_number: {
            type: Sequelize.INTEGER,
            notEmpty: true
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

    return Hour;
}