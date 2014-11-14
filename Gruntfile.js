module.exports = function(grunt) {
  var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));

  grunt.initConfig({
    nodewebkit: {
      options: {
        name: "Radio.Solt.Biz",
        version: '0.11.0',
        build_dir: './build',
        mac_icns: './icon/icon.icns',
        mac: buildPlatforms.mac,
        win: buildPlatforms.win,
        linux32: buildPlatforms.linux32,
        linux64: buildPlatforms.linux64
      },
      src: [
        './node_modules/**', 
        '!./node_modules/grunt*/**', 
        './package.json', 
        './README.md',
        './icon/icon.icns'
      ]
    },
    clean: {
        main: ['build/releases'],
        cache: ['build/cache']
    },
    copy: {
        main: {
          files: [
            {
              src: 'libraries/win/ffmpegsumo.dll',
              dest: 'build/Radio.Solt.Biz/win/Radio.Solt.Biz/ffmpegsumo.dll',
              flatten: true
            },
            {
              src: 'libraries/osx/ffmpegsumo.so',
              dest: 'build/Radio.Solt.Biz/osx/Radio.Solt.Biz.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
              flatten: true
            }
          ]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['nodewebkit', 'copy']);

};

var parseBuildPlatforms = function(argumentPlatform) {
  // this will make it build no platform when the platform option is specified
  // without a value which makes argumentPlatform into a boolean
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

  var buildAll = /^all$/.test(inputPlatforms);

  var buildPlatforms = {
    mac: /mac/.test(inputPlatforms) || buildAll,
    win: /win/.test(inputPlatforms) || buildAll,
    linux32: /linux32/.test(inputPlatforms) || buildAll,
    linux64: /linux64/.test(inputPlatforms) || buildAll
  };

  return buildPlatforms;
}
