import { city_data } from './data/area.data';

// 获取省列表
export const getProvince = () => {
    const provinces = [];
    for (const province in city_data) {
        if (city_data.hasOwnProperty(province)) {
            const element = city_data[province];
            provinces.push(province);
        }
    }
    return provinces;
};

// 通过省获取城市列表
export const getCitiesByProvince = (province: string) => {
    if (!province || !city_data[province]) {
        return [];
    }
    const cities = [];
    const value = city_data[province];
    for (const city in value) {
        if (value.hasOwnProperty(city)) {
            const element = value[city];
            cities.push(city);
        }
    }
    return cities;
};

// 通过城市获取区县列表
export const getAreaByCity = (province: string, city: string) => {
    if (!province || !city_data[province] || !city_data[province][city]) {
        return [];
    }
    return city_data[province][city];
};
