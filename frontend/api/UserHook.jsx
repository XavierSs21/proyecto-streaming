import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------------------------
// CREATE USER (POST)
// ---------------------------
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear cuenta");

      localStorage.setItem("token", json.token);

      return json;
    },
  });
};

// ---------------------------
// LOGIN USER (POST)
// ---------------------------
export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al iniciar sesión");

      localStorage.setItem("token", json.token);

      return json;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

// ---------------------------
// GET PROFILE (GET con token)
// ---------------------------
export const useGetProfile = () => {
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Error obteniendo perfil");

    return json;
  };

  const { data: profile, isLoading } = useQuery(
    ["profile"],
    fetchProfile,
    {
      enabled: !!token, // solo si hay token
    }
  );

  return { profile, isLoading };
};

// ---------------------------
// LOGOUT (simple, sin context)
// ---------------------------
export const useLogout = () => {
  return () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
};
