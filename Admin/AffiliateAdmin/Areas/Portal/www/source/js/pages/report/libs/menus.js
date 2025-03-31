import React from 'react'
import { menuKey, relativePath } from './constants'
import { permissionResource } from '../../../modules/permissions'

const AffiliateReport = React.lazy(() => import(/* webpackChunkName: 'affiliateReport'*/ '../affiliate-report/index'))
const PlayerGgrReport = React.lazy(() => import(/* webpackChunkName: 'playerGgrReport'*/ '../player-ggr-report/index'))
const TransferReport = React.lazy(() => import(/* webpackChunkName: 'transferReport'*/ '../transfer-report/index'))
const MarketingStatisticsReport = React.lazy(() => import(/*webpackChunkName: 'marketingStatisticsReport'*/ '../marketing-statistics-report/index'))

export const menus = [
    { key: menuKey.affiliateReport, label: 'Affiliate', href: relativePath.affiliateReport, component: AffiliateReport, permissionName: permissionResource.AffReport },
    { key: menuKey.playerGgrReport, label: 'Player GGR', href: relativePath.playerGgrReport, component: PlayerGgrReport, permissionName: permissionResource.AffReport },
    { key: menuKey.marketingStatisticsReport, label: 'Marketing Statistics', href: relativePath.marketingStatisticsReport, component: MarketingStatisticsReport, permissionName: permissionResource.AffReport  },
    { key: menuKey.transferReport, label: 'Transfer Balance For Player', href: relativePath.transferReport, component: TransferReport, permissionName: permissionResource.TransferPlayerReport },
]