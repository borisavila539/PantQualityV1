import { PixelRatio } from 'react-native'

const TextButtons = parseInt(PixelRatio.getFontScale() * 19.57 + "");//20 - 2
const TextoPantallas = parseInt(PixelRatio.getFontScale()*15.22 + "");//16 - 2
const ObjectHeigth = parseInt(PixelRatio.getFontScale()*35.87 +"");//35 - 2
const APILogin = "https://crm.intermoda.hn:41443/api/";
const FontFamily = 'sans-serif';
export { TextButtons, APILogin, TextoPantallas, FontFamily ,ObjectHeigth}