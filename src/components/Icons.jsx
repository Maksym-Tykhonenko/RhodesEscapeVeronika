import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/panel/1.png');
      active && iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../assets/panel/2.png');
      active && iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../assets/panel/3.png');
      active && iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../assets/panel/4.png');
      active && iconStyle.push(styles.active);
      break;
    case 'back':
      imageSource = require('../assets/icons/back.png');
      break;
    case 'fav':
      imageSource = require('../assets/icons/fav.png');
      active && iconStyle.push(styles.active);
      break;
    case 'map':
      imageSource = require('../assets/icons/map.png');
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'cross':
      imageSource = require('../assets/icons/cross.png');
      break;
    case 'cross-img':
      imageSource = require('../assets/icons/cross-img.png');
      break;
    case 'settings-fav':
      imageSource = require('../assets/icons/settings-fav.png');
      break;
    case 'settings-policy':
      imageSource = require('../assets/icons/settings-policy.png');
      break;
    case 'settings-rate':
      imageSource = require('../assets/icons/settings-rate.png');
      break;
    case 'success':
      imageSource = require('../assets/icons/success.png');
      break;
    case 'locked':
      imageSource = require('../assets/icons/locked.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#d8b281',
  }
});

export default Icons;
