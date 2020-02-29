import babel from 'rollup-plugin-babel';

module.exports = {
    input: 'src/url.js',
    output: {
        file: 'dist/url.js',
        format: 'umd',
        name: 'jcurl'
    },
    plugins: [
        babel()
    ]
};
