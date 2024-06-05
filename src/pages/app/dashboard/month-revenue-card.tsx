import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMonthRevenue } from '@/api/get-month-revenue'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue} = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-receipt']
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Receita total (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
      {monthRevenue ? (
          <>  
            <span className="text-2xl font-semibold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
            </span>
            <p className="text-xs text-muted-foreground">
            {monthRevenue?.receipt >= 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">+{monthRevenue?.receipt}% </span>
                em relação ao mês passado
              </>
            ) : (
              <>
                <span className="text-rose-500 dark:text-rose-400">{monthRevenue?.receipt}% </span>
                em relação ao mês passado
              </>
            )}
            
            </p>
          </>
        ) : (
          <MetricCardSkeleton/>
        )}
      </CardContent>
    </Card>
  )
}
