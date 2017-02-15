const perms = {
    bans: {
        create: "can_create_bans",
        read: "can_read_bans",
        update: "can_update_bans",
        delete: "can_delete_bans",
    },
    admins: {
        create: "can_create_admins",
        read: "can_read_admins",
        update: "can_update_admins",
        delete: "can_update_admins",
    },
    users: {
        create: "can_create_users",
        read: "can_read_users",
        update: "can_update_users",
        delete: "can_delete_users",
    }
}

function everything() {
    let crud = []
    for (let item in perms) {
        crud = crud.concat([perms[item].create, perms[item].read, perms[item].update, perms[item].delete])
    }
    return crud
}



const ranks = {
    host: everything(),
    user: [perms.bans.read, perms.admins.read]
}

module.roles = ranks
module.permissions = perms