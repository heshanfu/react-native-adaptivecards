import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ConfigManager } from '../../Config/ConfigManager';
import { ActionType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { BackgroundImageView } from '../CardElements/BackgroundImage';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.renderTouchableBlock = (backgroundColor) => {
            return (React.createElement(Touchable, { onPress: this.onPress, disabled: this.state.disabled, accessibilityRole: 'button', style: {
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor,
                } }, this.renderContent()));
        };
        this.renderNonTouchableBlock = (backgroundColor) => {
            return (React.createElement(View, { style: {
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor
                } }, this.renderContent()));
        };
        this.renderContent = () => {
            const { model, theme } = this.props;
            if (!model) {
                return undefined;
            }
            const background = model.backgroundImage;
            if (background && background.url) {
                return (React.createElement(BackgroundImageView, { model: background, theme: theme }, this.renderItems()));
            }
            return this.renderItems();
        };
        this.renderItems = () => {
            const { model } = this.props;
            if (!model) {
                return undefined;
            }
            if (model.items) {
                return model.items.map((content, index) => ContentFactory.createView(content, index, model.style || this.props.theme));
            }
            return undefined;
        };
        this.onPress = () => {
            const { model } = this.props;
            if (model && model.selectAction && model.selectAction.onAction) {
                model.selectAction.onAction(() => {
                    console.log('Action Success');
                    if (this.hasOneTimeAction) {
                        this.setState({
                            disabled: true,
                        });
                    }
                }, (error) => {
                    console.log('Action Failed >> ', error);
                });
            }
        };
        this.state = {
            disabled: false,
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        let backgroundColor = StyleManager.getBackgroundColor(model.style);
        if (model.selectAction) {
            return this.renderTouchableBlock(backgroundColor);
        }
        else {
            return this.renderNonTouchableBlock(backgroundColor);
        }
    }
    get hasOneTimeAction() {
        return ConfigManager.getInstance().getConfig().mode === 'release' && this.props.model.selectAction && this.props.model.selectAction.type === ActionType.Submit;
    }
    get justifyContent() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        switch (model.verticalContentAlignment) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    }
    get alignSelf() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        if (model.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }
    get flex() {
        const { model } = this.props;
        if (!model || model.width === 'auto') {
            return 0;
        }
        if (model.width === undefined || model.width === 'stretch') {
            return 1;
        }
        return model.width;
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
