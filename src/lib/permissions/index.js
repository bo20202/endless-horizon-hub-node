const config = require("./permissions.config")

module.exports = {
    getPermissionsFromRole(role){
        let permissions = []
        return permissions.concat(config.roles[role])
    },
    permissions: config.permissions
}