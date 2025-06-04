import { ID, Query } from "appwrite";
import { databases } from "../lib/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export async function updateSearchCount(searchTerm, movie) {
  if (!searchTerm || !movie?.id) return;

  try {
    const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)]);

    if (existing.total > 0) {
      const doc = existing.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (err) {
    console.error("Appwrite Error:", err.message || err);
  }
}

export async function getTrendingMovies() {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")]);

    return result.documents;
  } catch (error) {
    console.error("Appwrite Trending Error:", error.message || error);
    return [];
  }
}
