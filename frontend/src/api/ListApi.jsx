// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const getToken = () => localStorage.getItem("token");


// export const useGetMyList = () => {
//   const token = getToken();

//   const fetchMyList = async () => {
//     if (!token) throw new Error("No token");

//     const res = await fetch(`${API_BASE_URL}/list`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       throw new Error(json.message || "Error obteniendo mi lista");
//     }

//     return json;
//   };

//   return useQuery({
//     queryKey: ["myList"],
//     queryFn: fetchMyList,
//     enabled: !!token,
//     retry: false,
//   });
// };

// /* =========================
//    AGREGAR A MI LISTA
// ========================= */
// export const useAddToMyList = () => {
//   const queryClient = useQueryClient();
//   const token = getToken();

//   const addToMyList = async (movieId) => {
//     if (!token) throw new Error("No token");

//     const res = await fetch(`${API_BASE_URL}/list/${movieId}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       throw new Error(json.message || "Error al agregar a mi lista");
//     }

//     return json;
//   };

//   return useMutation({
//     mutationFn: addToMyList,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["myList"] });
//     },
//   });
// };

// /* =========================
//    ELIMINAR DE MI LISTA
// ========================= */
// export const useRemoveFromMyList = () => {
//   const queryClient = useQueryClient();
//   const token = getToken();

//   const removeFromMyList = async (movieId) => {
//     if (!token) throw new Error("No token");

//     const res = await fetch(`${API_BASE_URL}/list/${movieId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       throw new Error(json.message || "Error al eliminar de mi lista");
//     }

//     return json;
//   };

//   return useMutation({
//     mutationFn: removeFromMyList,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["myList"] });
//     },
//   });
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getToken = () => localStorage.getItem("token");

/* =========================
   OBTENER MI LISTA
========================= */
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
   ✅ Regresa addToMyList() directo
========================= */
export const useAddToMyList = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const mutation = useMutation({
    mutationFn: async (movieId) => {
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
    },
    onSuccess: () => {
      toast.success("Agregada a Mi Lista");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
    onError: (err) => {
      toast.error("No se pudo agregar", { description: err.message });
    },
  });

  return {
    addToMyList: (movieId) => mutation.mutateAsync(movieId),
    isPending: mutation.isPending,
  };
};

/* =========================
   ELIMINAR DE MI LISTA
   ✅ Regresa removeFromMyList() directo
========================= */
export const useRemoveFromMyList = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const mutation = useMutation({
    mutationFn: async (movieId) => {
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
    },
    onSuccess: () => {
      toast.success("Eliminada de Mi Lista");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
    onError: (err) => {
      toast.error("No se pudo eliminar", { description: err.message });
    },
  });

  return {
    removeFromMyList: (movieId) => mutation.mutateAsync(movieId),
    isPending: mutation.isPending,
  };
};
