import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDailyStats } from '@/hooks/use-github-stats'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'

export function DailyCommitsChart() {
  const { data: dailyStats, isLoading } = useDailyStats(30)

  if (isLoading) {
    return (
      <Card className='col-span-full'>
        <CardHeader>
          <CardTitle>Daily Commits</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-64 w-full' />
        </CardContent>
      </Card>
    )
  }

  const chartData =
    dailyStats
      ?.slice()
      .reverse()
      .map((day) => ({
        date: format(new Date(day.stat_date), 'MMM dd'),
        commits: day.total_commits,
      })) || []

  if (chartData.length === 0) {
    return (
      <Card className='col-span-full'>
        <CardHeader>
          <CardTitle>Daily Commit Activity</CardTitle>
          <CardDescription>Commits over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex h-64 items-center justify-center text-muted-foreground'>
            <p>No daily stats yet. Sync your repositories first.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>Daily Commit Activity</CardTitle>
        <CardDescription>Commits over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
            <XAxis dataKey='date' className='text-xs' />
            <YAxis className='text-xs' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            />
            <Line
              type='monotone'
              dataKey='commits'
              stroke='#2dd4bf'
              strokeWidth={2}
              dot={{ fill: '#2dd4bf', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#14b8a6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
