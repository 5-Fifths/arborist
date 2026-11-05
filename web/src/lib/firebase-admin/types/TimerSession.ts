export interface TimerSession {
  started_at: Date,
  duration: number,
  value : number,
  status: 'inactive' | 'active' | 'completed' | 'claimed'
}