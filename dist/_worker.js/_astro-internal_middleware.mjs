globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_C-jSOVA3.mjs';
import './chunks/astro/server_CUol773d.mjs';
import { s as sequence } from './chunks/index_DIu1XPrI.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
