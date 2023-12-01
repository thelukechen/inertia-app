import { View, Image} from 'react-native';
function IButton({style}) {



    return(
        <View style={style}>
                <Image source={require('../assets/i_logo_transparent.png')} style={{height: 30, width: 30}}></Image>
        </View>
    );
}

export default IButton;