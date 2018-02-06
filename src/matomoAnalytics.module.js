angular.module('matomoAnalytics', []);
angular.module('matomoAnalytics').run(function ($rootScope, $interval, analyticsOptions) {
	if(analyticsOptions.hasOwnProperty("enabled") && analyticsOptions.enabled) {
		if(analyticsOptions.hasOwnProperty("siteId") && analyticsOptions.siteId != '' && analyticsOptions.hasOwnProperty("siteUrl") && analyticsOptions.siteUrl != '') {
			if(typeof _paq === 'undefined') {
				window['_paq'] = [];
				_paq.push(["setDomains", ["*.csudh-primo.hosted.exlibrisgroup.com/"]]);
				_paq.push(["setDoNotTrack", true]);
				(function() {
					_paq.push(['setTrackerUrl', analyticsOptions.siteUrl+'piwik.php']);
					_paq.push(['setSiteId', analyticsOptions.siteId]);
					var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
					g.type='text/javascript'; g.async=true; g.defer=true; g.src=analyticsOptions.siteUrl+'piwik.js'; s.parentNode.insertBefore(g,s);
				})();
			}
		}
		$rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
			if(analyticsOptions.hasOwnProperty("defaultTitle")) {
				var documentTitle = analyticsOptions.defaultTitle;
				var timerStart = Date.now();
				var interval = $interval(function () {
					if(document.title !== '') documentTitle = document.title;
					if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1)
						if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;
						else documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();
					
					if(typeof _paq !== 'undefined') {
						if(fromState != toState) _paq.push(['setReferrerUrl', fromState]);
						_paq.push(['setCustomUrl', toState]);
						_paq.push(['setDocumentTitle', documentTitle]);
						_paq.push(['setGenerationTimeMs', Date.now()-timerStart]);
						_paq.push(['enableLinkTracking']);
						_paq.push(['enableHeartBeatTimer']);
						_paq.push(['trackPageView']);
					}
					$interval.cancel(interval);
				}, 0);
			}
		});
	}
});
angular.module('matomoAnalytics').value('analyticsOptions', {
    enabled: true,
	siteId: '',
	siteUrl: '',
	defaultTitle: ''
});