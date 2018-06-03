// 用户
export interface User {
    id?:            string;
    email:          string;
    password:       string;
    name:           string;
    avatar:         string;
    projectIds:     string[];
    taskIds:        string[];
    address?:       Address;
    dateOfBirth?:   string;
    identity?:      Identity;
}

// 地址
export interface Address {
    id?:            string;
    province:       string;
    city:           string;
    district:       string;
    street?:        string;
}

// 身份
export interface Identity {
    identityNo:     string;
    identityType:   IdentityType;
}

// 证件类型
export enum IdentityType {
    Idcard = 0,
    Insurance,
    Passport,
    Military,
    Other
}
