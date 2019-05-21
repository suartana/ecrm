<!DOCTYPE HTML>
<html anifest="" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Docu Media Schweiz GmbH ERP & CRM</title>
    <link rel="shortcut icon" href="/resources/images/favicon.gif" type="image/gif" />
    <link href="/resources/css/splash.css?v={{now()}}" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Actor' rel='stylesheet' type='text/css'>
    <script type="text/javascript">
		var Ext = Ext || {}; // Ext namespace won't be defined yet...
		window.Laravel = {"csrfToken":"{{ csrf_token() }}"} ; // set the csrf_token parameters
		window.route = "{{Request::path()}}"; // set the route parameters
		window.params = "{{ $token ? $token : '' }}"; // set the token parameters
		window.locale = localStorage.getItem("locale") ? localStorage.getItem("locale")  : "{{ Session::get('locale') }}";
		// This function is called by the Microloader after it has performed basic
		// device detection. The results are provided in the "tags" object. You can
		// use these tags here or even add custom tags. These can be used by platform
		// filters in your manifest or by platformConfig expressions in your app.
		//
		Ext.beforeLoad = function (tags) {
			var s = location.search,  // the query string (ex "?foo=1&bar")
				profile;
			// For testing look for "?classic" or "?modern" in the URL to override
			// device detection default.
			//
			if (s.match(/\bclassic\b/)) {
				profile = 'classic';
			}
			else if (s.match(/\bmodern\b/)) {
				profile = 'modern';
			}
			else {
				profile = tags.desktop ? 'classic' : 'modern';
				//profile = tags.phone ? 'modern' : 'classic';
			}



			Ext.manifest = profile; // this name must match a build profile name

			// This function is called once the manifest is available but before
			// any data is pulled from it.
			//
			//return function (manifest) {
			// peek at / modify the manifest object
			//};
		};
    </script>
    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="7d0afe61-03d9-426d-a94c-59c3e1226a07" type="text/javascript" src="bootstrap.js"></script>
</head>
<body>
<div class="loader">
    @switch(Session::get('locale'))
        @case('de')
        <h1> "Bitte warten", während die Anwendung geladen wird...</h1>
        @break

        @case('en')
        <h1> "Please wait" while loading the application...</h1>
        @break

        @case('fr')
        <h1> "S'il vous plaît patienter" pendant le chargement de l'application...</h1>
        @break

        @case('it')
        <h1> "Attendere" mentre si carica l'applicazione...</h1>
        @break

        @default
        <h1> "Please wait" while loading the application...</h1>
    @endswitch
    <span></span>
    <span></span>
    <span></span>
</div>
</body>
</html>
