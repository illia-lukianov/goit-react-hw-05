import axios from "axios"

export default async function galleryQuery(query, page) {
    const config = axios.create({
        baseURL: "https://api.unsplash.com/search/photos",
        params: {
            query,
            page
        },
        headers: {
            Authorization: "Client-ID yEI0mmPOQ40yIt2J-DfNzDpJ1elh5mQs4_V8-PTqK0o",
          }
      })
    return await config.get();
}