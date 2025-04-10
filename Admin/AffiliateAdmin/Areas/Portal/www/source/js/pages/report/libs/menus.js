import React from 'react'
import { menuKey, relativePath } from './constants'
import { permissionResource } from '../../../modules/permissions'

const AffiliateReport = React.lazy(() => import('../affiliate-report/index'))
const PlayerGgrReport = React.lazy(() => import('../player-ggr-report/index'))
const TransferReport = React.lazy(() => import('../transfer-report/index'))
const MarketingStatisticsReport = React.lazy(() => import('../marketing-statistics-report/index'))

export const menus = [
    { key: menuKey.affiliateReport, label: 'Affiliate', href: relativePath.affiliateReport, component: AffiliateReport, permissionName: permissionResource.AffReport },
    { key: menuKey.playerGgrReport, label: 'Player GGR', href: relativePath.playerGgrReport, component: PlayerGgrReport, permissionName: permissionResource.AffReport },
    { key: menuKey.marketingStatisticsReport, label: 'Marketing Statistics', href: relativePath.marketingStatisticsReport, component: MarketingStatisticsReport, permissionName: permissionResource.AffReport  },
    { key: menuKey.transferReport, label: 'Transfer Balance For Player', href: relativePath.transferReport, component: TransferReport, permissionName: permissionResource.TransferPlayerReport },
]