import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  
} from 'react-native';

import {getAllEvents} from '../helpers/request-helpers';
import {getDirections, deleteEvent} from '../helpers/request-helpers';

import Directions from './directions-event';
import AllEvents from './all-events';

var Icon = require('react-native-vector-icons/Ionicons');
var Accordion = require('react-native-accordion');

const deviceWidth = Dimensions.get('window').width;

class Event extends Component {

  constructor(props) {
    super(props);
    console.log('event prop', this.props.event.eventName);
    this.state = {
      directions: {
        steps: [
           {
              instructions: '',
              duration: ''
           }
        ],
        leg: {
          endAddress: '',
          startAddress: '',
          durationText: '',
          distanceText: ''
        },
        overviewPolyLines: [],
        region: {},
        markers: {}
      } 
    };
  }
  
getEventDirections(event) {
    var that = this;
  
    // get current position first
    navigator.geolocation.getCurrentPosition((position) => {
      //on success, call getDirections from request-helpers
      getDirections(event, position, that);
    },
    (error) => console.log(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});   
    

  }

  removeEvent(event) {
    deleteEvent(event.id, this.props.buttonClicked);
  }

  editEvent(event) {
    console.log('edit event');
  }

  displayTime(time) {
    var dateTime = time.toString();
    var hours = dateTime.substring(16,18);
    var postfix;
    if (Number(hours) > 12) {
      postfix = 'PM';
      hours = hours - 12;
    } else {
      postfix = 'AM';
    }
    var minutes = dateTime.substring(19,21);
    return hours + ':' + minutes + ' ' + postfix;
  }

  render() {

    var header = (
      <View>

       <Text style={styles.accordianHeader}>
        <Icon name='android-walk' size={25}></Icon>
        <Text style={styles.padLeft}>  Directions</Text>
       </Text>
        
      </View>
    );
 
    var content = (   
        <View>
          <Directions directions = {this.state.directions} />
          <Text></Text>
        </View>
    );

    return (
      <View style={styles.EventContainer}>
        <View style={styles.EventButtonRow}>
          <Icon name="edit" style={styles.buttonStyle} onPress={this.editEvent.bind(this, this.props.event)}></Icon>
          <View style={styles.ButtonEnd}>
            <Icon name="android-cancel" style={styles.deleteButton} onPress={this.removeEvent.bind(this, this.props.event)}></Icon> 
          </View> 
        </View> 
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Event:</Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.eventName} @ {this.displayTime(this.props.event.eventTime)} on {this.props.event.eventTime.substring(0,10)}</Text>
          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Where: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.address}</Text>
            <Text style={styles.EventText}>{this.props.event.city} {this.props.event.state}</Text>

          </View>
        </View>
        <View style={styles.EventRow}>
          <Text style={styles.EventTitle}>Getting there by: </Text>
          <View style={styles.EventInput}>
            <Text style={styles.EventText}>{this.props.event.mode}</Text>
          </View>
        </View>   
        <View style={styles.EventRow}>
          <Icon.Button name="android-cancel" backgroundColor="#cc0000" onPress={this.removeEvent.bind(this, this.props.event)}>
            <Text style={styles.buttonText}>Delete</Text>
          </Icon.Button>  
        </View>       
         <Accordion
            header={header}
            content={content}
            easing="easeOutCubic"
            onPress={this.getEventDirections.bind(this, this.props.event)}
            style={styles.accordian}
          />
      </View>
    );
  }
};


const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginRight: 15,
    color: "#FFFFFF",
  },
  deleteButton : {
    borderRadius: 0,
    color: "#cc0000",
  },
  EventContainer: {
    flex: 1,
    margin: 7,
    marginTop: 0,
    padding: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F5F5F6',
    borderBottomWidth: 1
  },
  EventRow: {
    flex: 1,
    flexDirection:'row',
    padding: 5
  },
  Event2Row: {
    flex: .6,
    flexDirection:'row',
  },
  EventButtonRow: {
    flex: 1,
    // flexDirection:'row',
    marginTop: -5,
    alignItems: 'flex-end',
    
  },
  ButtonEnd: {
    flex: 1,
    flexDirection:'row',
  },
  EventTitle: {
    margin: 5,
    fontSize: 14,
    color: '#ACB2BE',
    textDecorationLine: 'underline'
  },
  EventInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
  EventText: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#F5F5F6',
  },
  welcome: {
    margin: 20,
    fontSize: 20,
    color: '#ACB2BE',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  button: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  buttonText: {
    fontSize: 16,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Light',
  },

  // iconButton: {
  //   padding: 15,
  //   width: deviceWidth,
  //   alignItems: 'center',
  //   backgroundColor: '#34778A',
  // },
  padLeft: {
    paddingLeft: 25,
  },

  accordian: {
    flex: 1,
    padding: 0
  }, 

  accordianHeader: {
    padding: 10,
    fontSize: 16,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  padLeft: {
    paddingLeft: 25
  }
});


export default Event;