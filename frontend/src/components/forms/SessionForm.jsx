import { useForm } from '@tanstack/react-form'
import React from 'react'

import * as z from "zod"

const loginSchema = z.object({
    correo: z.email().min(1, "El correo es obligatorio"),
    password: z.string().min(1, "La contrasena es obligatoria"),
})

const registerSchema = z.object({
    nombre: z
    .string()
    .min(1, "El nombre es obligatorio"),

  correo: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo inválido"),

  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio"),

  pais: z
    .string()
    .min(1, "El país es obligatorio"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria"),
})

const ErrorText = ({ field }) =>
  field.state.meta.errors?.length > 0 && (
    <p className="text-red-500 text-sm">{field.state.meta.errors[0]}</p>
  )

const SessionForm = ({mode, onSubmit, open}) => {
    const form = useForm({
    defaultValues:
      mode === "login"
        ? { correo: "", password: "" }
        : { nombre: "", correo: "", telefono: "", pais: "", password: "" },
    validatorAdapter: zodValidator(),
    onSubmit,
    validators: {
      onSubmit: mode === "login" ? loginSchema : registerSchema,
    },
  })

  // 🔥 Reset form when dialog opens
  useEffect(() => {
    if (open) form.reset()
  }, [open])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      {mode === "register" && (
        <form.Field name="nombre">
          {(field) => (
            <div>
              <Input
                placeholder="Nombre"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText field={field} />
            </div>
          )}
        </form.Field>
      )}

      <form.Field name="correo">
        {(field) => (
          <div>
            <Input
              placeholder="Correo"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

      {mode === "register" && (
        <>
          <form.Field name="telefono">
            {(field) => (
              <div>
                <Input
                  placeholder="Teléfono"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="pais">
            {(field) => (
              <div>
                <Input
                  placeholder="País"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorText field={field} />
              </div>
            )}
          </form.Field>
        </>
      )}

      <form.Field name="password">
        {(field) => (
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <ErrorText field={field} />
          </div>
        )}
      </form.Field>

      <Button className="w-full rounded-3xl" type="submit">
        {mode === "login" ? "Entrar" : "Crear Cuenta"}
      </Button>
    </form>
  )
}

export default SessionForm