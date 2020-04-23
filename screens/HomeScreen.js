import React, { useContext } from 'react'
import { Animated, Dimensions, Easing, ImageBackground, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import BouncingCallToActionIcon from '../components/BouncingCallToActionIcon'
import DefaultText from '../components/DefaultText'
import Footer, { FOOTER_HEIGHT } from '../components/Footer'
import MyProjectsSection from '../components/MyProjectsSection'
import Presentation from '../components/Presentation'
import { headerMainStyle, headerSecondaryStyle } from '../constants/FontStyles'
import { HomeScreenConfig } from '../constants/PersonalData/HomeScreenData'
import { TAB_BAR_HEIGHT } from '../constants/TAB_BAR'
import { ColorsContext } from '../helpers/ColorsContext'
import { normalizeHeight, normalizePaddingSize } from '../helpers/normalize'




const HomeScreen = (props) => {
    const { colors } = useContext(ColorsContext)
    const currentContentOffset = new Animated.Value(0)

    const insets = useSafeArea();

    const onScrollHandler = (e) => {
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);

    }

    const imageOpacity = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('window').height - normalizeHeight(TAB_BAR_HEIGHT) > 0 ? Dimensions.get('window').height - normalizeHeight(TAB_BAR_HEIGHT) : Dimensions.get('window').height],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    const imageHeight = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('window').height - normalizeHeight(TAB_BAR_HEIGHT) > 0 ? Dimensions.get('window').height - normalizeHeight(TAB_BAR_HEIGHT) : Dimensions.get('window').height],
        outputRange: [Platform.OS === 'web' ? Dimensions.get('window').height : Dimensions.get('screen').height, 0],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.headerView, { backgroundColor: colors.first, opacity: imageOpacity, height: imageHeight, }]}>
                <ImageBackground style={styles.headerImage} source={HomeScreenConfig.backgroundImage}>
                    <DefaultText style={{ ...headerMainStyle, color: 'white' }}>{HomeScreenConfig.title}</DefaultText>
                    <DefaultText style={{ ...headerSecondaryStyle, color: 'white' }}>{HomeScreenConfig.subTitle}</DefaultText>
                    <BouncingCallToActionIcon currentContentOffset={currentContentOffset} />
                </ImageBackground>
            </Animated.View>
            <ScrollView style={[styles.screenScrollView, { marginTop: normalizeHeight(TAB_BAR_HEIGHT) + insets.top, }]} 
            contentContainerStyle={[styles.scrollViewInnerContainer, { paddingTop: Dimensions.get('window').height,paddingBottom:normalizeHeight(FOOTER_HEIGHT) }]}
                onScroll={onScrollHandler} onMomentumScrollEnd={onScrollHandler} onScrollBeginDrag={onScrollHandler} scrollEventThrottle={1}>
                    
                <View style={[styles.screenUseableContainer, { backgroundColor: colors.background }]}>

                    <View style={[styles.projectsSectionContainer, { paddingTop: normalizePaddingSize(20) }]}>
                        <MyProjectsSection navigation={props.navigation} />
                    </View>

                    <View style={styles.aboutMeSectionContainer}>
                        <Presentation />
                    </View>

                </View>
                
            </ScrollView>
            <Footer absolute={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,


    },
    headerView: {

        width: '100%',
        position: "absolute",
    },
    headerImage: {
        width: '100%',
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenScrollView: {
        flex: 1,

    },
    scrollViewInnerContainer: {

    },
    screenUseableContainer: {
        flex: 1,

    },
    projectsSectionContainer: {
        flex: 1,
    },
    
})


export default HomeScreen
