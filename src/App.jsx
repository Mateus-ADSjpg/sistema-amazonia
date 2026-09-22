import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Contato from './paginas/Contato'
import Galeria from './paginas/Galeria'
import Inicio from './paginas/Inicio'
import NaoEncontrada from './paginas/NaoEncontrada'
import Secretaria from './paginas/Secretaria'
import Sobre from './paginas/Sobre'
import Unidade from './paginas/Unidade'
import Unidades from './paginas/Unidades'

// Endereços (URLs) do site. Cada unidade ganha /unidades/<slug>.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="unidades" element={<Unidades />} />
        <Route path="unidades/:slug" element={<Unidade />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="contato" element={<Contato />} />
        <Route path="secretaria" element={<Secretaria />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}
