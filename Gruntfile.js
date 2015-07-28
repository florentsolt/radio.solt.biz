module.exports = function(grunt) {

  grunt.initConfig({
    nodewebkit: {
      options: {
        name: "Radio.Solt.Biz",
        version: '0.11.6',
        build_dir: './build',
        mac_icns: './icon/icon.icns',
        winIco: './icon/icon.ico',
        platforms: ['osx32', 'win32']
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
      build: ['build/*'],
      cache: ['cache/*']
    },
    copy: {
      main: {
        files: [
        {
          src: 'libraries/win32/ffmpegsumo.dll',
          dest: 'build/Radio.Solt.Biz/win32/ffmpegsumo.dll'
        },
        {
          src: 'libraries/osx32/ffmpegsumo.so',
          dest: 'build/Radio.Solt.Biz/osx32/Radio.Solt.Biz.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so'
        },
        {
          src: 'libraries/osx64/ffmpegsumo.so',
          dest: 'build/Radio.Solt.Biz/osx64/Radio.Solt.Biz.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so'
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
          {expand: true, cwd: 'build/Radio.Solt.Biz/osx32', src: ['**'], dest: ''}
        ]
      },
      win: {
        options: {
          archive: 'dist/win.zip'
        },
        files: [
          {expand: true, cwd: 'build/Radio.Solt.Biz/win32', src: ['**'], dest: ''}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['clean:build', 'nodewebkit', 'copy']);

};