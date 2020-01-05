import React from 'react';
import PropTypes from 'prop-types';
const $ = window.$;

class TagCloud extends React.Component {
  componentDidMount() {
    const displayTags = this.props.tags.length > 300 ? this.props.tags.slice(0, 300) : this.props.tags;
    const entries = displayTags.map(tag => ({
      label: tag
    }));
    const settings = {
      entries: entries,
      width: 2500,
      height: 1024,
      radius: '75%',
      radiusMin: 75,
      bgDraw: false,
      opacityOver: 1,
      opacityOut: 0.05,
      opacitySpeed: 6,
      fov: 800,
      speed: 0.2,
      fontFamily: 'cursive, Oswald, Arial, sans-serif',
      fontSize: '22',
      fontColor: '#f0f8ff59',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      fontToUpperCase: false
    };
    this.$el = $(this.el);
    this.$el.svg3DTagCloud( settings );
  }

  render() {
    return (
        <div className="tag-cloud" ref={el => this.el = el} />
    );
  }
}
TagCloud.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagCloud;
