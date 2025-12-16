import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* =========================
   HELPERS
========================= */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/* =========================
   CREATE MOVIE (ADMIN)
========================= */
export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        headers: getAuthHeaders(), // ⚠️ NO Content-Type
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear película");

      return json;
    },
    onSuccess: () => {
      toast.success("Película creada 🎬");
      queryClient.invalidateQueries(["movies"]);
    },
    onError: (error) => {
      toast.error("Error al crear película", {
        description: error.message,
      });
    },
  });
};

/* =========================
   GET ALL MOVIES
========================= */
export const useGetAllMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/movies`);
      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al obtener películas");
      return json;
    },
  });
};

/* =========================
   GET MOVIES BY GENRE
========================= */
export const useGetMoviesByGenre = (genre) => {
  return useQuery({
    queryKey: ["movies", genre],
    queryFn: async () => {
      const res = await fetch(
        `${API_BASE_URL}/movies/genre/${genre}`
      );
      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al obtener películas");
      return json;
    },
    enabled: !!genre,
  });
};

/* =========================
   GET MOVIE BY ID
========================= */
export const useGetMovieById = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`);
      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Película no encontrada");
      return json;
    },
    enabled: !!id,
  });
};

/* =========================
   UPDATE MOVIE (ADMIN)
========================= */
export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al actualizar película");

      return json;
    },
    onSuccess: (_, variables) => {
      toast.success("Película actualizada ✏️");
      queryClient.invalidateQueries(["movies"]);
      queryClient.invalidateQueries(["movie", variables.id]);
    },
    onError: (error) => {
      toast.error("Error al actualizar película", {
        description: error.message,
      });
    },
  });
};

/* =========================
   DELETE MOVIE (ADMIN)
========================= */
export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al eliminar película");

      return json;
    },
    onSuccess: () => {
      toast.success("Película eliminada 🗑️");
      queryClient.invalidateQueries(["movies"]);
    },
    onError: (error) => {
      toast.error("Error al eliminar película", {
        description: error.message,
      });
    },
  });
};
