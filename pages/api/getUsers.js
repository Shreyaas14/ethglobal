// pages/api/getUsers.js

export default async function handler(req, res) {
    const cursor = req.query.cursor;

    const url = 'https://auth.privy.io/api/v1/users' + (cursor ? `?cursor=${cursor}` : '');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': btoa('clmwlnfnp004rjz0f4ag80cwx:UEGjpRu5X7ZGKMxK6MuvV5h4jYE4nvCJ9gkc8TJQmtrwBtn7JPQG4MPffCtoaYsc1VxF4MYhVsLhPt1QMi8bsyt'),
                'privy-app-id': 'clmwlnfnp004rjz0f4ag80cwx',
            }
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch users.' });
    }
}
