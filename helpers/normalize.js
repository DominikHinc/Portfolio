import { Dimensions, Platform, PixelRatio } from "react-native";

const BASE_WIDTH = 1920;
const SCREEN_WIDTH = Dimensions.get('window').width

const scale = SCREEN_WIDTH / BASE_WIDTH;

export const normalizeFontSize = (size)=>{
    return size;
    // const newSize = size * scale
    // return Math.round(PixelRatio.roundToNearestPixel(newSize))
    // const newSize = size * scale
    // if(Platform.OS ==='android'){
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    // }else{
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize))
    // }
}

//Seperating them just in case i will want to change it in some way just for specyifc component types

export const normalizeIconSize = (size) =>{
    return normalizeFontSize(size);
}

export const normalizePaddingSize = (size)=>{
    return normalizeFontSize(size);
}

export const normalizeMarginSize = (size)=>{
    return normalizeFontSize(size);
}

export const normalizeBorderRadiusSize = (size)=>{
    return normalizeFontSize(size); 
}
export const normalizeWidth = (size)=>{
    return normalizeFontSize(size);
}
export const normalizeHeight = (size)=>{
    return normalizeFontSize(size);
}