


function QuoteModal() {
    return (
        <Modal
        animationType="none"

        transparent={false}
        visible={modalStartVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalStartVisible(!modalStartVisible);
            }}>
                <Pressable onPress={modalPressHandler}>
                    <View style={{height: windowHeight, width: windowWidth, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.View style={{opacity: fadeAnim}}>
                        <Text style={{color: 'white'}}>
                            Insert Quote
                        </Text>
                        </Animated.View>
                    </View>
                </Pressable>
            </Modal>
    );
}
export default QuoteModal;