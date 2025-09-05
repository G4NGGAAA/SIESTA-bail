export interface LidToJidOpts {
    groupId?: string;
    force?: boolean;
    skipCache?: boolean;
}
export declare function lidToJid(sock: any, lid: string, groupId?: string): Promise<string>;
export declare function clearLidCache(): void;
export declare function getLidCacheSize(): number;
export declare function addToLidCache(lid: string, jid: string): void;
export declare function removeFromLidCache(lid: string): boolean;
export declare function getLidCacheKeys(): string[];
export declare function findJidByPhoneNumber(sock: any, phoneNumber: string): Promise<string | null>;
