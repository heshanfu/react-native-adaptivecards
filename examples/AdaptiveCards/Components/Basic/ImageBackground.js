import React from 'react';
import { Image, StyleSheet, View, } from 'react-native';
export class ImageBackground extends React.PureComponent {
    render() {
        return (React.createElement(View, { style: [{
                    flex: this.props.flex,
                    position: 'relative',
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft
                }, this.props.containerStyle] },
            React.createElement(Image, { source: { uri: this.props.url }, style: [
                    StyleSheet.absoluteFill,
                    this.props.imageStyle
                ] }),
            this.props.children));
    }
}