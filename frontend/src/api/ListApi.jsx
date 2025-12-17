import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

const getToken = () => localStorage.getItem("token");


export const useGetMyList = () => {
  const token = getToken();

  const fetchMyList = async () => {
    if (!token) throw new Error("No token");

    const res = await fetch(`${API_BASE_URL}/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Error obteniendo mi lista");
    }

    return json;
  };

  return useQuery({
    queryKey: ["myList"],
    queryFn: fetchMyList,
    enabled: !!token,
    retry: false,
  });
};

/* =========================
   AGREGAR A MI LISTA
========================= */
export const useAddToMyList = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const addToMyList = async (movieId) => {
    if (!token) throw new Error("No token");

    const res = await fetch(`${API_BASE_URL}/list/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Error al agregar a mi lista");
    }

    return json;
  };

  return useMutation({
    mutationFn: addToMyList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });
};

/* =========================
   ELIMINAR DE MI LISTA
========================= */
export const useRemoveFromMyList = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const removeFromMyList = async (movieId) => {
    if (!token) throw new Error("No token");

    const res = await fetch(`${API_BASE_URL}/list/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Error al eliminar de mi lista");
    }

    return json;
  };

  return useMutation({
    mutationFn: removeFromMyList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });
};
