import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, Dimensions, Animated, Easing } from 'react-native'
import Colors from '../constants/Colors'
import { TAB_BAR_HEIGHT, TAB_BAR_REAL_HEIGHT } from '../constants/TABBAR'
import { normalizeHeight, normalizePaddingSize, normalizeIconSize } from '../helpers/normalize'
import DefaultText from '../components/DefaultText'
import { headerMainStyle, headerSecondaryStyle } from '../constants/FontStyles'
import MyProjectsSection from '../components/MyProjectsSection'
import { ColorsContext } from '../helpers/ColorsContext'
import { Ionicons } from '@expo/vector-icons'
import { useSafeArea } from 'react-native-safe-area-context'
import AboutMeSection from '../components/AboutMeSection'
import Footer from '../components/Footer'


const HomeScreen = (props) => {
    console.log(Dimensions.get('window').width)
    const { colors } = useContext(ColorsContext)
    const currentContentOffset = new Animated.Value(0)
    const callToActionAnimatedValue = new Animated.Value(0)

    const [shouldCallToActionAnimationStop, setShouldCallToActionAnimationStop] = useState(false)
    const [showCallToActionIcon, setShowCallToActionIcon] = useState(true)

    const insets = useSafeArea();

    useEffect(() => {
        if (showCallToActionIcon) {
            setTimeout(startCallToActionAnimation,1000)
        }
    }, [showCallToActionIcon])
    useEffect(()=>{
        if (showCallToActionIcon) {
            callToActionAnimatedValue.setValue(0)
            setTimeout(startCallToActionAnimation,1000)
        }
    },[colors])

    const onScrollHandler = (e) => {
        // if (e.nativeEvent.contentOffset.y > 20 && shouldCallToActionAnimationStop === false) {
        //     setShouldCallToActionAnimationStop(true)
        // }
        // if (e.nativeEvent.contentOffset.y <= 20 && shouldCallToActionAnimationStop === true) {
        //     console.log(e.nativeEvent.contentOffset.y)
        //     setShouldCallToActionAnimationStop(false)
        //     startCallToActionAnimation()
        // }
        // if (e.nativeEvent.contentOffset.y > Dimensions.get('window').height / 5) {
        //     callToActionAnimatedValue.setValue(0)
        //     setShowCallToActionIcon(false)
        // } else {
        //     callToActionAnimatedValue.setValue(0)
        //     setShowCallToActionIcon(true)
        // }
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);
    }

    const startCallToActionAnimation = () => {
        callToActionAnimatedValue.setValue(0)
        Animated.spring(callToActionAnimatedValue, {
            toValue: callToActionAnimatedValue._value === 0 ? 1 : 0,
            damping: 20,
            velocity: -10,

        }).start(() => {
            if (shouldCallToActionAnimationStop === false) {
                setTimeout(startCallToActionAnimation, 1000)
            }
        })
    }

    const imageOpacity = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('window').height - TAB_BAR_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    const imageHeight = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('window').height - TAB_BAR_HEIGHT],
        outputRange: [Dimensions.get('window').height, 0],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    const callToActionIconMargin = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('window').height / 5],
        outputRange: [0, -200],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    const callToActionIconAnimationState = {
        transform: [{
            translateY: callToActionAnimatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -20, 0]
            }),

        }, {
            scale: callToActionAnimatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.9, 1]
            }),
        },
        {
            rotate: callToActionAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            }),
        }
        ]
    }

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <Animated.View style={[styles.headerView, { backgroundColor: colors.first, opacity: imageOpacity, height: imageHeight, }]}>
                <ImageBackground style={styles.headerImage} source={require("../assets/Images/Desk.png")}>
                    <DefaultText style={{ ...headerMainStyle, color: 'white' }}>Hey there, I'm Dominik Hinc</DefaultText>
                    <DefaultText style={{ ...headerSecondaryStyle, color: 'white' }}>I'm a mobile app developer</DefaultText>
                    <Animated.View style={[styles.callToActionIconContainer, callToActionIconAnimationState, {opacity:showCallToActionIcon ? 1 : 0, marginBottom:callToActionIconMargin}]}>
                        <Ionicons name="ios-arrow-dropdown" size={normalizeIconSize(50)} />
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
            <ScrollView style={[styles.screenScrollView,{marginTop: TAB_BAR_HEIGHT + insets.top,}]} contentContainerStyle={[styles.scrollViewInnerContainer, { paddingTop: Dimensions.get('window').height, }]}
                onScroll={onScrollHandler} onMomentumScrollEnd={onScrollHandler} onScrollBeginDrag={onScrollHandler} scrollEventThrottle={1}>
                <View style={[styles.screenUseableContainer, { backgroundColor: colors.background }]}>
                    <View style={styles.projectsSectionTitleContainer}>
                        <DefaultText style={headerSecondaryStyle}>My Projects:</DefaultText>
                    </View>
                    <View style={styles.projectsSectionContainer}>
                        <MyProjectsSection navigation={props.navigation} />
                    </View>

                    <View style={styles.aboutMeSectionContainer}>
                        <AboutMeSection/>
                    </View>
                    <View>
                        <Footer/>
                    </View>
                </View>
            </ScrollView>
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
        paddingTop: normalizePaddingSize(20),

    },
    projectsSectionTitleContainer: {
        width: '100%',
        alignItems: 'center'
    },
    callToActionIconContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',

    }
})


export default HomeScreen
