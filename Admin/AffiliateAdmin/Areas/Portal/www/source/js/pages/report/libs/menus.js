import React from 'react'
import { menuKey, relativePath } from './constants'

const AffiliateReport = React.lazy(() => import(/* webpackChunkNamw: 'affiliateReport'*/ '../affiliate-report/index'))
const PlayerGgrReport = React.lazy(() => import(/* webpackChunkNamw: 'playerGgrReport'*/ '../player-ggr-report/index'))

export const menus = [
    { key: menuKey.affiliateReport, label: 'Affiliate', href: relativePath.affiliateReport, component: AffiliateReport },
    { key: menuKey.playerGgrReport, label: 'Player GGR', href: relativePath.playerGgrReport, component: PlayerGgrReport }
]