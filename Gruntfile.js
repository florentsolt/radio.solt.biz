module.exports = function(grunt) {

  grunt.initConfig({
    nodewebkit: {
      options: {
        name: "Radio.Solt.Biz",
        version: '0.11.0',
        build_dir: './build',
        mac_icns: './icon/icon.icns',
        winIco: './icon/icon.ico',
        mac: true,
        win: true,
        linux32: false,
        linux64: false
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
      main: ['build/*'],
      cache: ['cache/*']
    },
    copy: {
      main: {
        files: [
        {
          src: 'libraries/win/ffmpegsumo.dll',
          dest: 'build/Radio.Solt.Biz/win/ffmpegsumo.dll',
          flatten: true
        },
        {
          src: 'libraries/osx/ffmpegsumo.so',
          dest: 'build/Radio.Solt.Biz/osx/Radio.Solt.Biz.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
          flatten: true
        }
        ]
      }
    },
    compress: {
      osx: {
        options: {
          archive: 'dist/osx.zip'
        },
        files: [
          {expand: true, cwd: 'build/Radio.Solt.Biz/osx', src: ['**'], dest: ''}
        ]
      },
      win: {
        options: {
          archive: 'dist/win.zip'
        },
        files: [
          {expand: true, cwd: 'build/Radio.Solt.Biz/win', src: ['**'], dest: ''}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['nodewebkit', 'copy']);

};