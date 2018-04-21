module.exports = function(sequelize, DataTypes) {
    var ActivityPunctuation = sequelize.define('activity_punctuation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        occurrences_number: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        family_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        health_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        money_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        work_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        family_bonus_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        health_bonus_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        money_bonus_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        work_bonus_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true
    });

    return ActivityPunctuation;
}