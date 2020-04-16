import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import Footer from '../components/Footer'
import ProjectDetailsTemplate from '../components/ProjectDetailsTemplate'
import { HealthAdvisorDetails } from '../constants/PersonalData/ProjectsDetails/HealthAdvisor'
import { TAB_BAR_HEIGHT } from '../constants/TABBAR'
import { ColorsContext } from '../helpers/ColorsContext'

const ProjectDetailsScreen = ({ route, navigation }) => {
    const {colors} = useContext(ColorsContext)

    const {projectDetails} = route.params;

    const insets = useSafeArea();

    return (
        <View style={[styles.screen,{backgroundColor:colors.background}]}>
            <ScrollView style={[styles.scrollView, {marginTop:TAB_BAR_HEIGHT + insets.top}]} contentContainerStyle={styles.scrollViewContainer} >
                <ProjectDetailsTemplate data={projectDetails} />
                <Footer/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
      
    },
    scrollView:{
        
        width:'100%'
    },
})


export default ProjectDetailsScreen