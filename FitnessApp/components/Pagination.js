import { StyleSheet, View, Animated, Dimensions } from "react-native"


const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, show}) => {
    return (
        <View style={[styles.container, {display: show ? 'flex' : 'none'}]}>
            {
                data.map((_, idx) => {
                    const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                      const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.2, 1, 0.1],
                        extrapolate: 'clamp',
                      });
              
                      const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#a9a9a9', 'white', '#a9a9a9'],
                        extrapolate: 'clamp',
                      });



                    return (<Animated.View key={idx.toString()} style={[styles.dot, { backgroundColor}]}/>);
                })
            }
        </View>
    );
}

export default Pagination;


const styles = StyleSheet.create({
    dot: {
        width: 9 ,
        height: 9,
        borderRadius: 6,
        backgroundColor: '#a9a9a9',
        marginHorizontal: 3
    },
    container: {
        position: 'absolute',
        bottom: 60,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});