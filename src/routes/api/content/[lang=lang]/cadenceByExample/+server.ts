import { fetchAllCadenceByExampleOverviews } from '$lib/utilities/api/content/cadenceByExample/fetchAllCadenceByExampleOverviews';
import { json, error } from '@sveltejs/kit';
import type { Locales } from '$i18n/i18n-types';

export const GET = async ({ params }) => {
	try {
		const allMetadata = await fetchAllCadenceByExampleOverviews(params.lang as Locales);

		allMetadata.sort((a, b) => {
			const prevNumber = Number(a.path.split('/').pop().split('-')[0]);
			const nextNumber = Number(b.path.split('/').pop().split('-')[0]);
			return prevNumber - nextNumber;
		});

		return json(allMetadata);
	} catch (e) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
};
