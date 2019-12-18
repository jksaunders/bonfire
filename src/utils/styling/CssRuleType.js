import PropTypes from 'prop-types';
import Sizes from './Sizes';

const CssRuleType = type =>
  PropTypes.oneOfType([type, PropTypes.instanceOf(Sizes)]);

export default CssRuleType;
