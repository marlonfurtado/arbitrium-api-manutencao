module.exports = function(sequelize, DataTypes) {
    var Interview = sequelize.define('interview', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        researcher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        initial_date: {
            type: DataTypes.DATE,
            notEmpty: true
        },
        conclusion_date: {
            type: DataTypes.DATE,
            allowNull: true
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
        underscored:true
    });

    return Interview;
}