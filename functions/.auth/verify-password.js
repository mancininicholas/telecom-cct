export async function onRequestPost({ request, env }) {
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({ authenticated: false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const password = typeof body.password === 'string' ? body.password : '';
    const adminPassword = env.ADMIN_PASSWORD || '';
    const authenticated = password.length > 0 && password === adminPassword;

    return new Response(JSON.stringify({ authenticated }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
