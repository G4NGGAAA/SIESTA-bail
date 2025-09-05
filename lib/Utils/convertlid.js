"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lidToJid = lidToJid;
exports.clearLidCache = clearLidCache;
exports.getLidCacheSize = getLidCacheSize;
exports.addToLidCache = addToLidCache;
exports.removeFromLidCache = removeFromLidCache;
exports.getLidCacheKeys = getLidCacheKeys;
exports.findJidByPhoneNumber = findJidByPhoneNumber;
const WABinary_1 = require("../WABinary");
const lidCache = new Map();
async function lidToJid(sock, lid, groupIdOrOpts) {
    if (!lid)
        throw new Error('LID kosong');
    if ((0, WABinary_1.isJidUser)(lid) || (0, WABinary_1.isJidGroup)(lid) || (0, WABinary_1.isJidBroadcast)(lid) ||
        (0, WABinary_1.isJidStatusBroadcast)(lid) || (0, WABinary_1.isJidNewsletter)(lid) || (0, WABinary_1.isJidMetaAi)(lid)) {
        return (0, WABinary_1.jidNormalizedUser)(lid);
    }
    const opts = typeof groupIdOrOpts === 'string' ? { groupId: groupIdOrOpts } : (groupIdOrOpts || {});
    const force = opts.force !== false;
    const skipCache = opts.skipCache === true;
    const { groupId } = opts;
    if (!skipCache && lidCache.has(lid)) {
        return lidCache.get(lid);
    }
    if (groupId && (0, WABinary_1.isJidGroup)(groupId)) {
        try {
            const meta = await sock.groupMetadata(groupId);
            const participant = findParticipantByLid(meta.participants, lid);
            if (participant === null || participant === void 0 ? void 0 : participant.jid) {
                const normalizedJid = (0, WABinary_1.jidNormalizedUser)(participant.jid);
                lidCache.set(lid, normalizedJid);
                return normalizedJid;
            }
        }
        catch (error) {
            console.debug('Gagal mengambil metadata grup:', error);
        }
    }
    try {
        if (typeof sock.decodeJid === 'function') {
            const dj = sock.decodeJid(lid);
            if ((0, WABinary_1.isJidUser)(dj) || (0, WABinary_1.isJidGroup)(dj)) {
                const normalizedJid = (0, WABinary_1.jidNormalizedUser)(dj);
                lidCache.set(lid, normalizedJid);
                return normalizedJid;
            }
        }
    }
    catch (error) {
        console.debug('Gagal decodeJid:', error);
    }
    if ((0, WABinary_1.isLidUser)(lid)) {
        try {
            const raw = lid.replace(/@lid$/, '');
            const results = await sock.onWhatsApp(raw);
            if (results && results.length > 0) {
                const result = results[0];
                if ((result === null || result === void 0 ? void 0 : result.exists) && result.jid) {
                    const normalizedJid = (0, WABinary_1.jidNormalizedUser)(result.jid);
                    lidCache.set(lid, normalizedJid);
                    return normalizedJid;
                }
            }
        }
        catch (error) {
            console.debug('Gagal onWhatsApp:', error);
        }
    }
    if (force) {
        if ((0, WABinary_1.isLidUser)(lid)) {
            const forced = lid.replace(/@lid$/, '@s.whatsapp.net');
            const normalizedJid = (0, WABinary_1.jidNormalizedUser)(forced);
            lidCache.set(lid, normalizedJid);
            return normalizedJid;
        }
        if (/^\d{5,}$/.test(lid)) {
            const forced = `${lid}@s.whatsapp.net`;
            const normalizedJid = (0, WABinary_1.jidNormalizedUser)(forced);
            lidCache.set(lid, normalizedJid);
            return normalizedJid;
        }
    }
    return lid;
}
function findParticipantByLid(participants, lid) {
    for (const participant of participants) {
        const participantJid = (0, WABinary_1.jidNormalizedUser)(participant.jid);
        const participantId = (0, WABinary_1.jidNormalizedUser)(participant.id);
        const participantLid = (0, WABinary_1.jidNormalizedUser)(participant.lid);
        if (participantLid === lid ||
            (0, WABinary_1.areJidsSameUser)(participantId, lid) ||
            (0, WABinary_1.areJidsSameUser)(participantJid, lid) ||
            (participantJid && (0, WABinary_1.areJidsSameUser)(participantJid.replace(/@s\.whatsapp\.net$/, '@lid'), lid)) ||
            (participantId && (0, WABinary_1.areJidsSameUser)(participantId.replace(/@s\.whatsapp\.net$/, '@lid'), lid))) {
            return participant;
        }
    }
    return undefined;
}
function extractParticipantsFromGroupNode(groupNode) {
    const participants = [];
    const participantNodes = (0, WABinary_1.getBinaryNodeChildren)(groupNode, 'participant');
    for (const node of participantNodes) {
        const participant = {
            id: node.attrs.jid,
            jid: (0, WABinary_1.isJidUser)(node.attrs.jid) ? node.attrs.jid : (0, WABinary_1.jidNormalizedUser)(node.attrs.phone_number),
            lid: (0, WABinary_1.isLidUser)(node.attrs.jid) ? node.attrs.jid : node.attrs.lid,
            admin: (node.attrs.type || null)
        };
        participants.push(participant);
    }
    return participants;
}
function clearLidCache() {
    lidCache.clear();
}
function getLidCacheSize() {
    return lidCache.size;
}
function addToLidCache(lid, jid) {
    lidCache.set(lid, (0, WABinary_1.jidNormalizedUser)(jid));
}
function removeFromLidCache(lid) {
    return lidCache.delete(lid);
}
function getLidCacheKeys() {
    return Array.from(lidCache.keys());
}
async function findJidByPhoneNumber(sock, phoneNumber) {
    try {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const results = await sock.onWhatsApp(cleanNumber);
        if (results && results.length > 0) {
            const result = results[0];
            if ((result === null || result === void 0 ? void 0 : result.exists) && result.jid) {
                return (0, WABinary_1.jidNormalizedUser)(result.jid);
            }
        }
        return null;
    }
    catch (error) {
        console.debug('Gagal mencari JID berdasarkan nomor telepon:', error);
        return null;
    }
}
