import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import RSSFeed from '../components/RSSFeed';
import * as RSSActions from '../actions/rss';

function mapStateToProps(state) {
  return {
    RSS: state.RSS,
    RSSUrl: state.RSSUrl
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, RSSActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RSSFeed);
