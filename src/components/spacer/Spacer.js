const { html } = include('src/libs/simpleHTML/SimpleHTML.js');

const Spacer = () => html('div', { style: 'height: 20px' }, []);

module.exports = Spacer;
