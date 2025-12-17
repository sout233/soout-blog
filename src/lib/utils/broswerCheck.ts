export function getBrowserInfo() {
	const ua = navigator.userAgent;

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

	const chromeMatch = ua.match(/(?:Chrome|CriOS)\/(\d+)/);
	const chromeVersion = chromeMatch ? parseInt(chromeMatch[1], 10) : null;

	const firefoxMatch = ua.match(/(?:Firefox|FxiOS)\/(\d+)/);
	const firefoxVersion = firefoxMatch ? parseInt(firefoxMatch[1], 10) : null;

	return {
		isMobile,
		chromeVersion,
		firefoxVersion,
		isChromeValid: chromeVersion ? chromeVersion > 130 : false,
		isFirefoxValid: firefoxVersion ? firefoxVersion > 110 : false
	};
}

export function isBrowserSupportSuperAnimation(): boolean {
	const info = getBrowserInfo();
	let isBrowserSupported = true;

	if (info.isMobile) {
		isBrowserSupported = false;
	} else if (info.chromeVersion) {
		isBrowserSupported = info.isChromeValid;
	} else if (info.firefoxVersion) {
		isBrowserSupported = info.isFirefoxValid;
	}

	return isBrowserSupported;
}
