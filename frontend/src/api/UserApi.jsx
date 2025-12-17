
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCurrentUser = () => {
  const token = localStorage.getItem("token");

  const fetchCurrentUser = async () => {
    if (!token) throw new Error("No token");

    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Error obteniendo usuario");
    }

    return json; 
  };

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!token,  
    retry: false,       
 
  });
};

/* =========================
   REGISTER
========================= */
export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al crear cuenta");


      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));

      return json;
    },
    onSuccess: () => {
      toast.success("Usuario creado correctamente 🎉");
    },
    onError: (error) => {
      toast.error("Error al crear usuario", {
        description: error.message,
      });
    },
  });
};

/* =========================
   LOGIN
========================= */
export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al iniciar sesión");

      // 🔐 guardar sesión
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));

      return json;
    },

    onError: (error) => {
      toast.error("Error al iniciar sesión", {
        description: error.message,
      });
    },
  });
};

/* =========================
   CURRENT USER / PROFILE
========================= */
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

  
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: json._id,
        nombre: json.nombre,
        correo: json.correo,
        rol: json.rol,
      })
    );

    return json;
  };

  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token,
  });
};

/* =========================
   LOGOUT
========================= */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    window.location.href = "/";
  };
};

/* =========================
   FORGOT PASSWORD
========================= */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error enviando correo");

      return json;
    },
    onSuccess: () => {
      toast.success("Correo de recuperación enviado 📩");
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};

/* =========================
   RESET PASSWORD
========================= */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ token, password }) => {
      const res = await fetch(
        `${API_BASE_URL}/user/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.message || "Error al cambiar contraseña");

      return json;
    },
    onSuccess: () => {
      toast.success("Contraseña actualizada 🔐");
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
