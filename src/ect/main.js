export default class BffV5Products {
  async showFavoriteModal(productId, priceGroup, apiType, targetColor) {
    if (apiType === 'AddtoCart' && this.isV5) {
      if (!window.cartScriptLoaded) {
        scriptLoader('jp/elgnisolqinu.js/init').catch((error) => {
          console.error('스크립트 로드 에러:', error.message);
        });
        window.cartScriptLoaded = true;
      }
    }
  }
}

export const scriptLoader = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = (event) => {
      reject(new Error(`스크립트 로드 실패: ${src}`));
    };
    document.head.appendChild(script);
  });
};
