##Endless Hub

This is hub for Space Station 13 server "Endless Horizon".

This app is capable of:
    * Interacting with database by REST Api with following endpoints: [WIP]
        * /bans/ - GET all bans ordered by date (TODO: implement search by query params(admin_ckey, ckey, reason)
        * /bans/id - GET specific ban and PATCH expiration date, reason and remove ban
        * /admins/ - GET all admins with their flags and ranks
        * /admins/id/ - GET admin by id, PATCH flags and rank, DELETE to remove adminrights from user
    
other sections are WIP
        