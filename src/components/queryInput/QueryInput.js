const { ExpandableTextArea } = include('src/components/queryInput/atoms.js');

const QueryInput = value =>
  ExpandableTextArea(value).setStyle({
    borderRadius: '5px',
    fontFamily: '"Courier New", Courier, monospace',
    background: 'whiteSmoke',
    minHeight: '10em',
    overflow: 'hidden',
    outline: 'none',
    padding: '10px',
    border: 'none',
    resize: 'none',
    width: '100%',
  });

module.exports = QueryInput;
