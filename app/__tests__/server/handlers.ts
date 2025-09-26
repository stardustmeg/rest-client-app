import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'foo', body: 'bar', userId: 1 },
      { id: 2, title: 'baz', body: 'qux', userId: 1 },
    ]);
  }),

  http.get('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      title: `mocked title ${id}`,
      body: `mocked body for post ${id}`,
      userId: 1,
    });
  }),

  http.post('https://jsonplaceholder.typicode.com/posts', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ body }, { status: 201 });
  }),

  http.put('https://jsonplaceholder.typicode.com/posts/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    return HttpResponse.json({ id: Number(id), body });
  }),

  http.patch('https://jsonplaceholder.typicode.com/posts/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    return HttpResponse.json({ id: Number(id), body });
  }),

  http.delete('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ message: `Post ${id} deleted` }, { status: 200 });
  }),
];
