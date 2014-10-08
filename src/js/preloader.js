var $loader = $('.loader');

$.html5Loader({
      filesToLoad:    '/js/files.json', // this could be a JSON or simply a javascript object
      onBeforeLoad:       function () {
      	$loader.show();
      },
      onComplete:         function () {
      	$loader.fadeOut('', function () {
      		$loader.remove();
      	});
      },
      onElementLoaded:    function ( obj, elm) { },
      onUpdate:           function ( percentage ) {
      	$loader.find('span').html(percentage + '%');
      }
});
