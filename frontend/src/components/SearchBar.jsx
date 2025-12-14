import { Input } from "./ui/input"
import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="relative w-64 md:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
      <Input
        placeholder="Busca tu película preferida..."
        className="pl-10 rounded-3xl  focus-visible:ring-0 focus-visible:ring-offset-0 border-black"
      />
    </div>
  )
}

export default SearchBar
