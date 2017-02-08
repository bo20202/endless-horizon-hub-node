const factory = require("autofixture")

factory.define('Player', [
    'ckey',
    'registered'.asDate(),
    'firstSeen'.asDate(),
    'lastSeen'.asDate(),
    'ip',
    'cid',
    'rank',
    'flags'.asNumber(),
    'password'
])

factory.define('Ban', [
    'server',
    'type',
    'ip',
    'cid',
    'reason',
    'job',
    'duration'.asNumber(),
    'time'.asDate(),
    'expirationTime'.asNumber(),
    'unbanned'.pickFrom([0, 1]),
    'unbannedTime'.asDate()
])

module.exports = factory