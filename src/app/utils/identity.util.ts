import { GB2260 } from './data/identity.data';

// 提取身份证信息
export const extractInfo = (identityNo: string) => {
    const addrPart = identityNo.substring(0, 6);
    const birthPart = identityNo.substring(6, 14);
    return {addrCode: addrPart, dateOfBirth: birthPart}
};

// 通过身份证号码获取地址
export const getAddrByCode = (code: string) => {
    const province = GB2260[code.substring(0, 2) + '0000'];
    const city = GB2260[code.substring(0, 4) + '00'].replace(province, '');
    const district = GB2260[code].replace(province + city, '');
    return {province: province, city: city, district: district}
};

// 校验地址
export const isValidAddr = (addrCode: string) => {
    return GB2260[addrCode] !== undefined;
};

// 校验日期
export const isValidDate = (dateOfBirth: string) => {};
