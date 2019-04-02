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
        initial_occurences_number: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        final_occurences_number: {
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
        points_type: {
            type: DataTypes.STRING,
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