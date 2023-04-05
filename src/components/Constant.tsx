import { PixelRatio } from 'react-native'

const TextButtons = parseInt(PixelRatio.getFontScale() * 19.57 + "");//20 - 2
const APILogin = "https://crm.intermoda.hn:41443/api/";
export { TextButtons, APILogin }