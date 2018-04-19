module.exports = function(sequelize, Sequelize) {
    var ActivityPunctuation = sequelize.define('activity_punctuation', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        activity_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        occurrences_number: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        family_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        health_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        money_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        work_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        family_bonus_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        health_bonus_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        money_bonus_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        work_bonus_points: {
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

    return ActivityPunctuation;
}