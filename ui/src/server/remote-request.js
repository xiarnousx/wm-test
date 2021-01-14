import { client } from './client';

export async function makeRemoteRequest(key, query, variables = {}) {
    const { data } = await client.query({query, variables});

    return data[key];
}

export function makeRemoteSubscription(key, cb ,query, variables = {}) {
    const observable =  client.subscribe({query});
    observable.subscribe(({ data }) => cb(data[key]) );
}