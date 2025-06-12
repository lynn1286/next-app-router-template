/**
 * @description: 判断是否是服务端渲染
 * @return {boolean} 是否是服务端渲染
 */
export const isServerRendering = (function () {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch {
    return true;
  }
})();
