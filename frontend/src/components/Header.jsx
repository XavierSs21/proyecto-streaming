// import { useState } from "react"
import SearchBar from "./SearchBar"

import { Button } from "./ui/button"
// import DialogSession from "./DialogSession"

const Header = () => {
  // const [open, setOpen] = useState(false)
  // const [mode, setMode] = useState("login") // login | register

  return (
    <div className="flex justify-between items-center border-b p-6 gap-6">
      <h1>MUVI</h1>

      <SearchBar />

      <h2>Mis Listas</h2>

      <Button
        className="rounded-3xl"
        onClick={() => {
          setMode("login")
          setOpen(true)
        }}
      >
        Iniciar Sesión
      </Button>

      <Button
        className="rounded-3xl bg-white border black text-black"
        onClick={() => {
          setMode("register")
          setOpen(true)
        }}
      >
        Crear una cuenta
      </Button>

      {/* <DialogSession open={open} setOpen={setOpen} mode={mode} /> */}
    </div>
  )
}

export default Header
