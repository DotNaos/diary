const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string) {
	if (!path.startsWith('/')) {
		return `${base}/${path}` || `/${path}`;
	}

	return `${base}${path}` || path;
}
