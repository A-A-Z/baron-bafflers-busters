import './assets/header.css'

import type { FC } from 'react'

export const Header: FC = () => (
  <header className="header">
    <h1 className="header__title" aria-label="Baron Bafflers Busters">
      Baro<span className="header__wonky">n</span> Bafflers Busters
    </h1>
  </header>
)
