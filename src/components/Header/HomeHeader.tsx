import { Image } from "react-native";

export const HomeHeader = () => {
    return <Image source={require('../../assets/imgs/logo.png')} resizeMode='contain' style={{width:200, alignSelf: 'center'}}/>
}