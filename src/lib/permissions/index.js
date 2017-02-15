const config = require("./permissions.config")

module.getPermissionsFromRole = function (role) {
    let permissions = []
    return permissions.concat(config.roles[role])
}

module.getPermissionObject = function() {
    return config.permissions
}