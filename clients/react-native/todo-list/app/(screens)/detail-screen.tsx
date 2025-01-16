import { Divider, Layout, TopNavigation, TopNavigationAction, Text, Icon } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );
  
  export default function DetailsScreen({ navigation }){
  
    const navigateBack = () => {
      navigation.goBack();
    };
  
    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
        <Divider/>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text category='h1'>DETAILS</Text>
        </Layout>
      </SafeAreaView>
    );
  };