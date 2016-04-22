import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  MapView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';


//const windowSize = Dimensions.get('window');

/*

  Example directions object:
  {
    steps: [
       {
          instructions: 'Turn right on Powell',
          duration: '2'
       },
       {
          instructions: 'Dodge screaming person on the right',
          duration: '1'
       }
    ]
    leg: {
      endAddress: parsedBody.routes[0].legs[0].end_address,
      startAddress: parsedBody.routes[0].legs[0].start_address,
      durationText: parsedBody.routes[0].legs[0].duration.text,
      distanceText: parsedBody.routes[0].legs[0].distance.text
    }
  }
*/
class Directions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
     return (
      <View style={styles.DirectionsContainer} >
      <MapView
        style={styles.map}
        region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
        showsUserLocation={true}
        followUserLocation={true}
      />
        {
          <View style={styles.directions}>
            <Text>Starting Address: {this.props.directions.leg.startAddress}</Text> 
            <Text>Ending Address: {this.props.directions.leg.endAddress}</Text> 
            <Text>Total Time: {this.props.directions.leg.durationText}</Text> 
            <Text>Total Distance: {this.props.directions.leg.distanceText}</Text> 
          </View>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  DirectionsContainer: {
    flex: 1,
    
  },
  directions: {
    padding: 10
  },
  map: {
    height: 200,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  }
});

export default Directions;