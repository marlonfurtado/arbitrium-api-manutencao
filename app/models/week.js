module.exports = function(sequelize, DataTypes) {
    var Week = sequelize.define('week', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        week_number: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        is_next_week: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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

    return Week;
}