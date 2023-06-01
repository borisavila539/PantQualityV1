import { PixelRatio } from 'react-native'

const TextButtons = parseInt(PixelRatio.getFontScale() * 19.57 + "");//20 - 2
const TextoPantallas = parseInt(PixelRatio.getFontScale() * 15.22 + "");//16 - 2
const ObjectHeigth = parseInt(PixelRatio.getFontScale() * 35.87 + "");//35 - 2
const TextoHeader = parseInt(PixelRatio.getFontScale() * 17.39 + "");//18 - 2
const IconHeader = parseInt(PixelRatio.getFontScale() * 41.30 + "");//40 - 2
const APIFinanzas = "http://localhost:5001/api/";
const FontFamily = 'sans-serif';

export { TextButtons, TextoPantallas, FontFamily, ObjectHeigth, TextoHeader, APIFinanzas, IconHeader }