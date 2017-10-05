import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Easing,
  Animated
} from 'react-native';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderColor: '#BDBDC1',
    borderWidth: 1,
    backgroundColor: "#ffffff"
  }
});

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const {height} = this.props;

    Animated.timing(this.state.height, {
      toValue: height * 3,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const {items, positionX, positionY, show, onPress, width, height} = this.props;

    if (!show) {
      return null;
    }

    const renderedItems = React.Children.map(items, (item) => {
      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value)}>
          <View>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={[styles.container, this.props.popupStyle]}>
        {(this.props.title !== undefined)
          && <View style={[{padding: 15}, this.props.titleWrapperStyle]}>
            <Text style={[{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}, this.props.titleStyle]}>
              {this.props.title}
            </Text>
          </View>}
        <AnimatedScrollView
          style={[{flex: 1, minWidth: 200}, this.props.scrollViewStyle]}
          automaticallyAdjustContentInsets={false}
          bounces={false}
        >
          {renderedItems}
        </AnimatedScrollView>
      </View>
    );
  }
}

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {}
};

module.exports = Items;
